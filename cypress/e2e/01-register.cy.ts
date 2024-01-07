describe('Registration Tests', () => {
  it('Successfully registers a new user', () => {
    cy.visit('/');

    cy.get('#popup-button').click();

    cy.get('#signupName').type('New User');
    cy.get('#signupEmail').type('newuser@example.com');
    cy.get('#signupPassword').type('password123');
    cy.get('#signupConfirmPassword').type('password123');

    cy.get('#signup-form button[type="submit"]').click();

    cy.url().should('include', '/');

    cy.get('#popup').should('have.css', 'display', 'none');
  });
});
