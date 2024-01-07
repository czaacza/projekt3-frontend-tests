describe('Account Page Navigation', () => {
  it('Successfully navigates to My Account page after login', () => {
    cy.visit('/');

    cy.login('newuser@example.com', 'password123');

    cy.url().should('include', '/');

    cy.get('#account-button').click();

    cy.url().should('include', '/account');

    cy.get('.account-container').should('exist');
    cy.contains('Account Details');
  });
});
