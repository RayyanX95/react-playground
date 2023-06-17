import { render, screen } from "@testing-library/react";
import faker from "faker";
import Product from "./product";
import { RetailProvider } from "./retail-context";

test("should render product data to the screen", () => {
  const productData = {
    id: faker.random.uuid(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    image: faker.image.fashion(),
  };

  render(
    <RetailProvider>
      <Product {...productData} />
    </RetailProvider>
  );

  expect(screen.getByText(productData.title)).toBeInTheDocument();

  const imgElem = screen.getByRole("img", { name: productData.title });
  expect(imgElem).toBeInTheDocument();
  expect(imgElem).toHaveAttribute("src", productData.image);

  expect(screen.getByText(`$${productData.price}`)).toBeInTheDocument();
});
