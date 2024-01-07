describe('Logout Functionality', () => {
  it('Successfully logs out and clears the session', () => {
    cy.login('newuser@example.com', 'password123');
    cy.visit('/');

    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('token')).to.exist;
    });
    cy.get('.logout-btn').click();

    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('token')).to.be.null;
    });

    cy.url().should('include', '/');
  });
});
