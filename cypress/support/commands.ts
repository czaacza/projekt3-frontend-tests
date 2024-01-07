/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/'); // Or your login page URL
  cy.get('#signin-button').click();
  cy.get('#signinEmail').type(email);
  cy.get('#signinPassword').type(password);
  cy.get('#signin-form button[type="submit"]').click();

  cy.get('#signin').should('have.css', 'display', 'none');
});

Cypress.Commands.add('add_to_cart', () => {
  cy.visit('/'); // Visit the homepage or page where the add to cart button exists

  // You might want to clear session storage here or ensure it's in a known state
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });

  cy.login('newuser@example.com', 'password123'); // Ensure this uses the automated login command

  // Click the first add to cart button on the page
  cy.get('.add-to-cart-btn').first().click();

  // Check session storage to ensure the item has been added
  cy.window().then((win) => {
    const cart = JSON.parse(win.sessionStorage.getItem('cart')); // adjust 'cart' to the actual key used
    // cart is an object, so you can check for the existence of keys or the length of the object
    expect(cart).to.have.property('books');
    expect(cart).to.have.property('total');
  });
});

Cypress.Commands.add('cart', () => {
  cy.add_to_cart(); // Use the custom command to add an item to the cart

  // Click the cart item button to go to the cart page
  cy.get('.cart-item').click(); // Adjust selector to your application's actual cart button

  // Verify redirection to the cart page
  cy.url().should('include', '/cart');

  // Verify the cart section is displayed with the correct contents
  // Assuming the cart displays a list of items and the total quantity
  cy.get('.cart-section').should('exist');
  cy.get('#total').should('not.have.text', '0'); // Assuming that at least one item is in the cart
});
