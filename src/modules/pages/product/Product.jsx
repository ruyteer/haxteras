import React from "react";
import { AllHeader } from "../../components";
import ProductPage from "../../components/product/ProductPage";

function Product() {
  return (
    <div className="product-page-main">
      <AllHeader />
      <ProductPage />
    </div>
  );
}

export { Product };
