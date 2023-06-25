import user from "../../support/user";

describe("Checkout Flow", () => {
  it("allows a user to enter address and payment info and place an order", () => {
    cy.visit("/");

    // Enter Address
    cy.findByRole("textbox", { name: /first name/i }).type(user.firstName);
    cy.findByRole("textbox", { name: /last name/i }).type(user.lastName);
    cy.findByRole("textbox", { name: /address line 1/i }).type(
      user.address.street
    );
    cy.findByRole("textbox", { name: /city/i }).type(user.address.city);
    cy.findByRole("textbox", { name: /state/i }).type(user.address.county);
    cy.findByRole("textbox", { name: /postal code/i }).type(
      user.address.zipCode
    );
    cy.findByRole("textbox", { name: /country/i }).type(user.address.country);
    cy.findByText(/next/i).click();

    // Enter Payment Info
    cy.findByRole("textbox", { name: /card type/i }).type(user.type);
    cy.findByRole("textbox", { name: /name on card/i }).type(user.fullName);
    cy.findByRole("textbox", { name: /card number/i }).type(user.number);
    cy.findByRole("textbox", { name: /expiration date/i }).type(user.untilEnd);
    cy.findByRole("textbox", { name: /cvv/i }).type(user.ccv);
    cy.findByText(/next/i).click();

    // Verify Shipping Details
    cy.findByText(user.fullName).should("be.visible");
    cy.findByText(user.address.street).should("be.visible");
    cy.findByText(
      `${user.address.city}, ${user.address.county} ${user.address.zipCode}`
    ).should("be.visible");
    cy.findByText(user.address.country).should("be.visible");

    // Verify Payment Details
    cy.findByText(user.type).should("be.visible");
    cy.findByText(user.fullName).should("be.visible");
    cy.findByText(user.number).should("be.visible");
    cy.findByText(user.untilEnd).should("be.visible");
    cy.findByText(/place order/i).click();

    // Verify Order Submitted
    cy.findByText(/thank you for your order/i).should("be.visible");
    cy.findByText(/your order number is #2001539/i).should("be.visible");
  });
});
