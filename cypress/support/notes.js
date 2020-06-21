Cypress.Commands.add('assertNotesLengthEqual', (length) => {
  cy.get('.note-list ul li').its('length').should('be.equal', length);
});
