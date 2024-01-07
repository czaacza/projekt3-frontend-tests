describe('Cart Functionality', () => {
  before(() => {
    cy.add_to_cart();
  });

  it('Navigates to cart and verifies contents', () => {
    cy.get('.cart-item').click();

    cy.url().should('include', '/cart');

    cy.get('.cart-section').should('exist');
    cy.get('#total').should('not.have.text', '0');
  });
});
