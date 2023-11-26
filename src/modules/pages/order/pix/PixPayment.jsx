import React, { useEffect, useState } from "react";
import PixBody from "../../../components/pix/PixBody";
import { useParams } from "react-router-dom";
import { handleFindProduct } from "../../../helpers/find-product";
import { AllHeader } from "../../../components/header/AllHeader";

function PixPayment() {
  const { id, quantity } = useParams();
  const [product, setProduct] = useState({});

  const handleGetProduct = async () => {
    const response = await handleFindProduct(id);
    setProduct(response);
  };

  useEffect(() => {
    handleGetProduct();
  });

  return (
    <>
      <AllHeader />
      <div className="pix-page">
        <PixBody product={product} quantity={quantity} />
      </div>
    </>
  );
}

export default PixPayment;
