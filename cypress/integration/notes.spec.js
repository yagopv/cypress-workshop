describe('The notes app Dashboard', () => {
  beforeEach(() => {
    cy.login('yagopv@mailinator.com', 'Mobgen12345');

    // Fake server
    cy.server()
      .route('**/notes', 'fixture:notes')
      .as('notes')
      .route('POST', '**/notes')
      .as('createNote');
  });

  it('should allow to check the user notes', () => {
    cy.visit('/').assertNotesLengthEqual(3);
  });

  it('should create a note when click the add note button', () => {
    cy.visit('/')
      .get('.note-list .add-note')
      .focus()
      .click()
      .wait('@createNote')
      .assertNotesLengthEqual(3);
  });

  it('should filter by tag', () => {
    cy.visit('/')
      .contains(/another tag/i)
      .click()
      .assertNotesLengthEqual(1);
  });
});
