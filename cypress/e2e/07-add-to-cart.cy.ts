describe('Add to Cart Functionality', () => {
  it('Adds a new item to the cart', () => {
    cy.visit('/');

    cy.window().then((win) => {
      win.sessionStorage.clear();
    });

    cy.login('newuser@example.com', 'password123');

    cy.get('.add-to-cart-btn').first().click();

    cy.window().then((win) => {
      const cart = JSON.parse(win.sessionStorage.getItem('cart'));

      expect(cart).to.have.property('books');
      expect(cart).to.have.property('total');
    });
  });
});
