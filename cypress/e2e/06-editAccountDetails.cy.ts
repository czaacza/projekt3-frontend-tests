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
