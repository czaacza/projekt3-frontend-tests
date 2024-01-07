describe('Account Details Verification', () => {
  it('Displays the correct details', () => {
    cy.login('newuser@example.com', 'password123');
    cy.visit('/account');

    cy.get('#accountUsername').should('have.value', 'New User');

    cy.get('#accountEmail').should('have.value', 'newuser@example.com');

    cy.get('#accountPassword').should('have.value', 'password123');
  });
});
