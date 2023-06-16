import React from "react";
import Cart from "./cart";
import ProductDetail from "./product-detail";
import ProductList from "./product-list";

const Retail = () => {
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <ProductDetail />
        <Cart />
      </div>

      <ProductList />
    </div>
  );
};

export default Retail;
