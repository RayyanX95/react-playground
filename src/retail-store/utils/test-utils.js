import { configureStore } from "@reduxjs/toolkit";
import faker from "faker";
import retailSlice from "../retail-slice";
import { Provider } from "react-redux";
import { render as rtlRender } from "@testing-library/react";

const fakeStore = {
  retail: {
    products: [
      {
        id: faker.random.uuid(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        image: faker.image.fashion(),
      },
      {
        id: faker.random.uuid(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        image: faker.image.fashion(),
      },
    ],
    cartItems: [],
    favorites: [],
    showProductDetails: null,
  },
};

const render = (
  ui,
  {
    initialState,
    store = configureStore({
      reducer: { retail: retailSlice },
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// export * from "@testing-library/react";
export { render, fakeStore };
