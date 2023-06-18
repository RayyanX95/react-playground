import { render, screen } from "@testing-library/react";
import fakeProducts from "./fake-products";
import { RetailProvider } from "./retail-context";
import Retail from "./retail";
import userEvent from "@testing-library/user-event";

test("should user able to view product details", () => {
  render(
    <RetailProvider products={fakeProducts}>
      <Retail />
    </RetailProvider>
  );

  // Only one heading has the title before showing the product details
  const productHeadingTitle = screen.getByRole("heading", {
    name: fakeProducts[0].title,
  });
  userEvent.click(productHeadingTitle);

  // After showing the product details, there are two heading with the title
  const productHeadingTitleAfter = screen.getAllByRole("heading", {
    name: fakeProducts[0].title,
  });

  expect(productHeadingTitleAfter.length).toEqual(2);

  // The price appears in a heading element in the product details
  const priceHeading = screen.getByRole("heading", {
    name: `$${fakeProducts[0].price}`,
  });
  expect(priceHeading).toBeInTheDocument();

  const description = screen.getByText(fakeProducts[0].description);
  expect(description).toBeInTheDocument();
});

describe("integration: ProductDetails", () => {
  function addFirstItemToCart() {
    const firstProduct = fakeProducts[0];
    // Only one heading has the title before showing the product details
    const firstProductTitle = screen.getByRole("heading", {
      name: firstProduct.title,
    });

    userEvent.click(firstProductTitle);
    userEvent.click(screen.getByRole("button", { name: /add to cart/i }));
  }

  test("should use able to add a product to cart", () => {
    render(
      <RetailProvider products={fakeProducts}>
        <Retail />
      </RetailProvider>
    );

    addFirstItemToCart();

    expect(screen.getByText(/1 items/i)).toBeInTheDocument();
  });
});
