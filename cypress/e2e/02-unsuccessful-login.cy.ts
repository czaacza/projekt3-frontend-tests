it('Fails to log in with wrong credentials', () => {
  cy.visit('/');

  cy.get('#signin-button').click();

  cy.get('#signinEmail').type('wrongemail@example.com');
  cy.get('#signinPassword').type('wrongpassword');

  cy.get('#signin-form button[type="submit"]').click();

  cy.get('#error-message').should('contain', 'Invalid user credentials');

  cy.get('#signin').should('have.css', 'display', 'block');
});
