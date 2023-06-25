import user from "../../support/user";

describe("Checkout Flow", () => {
  it("allows a user to enter address and payment info and place an order", () => {
    cy.visit("/");

    // Enter Address
    cy.get('input[name="firstName"]').type(user.firstName);
    cy.get('input[name="lastName"]').type(user.lastName);
    cy.get('input[name="address1"]').type(user.address.street);
    cy.get('input[name="city"]').type(user.address.city);
    cy.get('input[name="state"]').type(user.address.county);
    cy.get('input[name="zipCode"]').type(user.address.zipCode);
    cy.get('input[name="country"]').type(user.address.country);
    cy.contains(/next/i).click();

    // Enter Payment Info
    cy.get('input[name="cardType"]').type(user.type);
    cy.get('input[name="cardHolder"]').type(user.fullName);
    cy.get('input[name="cardNumber"]').type(user.number);
    cy.get('input[name="expiryDate"]').type(user.untilEnd);
    cy.get('input[name="cardCvv"]').type(user.ccv);
    cy.contains(/next/i).click();

    // Verify Shipping Details
    cy.contains(user.fullName).should("be.visible");
    cy.contains(user.address.street).should("be.visible");
    cy.contains(
      `${user.address.city}, ${user.address.county} ${user.address.zipCode}`
    ).should("be.visible");
    cy.contains(user.address.country).should("be.visible");

    // Verify Payment Details
    cy.contains(user.type).should("be.visible");
    cy.contains(user.fullName).should("be.visible");
    cy.contains(user.number).should("be.visible");
    cy.contains(user.untilEnd).should("be.visible");
    cy.contains(/place order/i).click();

    // Verify Order Submitted
    cy.contains(/thank you for your order/i).should("be.visible");
    cy.contains(/your order number is #2001539/i).should("be.visible");
  });
});
