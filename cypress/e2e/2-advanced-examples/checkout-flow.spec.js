import user from "../../support/user";

describe("Checkout Flow", () => {
  it("allows a user to enter address and payment info and place an order", () => {
    cy.visit("/");

    // Enter Address
    cy.get("textbox", { name: /first name/i }).type(user.firstName);
    cy.get("textbox", { name: /last name/i }).type(user.lastName);
    cy.get("textbox", { name: /address line 1/i }).type(user.address1);
    cy.get("textbox", { name: /city/i }).type(user.city);
    cy.get("textbox", { name: /state/i }).type(user.state);
    cy.get("textbox", { name: /postal code/i }).type(user.zipCode);
    cy.get("textbox", { name: /country/i }).type(user.country);
    cy.contains(/next/i).click();

    // Enter Payment Info
    cy.get("textbox", { name: /card type/i }).type(user.cardType);
    cy.get("textbox", { name: /name on card/i }).type(user.cardHolder);
    cy.get("textbox", { name: /card number/i }).type(user.cardNumber);
    cy.get("textbox", { name: /expiration date/i }).type(user.expiryDate);
    cy.get("textbox", { name: /cvv/i }).type(user.cardCvv);
    cy.contains(/next/i).click();

    // Verify Shipping Details
    cy.contains(`${user.firstName} ${user.lastName}`).should("be.visible");
    cy.contains(user.address1).should("be.visible");
    cy.contains(`${user.city}, ${user.state} ${user.zipCode}`).should(
      "be.visible"
    );
    cy.contains(user.country).should("be.visible");

    // Verify Payment Details
    cy.contains(user.cardType).should("be.visible");
    cy.contains(user.cardHolder).should("be.visible");
    cy.contains(user.cardNumber).should("be.visible");
    cy.contains(user.expiryDate).should("be.visible");
    cy.contains(/place order/i).click();

    // Verify Order Submitted
    cy.get("heading", { name: /thank you for your order/i }).should(
      "be.visible"
    );
    cy.get("heading", { name: /your order number is #2001539/i }).should(
      "be.visible"
    );
  });
});
