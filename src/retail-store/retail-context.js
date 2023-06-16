import { createContext, useContext, useReducer } from "react";

const RetailContext = createContext();

/**
 * React component to render retail context provider
 * @param {*} props
 */
const RetailProvider = (props) => {
  const retailReducer = (state, action) => {
    switch (action.type) {
      case "SHOW_DETAILS":
        return {
          ...state,
          showProductDetails: state.products.find(
            (product) => product.id === action.id
          ),
        };
      case "ADD_TO_CART":
        return {
          ...state,
          cartItems: [
            ...state.cartItems.filter((item) => item.id !== action.product.id),
            {
              id: action.product.id,
              title: action.product.title,
              price: action.product.price,
              quantity: action.quantity,
            },
          ],
        };
      case "ADD_TO_FAVORITES":
        return {
          ...state,
          favorites: [...state.favorites, action.productId],
        };
      case "REMOVE_TO_FAVORITES":
        return {
          ...state,
          favorites: state.favorites.filter(
            (favorites) => favorites !== action.productId
          ),
        };

      default:
        return { ...state };
    }
  };

  const initialState = {
    products: props.products,
    cartItems: [],
    favorites: [],
    showProductDetails: null,
  };

  const [state, dispatch] = useReducer(retailReducer, initialState);

  const value = [state, dispatch];

  return (
    <RetailContext.Provider value={value}>
      {props.children}
    </RetailContext.Provider>
  );
};

const useRetail = () => {
  const retailContext = useContext(RetailContext);

  const [state, dispatch] = retailContext;

  const getDetails = (productId) => {
    dispatch({ type: "SHOW_DETAILS", id: productId });
  };

  const addToCart = (product, quantity) => {
    dispatch({ type: "ADD_TO_CART", product, quantity: quantity });
  };

  const addToFavorites = (productId) => {
    dispatch({ type: "ADD_TO_FAVORITES", productId });
  };

  const removeToFavorites = (productId) => {
    dispatch({ type: "REMOVE_TO_FAVORITES", productId });
  };

  return { state, addToCart, addToFavorites, getDetails, removeToFavorites };
};

export { RetailProvider, useRetail };
