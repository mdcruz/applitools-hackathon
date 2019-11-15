/// <reference types="Cypress" />

describe("Applitools Demo App", () => {
  beforeEach(() => cy.visit("/hackathon.html"));

  describe("Login Page", () => {
    it("it should display all fields and labels as expected", () => {
      cy.get(".logo-w a img").should("be.visible");
      cy.get(".auth-header").should("contain", "Login Form");
      cy.get("#username").should("be.visible");
      cy.get(".os-icon-user-male-circle").should("be.visible");
      cy.get("#password").should("be.visible");
      cy.get(".os-icon-fingerprint").should("be.visible");
      cy.get("#log-in").should("be.visible");
      cy.get(".form-check-label")
        .should("be.visible")
        .should("have.text", "Remember Me");
      cy.get('img[src="img/social-icons/twitter.png"]').should("be.visible");
      cy.get('img[src="img/social-icons/facebook.png"]').should("be.visible");
      cy.get('img[src="img/social-icons/linkedin.png"]').should("be.visible");
    });

    it("should throw an error if username and password are not provided when logging in", () => {
      cy.get("#log-in").click();
      cy.get(".alert-warning")
        .should("be.visible")
        .should("have.text", "Both Username and Password must be present ");
    });

    it("should throw an error if only username is provided when logging in", () => {
      cy.get("#username").type("test-username");
      cy.get("#log-in").click();
      cy.get(".alert-warning")
        .should("be.visible")
        .should("have.text", "Password must be present");
    });

    it("should throw an error if only password is provided when logging in", () => {
      cy.get("#password").type("test-password");
      cy.get("#log-in").click();
      cy.get(".alert-warning")
        .should("be.visible")
        .should("have.text", "Username must be present");
    });

    it("should log you in successfully if both username and password are given", () => {
      cy.login("test-username", "test-password");
      cy.url().should("contain", "hackathonApp.html");
      cy.get(".logged-user-i").should("be.visible");
    });
  });

  describe("Recent transactions page", () => {
    it("should display the recent transactions in ascending order when amount header is clicked", () => {
      const transactions = [];
      let isSorted = true;

      cy.login("test-username", "test-password");
      cy.get("#amount").click();
      cy.get(".text-right.bolder.nowrap")
        .each(element => {
          cy.get(element)
            .invoke("text")
            .then(text =>
              transactions.push(
                Number(
                  text
                    .replace("USD", "")
                    .replace(/\s/g, "")
                    .replace(",", "")
                    .trim()
                )
              )
            );
        })
        .then(() => {
          // checks if array is in ascending order
          for (let i = 0; i < transactions.length; i++) {
            if (transactions[i] > transactions[i + 1]) {
              isSorted = false;
              break;
            }
          }

          expect(isSorted).to.equal(
            true,
            "Transactions was not in ascending order"
          );
        });
    });
  });

  describe("Compare expenses page", () => {
    it("should display data in the bar chart for a year correctly", () => {
      cy.login("test-username", "test-password");
      cy.get("#showExpensesChart").click();

      // from the DOM, there is no way to access the inner elements of the Canvas so this cannot
      // be automated by Cypress
    });
  });

  describe("Dynamic adverts", () => {
    it("should display adverts on the page", () => {
      cy.visit("/hackathon.html?showAd=true");
      cy.login("test-username", "test-password");
      cy.get("#flashSale").should("be.visible");
      cy.get("#flashSale2").should("be.visible");
    });
  });
});
