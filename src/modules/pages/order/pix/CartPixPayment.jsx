import React, { useEffect, useState } from "react";
import { AllHeader } from "../../../components/header/AllHeader";
import CartPixBody from "../../../components/pix/CartPixBody";

function PixCartPayment() {
  const [products, setProducts] = useState([{}]);

  const handleGetProduct = async () => {
    const items = JSON.parse(localStorage.getItem("cart"));
    setProducts(items);
  };

  useEffect(() => {
    handleGetProduct();
  });

  return (
    <>
      <AllHeader />
      <div className="pix-page">
        <CartPixBody products={products} />
      </div>
    </>
  );
}

export default PixCartPayment;
