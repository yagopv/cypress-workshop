import chance from 'chance';

describe('The authentication system', () => {
  let createdUser = null;

  before(() => {
    const ch = new Chance();

    cy.request({
      method: 'POST',
      url: `${Cypress.env('backendUrl')}/users`,
      body: {
        name: 'Test User',
        email: ch.email(),
        password: 'Mobgen12345',
      },
    }).then((response) => (createdUser = response.body));
  });

  // after(() => {
  //   // Can remove the user with cy.request
  // });
  // afterEach(() => {
  //   // Executes after each tesst
  // });
  // beforeEach(() => {
  //   // Executes before each test
  // });

  it('should allow users to login', () => {
    const { token, user } = createdUser;

    cy.loginWithUI(user.email, 'Mobgen12345')
      .url()
      .should('be.equal', `${Cypress.config().baseUrl}/`);
  });

  it('should allow users to register', () => {
    const ch = new Chance();

    cy.registerWithUI('Test User', ch.email(), 'Mobgen12345')
      .url()
      .should('be.equal', `${Cypress.config().baseUrl}/`);
  });

  it('should allow users to logout', function () {
    const { token, user } = createdUser;

    cy.loginWithUI(user.email, 'Mobgen12345')
      .get('.header a')
      .click()
      .url()
      .should('be.equal', `${Cypress.config().baseUrl}/login`);
  });

  it('should show error message when credentials are not valid', () => {
    cy.server().route({
      method: 'POST',
      url: '**/auth',
      response: {},
      status: 401,
    });

    cy.loginWithUI('yagopv@mailinator.com', 'Mobgen12345');

    cy.contains(/you email or password is invalid/i);
  });
});
