import React, { useEffect, useState } from "react";
import { AllHeader } from "../../../components/header/AllHeader";
import CartPixBody from "../../../components/pix/CartPixBody";

function PixCartPayment() {
  const items = JSON.parse(localStorage.getItem("cart"));
  return (
    <>
      <AllHeader />
      <div className="pix-page">
        <CartPixBody products={items} />
      </div>
    </>
  );
}

export default PixCartPayment;
