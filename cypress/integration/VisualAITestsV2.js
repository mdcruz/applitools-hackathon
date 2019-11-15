/// <reference types="Cypress" />

describe("Applitools Demo App", () => {
  beforeEach(() => {
    cy.eyesOpen({ appName: "ACME Demo App", batchName: "Hackathon" });
    cy.visit("/hackathonV2.html");
  });

  describe("Login Page", () => {
    it("it should display all fields and labels as expected", () => {
      cy.eyesCheckWindow("Login page");
    });

    it("should throw an error if username and password are not provided when logging in", () => {
      cy.get("#log-in").click();
      cy.eyesCheckWindow("Login page with error message");
    });

    it("should throw an error if only username is provided when logging in", () => {
      cy.get("#username").type("test-username");
      cy.get("#log-in").click();
      cy.eyesCheckWindow("Login page with error message");
    });

    it("should throw an error if only password is provided when logging in", () => {
      cy.get("#password").type("test-password");
      cy.get("#log-in").click();
      cy.eyesCheckWindow("Login page with error message");
    });

    it("should log you in successfully if both username and password are given", () => {
      cy.login("test-username", "test-password");
      cy.eyesCheckWindow("Recent transactions page");
    });
  });

  describe("Recent transactions page", () => {
    it("should display the recent transactions in ascending order when amount header is clicked", () => {
      cy.login("test-username", "test-password");
      cy.get("#amount").click();
      cy.eyesCheckWindow("Recent transactions page");
    });
  });

  describe("Compare expenses page", () => {
    it("should display data in the bar chart for a year correctly", () => {
      cy.login("test-username", "test-password");
      cy.get("#showExpensesChart").click();
      cy.wait(500);
      cy.eyesCheckWindow("Compare expenses for this year");
      cy.get(".btn-warning").click();
      cy.wait(500);
      cy.eyesCheckWindow("Compare expenses with forecast for next year");
    });
  });

  describe("Dynamic adverts", () => {
    it("should display adverts on the page", () => {
      cy.visit("/hackathonV2.html?showAd=true");
      cy.login("test-username", "test-password");
      cy.eyesCheckWindow("Dynamic adverts");
    });
  });
  afterEach(() => cy.eyesClose());
});
