describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
    cy.contains("Log In");
  });

  it("should log in as an admin", () => {
    cy.get("button").contains("Log In").click();
    cy.get('#username').type(Cypress.env("Email"))
    cy.get("button").contains(/^Continue$/).click();
    cy.get('#password').type(Cypress.env("Password")).click();
    cy.get("button").contains("Continue").click();
    cy.get(".link").should('have.length', 6);
  });

  it("should view Today At Glance", () => {
    cy.get(".link").contains("Today at Glance").click();
    cy.wait(1000);  
  });

  it("should view Work Orders", () => {
    cy.get(".link").contains("Work Orders").click();
    cy.wait(1000);
  });

  it("should view Inventories", () => {
    cy.get(".link").contains("Inventories").click();  
    cy.wait(1000);
  })

  it("should view Assets", () => {
    cy.get(".link").contains("Assets").click();
    cy.wait(1000);  
  });

  it("should view Summary", () => {
    cy.get(".link").contains("Summary").click();
    cy.wait(1000);  
  });

  it("should view Chat Platform", () => {
    cy.get(".link").contains("Chat Platform").click();
    cy.wait(1000);  
  });

  it("should log out", () => {
    cy.get("button").contains("Log Out").click();
  });

  it("should log in as a technician", () => {
    cy.get("button").contains("Log In").click();
    cy.get('#username').type(Cypress.env("TechEmail"));
    cy.get("button").contains(/^Continue$/).click();
    cy.get('#password').type(Cypress.env("TechPassword")).click();
    cy.get("button").contains("Continue").click();
    cy.get(".link").should('have.length', 2);
  });

  it("should view Work Orders", () => {
    cy.get(".link").contains("Work Orders").click();
    cy.wait(1000);
  });

  it("should view Chat Platform", () => {
    cy.get(".link").contains("Chat Platform").click();
    cy.wait(1000);  
  });

  it("should log out", () => {
    cy.get("button").contains("Log Out").click();
  });

});