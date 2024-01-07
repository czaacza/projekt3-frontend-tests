describe('Place Order Functionality', () => {
  before(() => {
    cy.cart();
    cy.get('#checkout-button').click();
    cy.url().should('include', '/checkout');
  });

  it('Completes an order and verifies redirection to order confirmation and then home page', () => {
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#phoneNumber').type('1234567890');
    cy.get('#emailAddress').type('john.doe@example.com');
    cy.get('#orderComments').type('No special instructions');

    cy.get('#place-order-button').click();

    cy.url().should('include', '/order-confirmation');

    cy.get('.order-confirmation-btn').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
