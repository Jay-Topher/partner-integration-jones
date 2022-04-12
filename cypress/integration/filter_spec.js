/* eslint-disable no-undef */
describe("The app works as expected", () => {
  it("A user can see companies and filter through them", () => {
    // Visit site
    // use filters, type "fr", select "LIVE", multi select all payments
    // you should see two companies, assert the name, status and payment methods
    // clear filters and assert that the inputs are cleared
    const searchText = "fr";
    cy.visit("http://localhost:3000/");
    cy.findByRole("searchbox", { name: /by name/i }).type(searchText);
    cy.findByRole("button", { name: /by status ​/i }).click();
    cy.findByRole("option", { name: /live/i }).click();
    cy.get("#mui-component-select-paymentModes").click();
    cy.findByRole("option", { name: /credit card/i }).click();
    cy.findByRole("option", { name: /paypal/i }).click();
    cy.findByRole("option", { name: /bank transfer/i }).click();

    // press esc to mock a click away
    cy.get("body").trigger("keydown", { keyCode: 27 });
    cy.wait(500);
    cy.get("body").trigger("keyup", { keyCode: 27 });
    // end of click away

    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)")
      .then((node) => node[0].textContent)
      .then((companyName) =>
        expect(companyName).to.match(new RegExp(searchText, "i"))
      );

    cy.get('[data-testid="filterBtn"]').click();
    cy.findByRole("searchbox", { name: /by name/i })
      .then((node) => node[0].value)
      .then((value) => expect(value).to.equal(""));
  });
});
