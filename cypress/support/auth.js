Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendUrl')}/auth`,
    auth: {
      username: email,
      password: password,
    },
  }).then((response) => {
    window.localStorage.setItem('currentUser', JSON.stringify(response.body));
    return response;
  });
});

Cypress.Commands.add('loginWithUI', (email, password) => {
  cy.visit('/login')
    .typeIn('#email', email)
    .typeIn('#password', password)
    .clickOn('.btn');
});

Cypress.Commands.add('registerWithUI', (name, email, password) => {
  cy.visit('/register')
    .typeIn('#fullName', name)
    .typeIn('#email', email)
    .typeIn('#password', password)
    .clickOn('.btn');
});
