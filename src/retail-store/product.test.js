import faker from "faker";
import { render } from "./utils/test-utils";
import { screen } from "@testing-library/react";
import Product from "./product";

describe("Product components tests: ", () => {
  test("should render the right product title", () => {
    const product = {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.fashion(),
    };
    render(<Product {...product} />);

    expect(
      screen.getByRole("heading", { name: product.title })
    ).toBeInTheDocument();
  });

  test("should render image tag", () => {
    const product = {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.fashion(),
    };
    render(<Product {...product} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("should render the img tag with the right src", () => {
    const product = {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.fashion(),
    };
    render(<Product {...product} />);
    expect(screen.getByRole("img")).toHaveAttribute("src", product.image);
  });
});
