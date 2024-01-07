describe('Login Tests', () => {
  it('Successfully logs in', () => {
    cy.visit('/');

    cy.get('#signin-button').click();

    cy.get('#signinEmail').type('newuser@example.com');
    cy.get('#signinPassword').type('password123');

    cy.get('#signin-form button[type="submit"]').click();

    cy.url().should('include', '/');

    cy.get('#signin').should('have.css', 'display', 'none');
  });
});
