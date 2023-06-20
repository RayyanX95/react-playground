import { screen } from "@testing-library/react";
import Cart from "./cart";
import { fakeStore, render } from "./utils/test-utils";

test("Cart, given initial render, displays empty cart", () => {
  render(<Cart />, { initialState: fakeStore });

  expect(screen.getByText(/0 items/i)).toBeInTheDocument();
  expect(screen.getByText(/\$0\.00/i)).toBeInTheDocument();
});
