describe('Checkout Page Verification', () => {
  before(() => {
    cy.cart();
  });

  it('Navigates to checkout and verifies all fields', () => {
    cy.get('#checkout-button').click();

    cy.url().should('include', '/checkout');

    cy.get('.checkout-section').should('exist');
    cy.contains('Personal Information');

    cy.get('#firstName').should('have.value', '');
    cy.get('#lastName').should('have.value', '');
    cy.get('#phoneNumber').should('have.value', '');
    cy.get('#emailAddress').should('have.value', 'newuser@example.com');

    cy.get('#orderComments').should('exist');

    cy.contains('Order Summary');

    cy.get('.card-text').contains('Total:');
    cy.get('div.row.mb-3').should('have.length.at.least', 1);

    cy.get('#place-order-button').should('exist');
  });
});
