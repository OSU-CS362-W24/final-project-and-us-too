// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

require("@testing-library/cypress/add-commands");

Cypress.Commands.add("enterChartData", () => {
  cy.findByLabelText("Chart title").type("Test chart");
  cy.findByLabelText("X label").type("Test X");
  cy.findByLabelText("Y label").type("Test Y");

  const addValuesButton = cy.findByRole("button", {name: '+'});
  for (let i=0; i<4; i++) {
    addValuesButton.click();
  }

  cy.findAllByLabelText("X")
  .spread((firstInput, secondInput, thirdInput, fourthInput, fifthInput) => {
    cy.wrap(firstInput).type("1");
    cy.wrap(secondInput).type("2");
    cy.wrap(thirdInput).type("3");
    cy.wrap(fourthInput).type("4");
    cy.wrap(fifthInput).type("5");
  });

  cy.findAllByLabelText("Y")
  .spread((firstInput, secondInput, thirdInput, fourthInput, fifthInput) => {
    cy.wrap(firstInput).type("3");
    cy.wrap(secondInput).type("5");
    cy.wrap(thirdInput).type("10");
    cy.wrap(fourthInput).type("20");
    cy.wrap(fifthInput).type("35");
  });
  
  addValuesButton.click();
});

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