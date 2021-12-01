describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
    cy.contains("Log In");
  });

  it("should log in", () => {
    cy.get("button").contains("Log In").click();
  });

  it("should log in as an admin", () => {
    cy.get('#username').type(Cypress.env("Email"))
    cy.get("button").contains(/^Continue$/).click();
    cy.get('#password').type(Cypress.env("Password")).click();
    cy.get("button").contains("Continue").click();
  })
});