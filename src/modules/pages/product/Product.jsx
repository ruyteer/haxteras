import React from "react";
import { AllHeader } from "../../components";
import ProductPage from "../../components/product/ProductPage";
import PopupCart from "../cart/PopupCart";

function Product() {
  return (
    <div className="product-page-main">
      <AllHeader />
      <ProductPage />
      <PopupCart />
    </div>
  );
}

export { Product };
