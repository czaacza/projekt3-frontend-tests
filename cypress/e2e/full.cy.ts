// 01 Visit
describe('visit', () => {
  it('passes', () => {
    cy.visit('/');
  });
});

// 02 Registration Tests
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

// 03 Fails to log in with wrong credentials
it('Fails to log in with wrong credentials', () => {
  cy.visit('/');

  cy.get('#signin-button').click();

  cy.get('#signinEmail').type('wrongemail@example.com');
  cy.get('#signinPassword').type('wrongpassword');

  cy.get('#signin-form button[type="submit"]').click();

  cy.get('#error-message').should('contain', 'Invalid user credentials');

  cy.get('#signin').should('have.css', 'display', 'block');
});

// 04 Login Tests
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

// 05 Account Page Navigation
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

// 06 Account Details Verification
describe('Account Details Verification', () => {
  it('Displays the correct details', () => {
    cy.login('newuser@example.com', 'password123');
    cy.visit('/account');

    cy.get('#accountUsername').should('have.value', 'New User');

    cy.get('#accountEmail').should('have.value', 'newuser@example.com');

    cy.get('#accountPassword').should('have.value', 'password123');
  });
});

// 07 Update Account Details
describe('Update Account Details', () => {
  it('Allows user to update username and verifies it', () => {
    cy.login('newuser@example.com', 'password123');
    cy.visit('/account');

    const newUsername = 'NewUsername123';

    cy.get('#accountUsername').clear().type(newUsername);

    cy.get('#accountForm button[type="submit"]').click();

    cy.get('#success-message').should(
      'contain',
      'Profile details updated successfully!'
    );

    cy.visit('/account');

    cy.get('#accountUsername').should('have.value', newUsername);

    cy.get('#accountUsername').clear().type('New User');
    cy.get('#accountForm button[type="submit"]').click();
    cy.get('#success-message').should(
      'contain',
      'Profile details updated successfully!'
    );

    cy.visit('/account');
  });
});

// 08 Add to Cart Functionality
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

// 09 Cart Functionality
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

// 10 Checkout Page Verification
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

// 11 Place Order Functionality
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

// 12 Logout Functionality
describe('Logout Functionality', () => {
  it('Successfully logs out and clears the session', () => {
    cy.login('newuser@example.com', 'password123');
    cy.visit('/');

    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('token')).to.exist;
    });
    cy.get('.logout-btn').click();

    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('token')).to.be.null;
    });

    cy.url().should('include', '/');
  });
});
