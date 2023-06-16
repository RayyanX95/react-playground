import { render, screen } from "@testing-library/react";
import Cart from "./cart";
import { RetailProvider } from "./retail-context";
import fakeProducts from "./fake-products";

test("should render Cart component with 0 items & $0.00", () => {
  render(
    <RetailProvider products={fakeProducts}>
      <Cart />
    </RetailProvider>
  );

  expect(screen.getByText(/0 items/i)).toBeInTheDocument();
  expect(screen.getByText("$0.00")).toBeInTheDocument();
});
