import { Selector } from 'testcafe';

fixture`Getting Started`.page`http://devexpress.github.io/testcafe/example`;

test('My first test', async (t) => {
  await t
    .typeText('#developer-name', 'John Doe')
    .click('#submit-button')

    // Use the assertion to check if the actual title is equal to the expected one
    .expect(Selector('#article-header').innerText)
    .eql('Thank you, John Doe!');
});
