import { Selector, ClientFunction } from 'testcafe';

const getSessionStorage = ClientFunction((key) => {
  return sessionStorage.getItem(key);
});

const clearSessionStorage = ClientFunction(() => {
  sessionStorage.clear();
});

const PAGE_URL = 'http://localhost:5173/';

const login = async (t) => {
  await t
    .navigateTo(`${PAGE_URL}`)
    .click(Selector('#signin-button'))
    .typeText(Selector('#signinEmail'), 'newuser@example.com')
    .typeText(Selector('#signinPassword'), 'password123')
    .click(Selector('#signin-form button[type="submit"]'));
};

const addToCart = async (t) => {
  await t
    .click(Selector('.add-to-cart-btn').nth(0)) // Click the first add to cart button
    .expect(getSessionStorage('cart'))
    .ok(); // Validate that the cart is not empty
};

fixture`01 Visit`.page`${PAGE_URL}`;

test('passes', async (t) => {
  await t.expect(Selector('body').exists).ok();
});

fixture`02 Registration Tests`.page`${PAGE_URL}`;

test('Successfully registers a new user', async (t) => {
  await t
    .click(Selector('#popup-button'))
    .typeText(Selector('#signupName'), 'New User')
    .typeText(Selector('#signupEmail'), 'newuser@example.com')
    .typeText(Selector('#signupPassword'), 'password123')
    .typeText(Selector('#signupConfirmPassword'), 'password123')
    .click(Selector('#signup-form button[type="submit"]'))
    .expect(Selector('#popup').getStyleProperty('display'))
    .notEql('block');
});

fixture`03 Fails to log in with wrong credentials`.page`${PAGE_URL}`;

test('Fails to log in with wrong credentials', async (t) => {
  await t
    .click(Selector('#signin-button'))
    .typeText(Selector('#signinEmail'), 'wrongemail@example.com')
    .typeText(Selector('#signinPassword'), 'wrongpassword')
    .click(Selector('#signin-form button[type="submit"]'))
    .expect(Selector('#error-message').innerText)
    .contains('Invalid user credentials')
    .expect(Selector('#signin').getStyleProperty('display'))
    .eql('block');
});

fixture`04 Login Tests`.page`${PAGE_URL}`;

test('Successfully logs in', async (t) => {
  await t
    .click(Selector('#signin-button'))
    .typeText(Selector('#signinEmail'), 'newuser@example.com')
    .typeText(Selector('#signinPassword'), 'password123')
    .click(Selector('#signin-form button[type="submit"]'))
    .expect(Selector('#signin').getStyleProperty('display'))
    .notEql('block');
});

fixture`05 Account Page Navigation`.page`${PAGE_URL}`;
test('Successfully navigates to My Account page after login', async (t) => {
  await login(t);

  await t
    .click(Selector('#account-button'))
    .expect(Selector('.account-container').exists)
    .ok()
    .expect(Selector('body').innerText)
    .contains('Account Details');
});

fixture`06 Account Details Verification`.page`${PAGE_URL}`;
test('Displays the correct details', async (t) => {
  await login(t);
  await t.navigateTo(`${PAGE_URL}account`); // Navigate to account page

  await t
    .expect(Selector('#accountUsername').value)
    .eql('New User')
    .expect(Selector('#accountEmail').value)
    .eql('newuser@example.com')
    .expect(Selector('#accountPassword').value)
    .eql('password123');
});

fixture`07 Update Account Details`.page`${PAGE_URL}`;
test('Allows user to update username and verifies it', async (t) => {
  await login(t); // Use the login function
  await t.navigateTo(`${PAGE_URL}account`); // Navigate to account page

  const newUsername = 'NewUsername123';

  await t
    .selectText(Selector('#accountUsername'))
    .pressKey('delete')
    .typeText(Selector('#accountUsername'), newUsername)
    .click(Selector('#accountForm button[type="submit"]'))
    .expect(Selector('#success-message').innerText)
    .contains('Profile details updated successfully!')
    .navigateTo(`${PAGE_URL}account`)
    .expect(Selector('#accountUsername').value)
    .eql(newUsername);
  await t
    .selectText(Selector('#accountUsername'))
    .pressKey('delete')
    .typeText(Selector('#accountUsername'), 'New User')
    .click(Selector('#accountForm button[type="submit"]'));
});

// 08 Add to Cart Functionality
fixture`08 Add to Cart Functionality`.page`${PAGE_URL}`;
test('Adds a new item to the cart', async (t) => {
  await clearSessionStorage(); // Clear session storage before test
  await login(t); // Ensure you are logged in
  await addToCart(t); // Add item to cart
});

// 09 Cart Functionality
fixture`09 Cart Functionality`.page`${PAGE_URL}`;
test('Navigates to cart and verifies contents', async (t) => {
  await login(t); // Ensure you are logged in
  await addToCart(t); // Add item to cart
  await t
    .click(Selector('.cart-item')) // Navigate to cart
    .expect(Selector('.cart-section').exists)
    .ok() // Validate cart section exists
    .expect(Selector('#total').innerText)
    .notEql('0'); // Validate that total is not 0
});

// 10 Checkout Page Verification
fixture`10 Checkout Page Verification`.page`${PAGE_URL}`;
test('Navigates to checkout and verifies all fields', async (t) => {
  await login(t); // Ensure you are logged in
  await addToCart(t); // Add item to cart and navigate to cart
  await t
    .click(Selector('#checkout-button')) // Click checkout button
    .expect(Selector('.checkout-section').exists)
    .ok() // Validate checkout section exists
    .expect(Selector('#firstName').value)
    .eql(''); // Assert initial value of firstName
  // ... Add more assertions as needed
});

// 11 Place Order Functionality
fixture`11 Place Order Functionality`.page`${PAGE_URL}`;
test('Completes an order and verifies redirection to order confirmation and then home page', async (t) => {
  await login(t); // Ensure you are logged in
  await addToCart(t); // Add item to cart and navigate to cart
  await t
    .click(Selector('#checkout-button')) // Navigate to checkout page
    .typeText(Selector('#firstName'), 'John') // Fill out the form
    .typeText(Selector('#lastName'), 'Doe')
    // ... Fill out the rest of the form as needed
    .click(Selector('#place-order-button')) // Place the order
    .expect(Selector('.order-confirmation-btn').exists)
    .ok() // Assert confirmation button exists
    .click(Selector('.order-confirmation-btn')) // Confirm order
    .expect(getLocation())
    .contains('/'); // Assert redirected to home
});

// 12 Logout Functionality
fixture`12 Logout Functionality`.page`${PAGE_URL}`;
test('Successfully logs out and clears the session', async (t) => {
  await login(t); // Ensure you are logged in
  await t
    .expect(getSessionStorage('token'))
    .ok() // Validate that the token exists
    .click(Selector('.logout-btn')) // Click logout button
    .expect(getSessionStorage('token'))
    .eql(null) // Validate that the token is cleared
    .expect(getLocation())
    .contains('/'); // Validate redirected to home or login page
});

// Additional utility to get the current location.
const getLocation = ClientFunction(() => document.location.href);
