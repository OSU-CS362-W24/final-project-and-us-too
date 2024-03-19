describe('e2e testing spec for chart builder', () => {
  it('correctly generates chart image when necessary data is entered', () => {
    cy.visit('/line.html');
    cy.enterChartData();

    // check that no image/chart exists before generating the chart
    cy.findByRole("img").should("not.exist");

    // generate the chart
    cy.findByRole("button", {name: "Generate chart"}).click()

    // check that the image/chart exists after clicking
    cy.findByRole("img").should("exist");
  });

  it('correctly maintains chart data when user navigates to different chart page', () => {
    cy.visit('/line.html');
    cy.enterChartData();
    cy.visit('/scatter.html');

    // check that info is present in all the same inputs
    cy.findByLabelText("Chart title").should("have.value", "Test chart")
    cy.findByLabelText("X label").should("have.value", "Test X");
    cy.findByLabelText("Y label").should("have.value", "Test Y");

    cy.findAllByLabelText("X")
    .spread((firstInput, secondInput, thirdInput, fourthInput, fifthInput) => {
      cy.wrap(firstInput).should("have.value", "1");
      cy.wrap(secondInput).should("have.value", "2");
      cy.wrap(thirdInput).should("have.value", "3");
      cy.wrap(fourthInput).should("have.value", "4");
      cy.wrap(fifthInput).should("have.value", "5");
    });

    cy.findAllByLabelText("Y")
    .spread((firstInput, secondInput, thirdInput, fourthInput, fifthInput) => {
      cy.wrap(firstInput).should("have.value", "3");
      cy.wrap(secondInput).should("have.value", "5");
      cy.wrap(thirdInput).should("have.value", "10");
      cy.wrap(fourthInput).should("have.value", "20");
      cy.wrap(fifthInput).should("have.value", "35");
    });
  });

  it('correctly saves generated chart to gallery when \'Save chart\' button is clicked', () => {
    cy.visit('/line.html');
    cy.enterChartData();
    cy.findByRole("button", {name: "Generate chart"}).click()

    // save chart and verify 'Chart save' button is disabled after clicking
    cy.findByRole("button", {name: "Save chart"}).click().should('have.prop', "disabled")

    // go to gallery
    cy.visit('/');

    // verify that image exists and matching title is displayed
    cy.findByRole("img").should("exist");
    cy.findByText("Test chart").should("exist");
  });

  it('correctly displays saved chart and its data when user clicks chart in gallery', () => {
    cy.visit('/line.html');
    cy.enterChartData();
    cy.findByRole("button", {name: "Generate chart"}).click()
    cy.findByRole("button", {name: "Save chart"}).click();
    cy.visit('/');

    // click the img element
    cy.findByRole("img").click()

    // verify redirected back to graph page with existing chart image
    cy.url().should("include", "/line.html")
    cy.findByRole("img").should("exist");

    // verify that chart data is properly populated with values
    cy.findByLabelText("Chart title").should("have.value", "Test chart")
    cy.findByLabelText("X label").should("have.value", "Test X");
    cy.findByLabelText("Y label").should("have.value", "Test Y");

    cy.findAllByLabelText("X")
    .spread((firstInput, secondInput, thirdInput, fourthInput, fifthInput) => {
      cy.wrap(firstInput).should("have.value", "1");
      cy.wrap(secondInput).should("have.value", "2");
      cy.wrap(thirdInput).should("have.value", "3");
      cy.wrap(fourthInput).should("have.value", "4");
      cy.wrap(fifthInput).should("have.value", "5");
    });

    cy.findAllByLabelText("Y")
    .spread((firstInput, secondInput, thirdInput, fourthInput, fifthInput) => {
      cy.wrap(firstInput).should("have.value", "3");
      cy.wrap(secondInput).should("have.value", "5");
      cy.wrap(thirdInput).should("have.value", "10");
      cy.wrap(fourthInput).should("have.value", "20");
      cy.wrap(fifthInput).should("have.value", "35");
    });
  });
})