Cypress.Commands.add('typeIn', (selector, text) => {
  cy.get(selector).type(text);
});

Cypress.Commands.add('clickOn', (selector) => {
  cy.get(selector).click();
});
