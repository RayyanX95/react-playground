import { render, screen } from "@testing-library/react";
import { RetailProvider } from "./retail-context";
import ProductDetail from "./product-detail";
import fakeProducts from "./fake-products";
import Product from "./product";
import userEvent from "@testing-library/user-event";

test("should details placeholder initially", () => {
  render(
    <RetailProvider>
      <ProductDetail />
    </RetailProvider>
  );

  const placeholderText = screen.getByRole("heading", {
    name: /retail store/i,
  });
  expect(placeholderText).toBeInTheDocument();
});

describe("add integration test between Product and ProductDetails", () => {
  test("should render add to cart button", () => {
    render(
      <RetailProvider products={fakeProducts}>
        <Product {...fakeProducts[0]} />
        <ProductDetail />
      </RetailProvider>
    );
    const card = screen.getByTestId("product-card");
    userEvent.click(card);

    expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
  });

  test("should render add to favorites button", () => {
    render(
      <RetailProvider products={fakeProducts}>
        <Product {...fakeProducts[0]} />
        <ProductDetail />
      </RetailProvider>
    );

    const card = screen.getByTestId("product-card");
    userEvent.click(card);

    expect(screen.getByText(/add to favorites/i)).toBeInTheDocument();
  });

  test("should render product description text", () => {
    render(
      <RetailProvider products={fakeProducts}>
        <Product {...fakeProducts[0]} />
        <ProductDetail />
      </RetailProvider>
    );

    const card = screen.getByTestId("product-card");
    userEvent.click(card);

    expect(screen.getByText(fakeProducts[0].description)).toBeInTheDocument();
  });
});
