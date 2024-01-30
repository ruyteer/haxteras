import React, { useEffect, useState } from "react";
import { AllHeader } from "../../../../components/header/AllHeader";
import "./styles.css";
import { useParams } from "react-router-dom";
import { handleFindProduct } from "../../../../helpers/find-product";
import { getNowDate } from "../../../../helpers/get-date";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function SendVoucher() {
  const userId = localStorage.getItem("userId");
  const { quantity, id } = useParams();
  const [product, setProduct] = useState({});
  const orderId = localStorage.getItem("orderPixId");

  useEffect(() => {
    handleGetProduct();
  }, []);

  const handleGetProduct = async () => {
    const result = await handleFindProduct(id);
    setProduct(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("orderList", orderId);
    const orderIdGenerated = Math.floor(Math.random() * 100000).toFixed(0);

    try {
      const response = await fetch(`${url}/order/update/voucher/`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        localStorage.removeItem("orderPixId");
        window.location.href = `${local}/payment/success/${orderIdGenerated}`;
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <AllHeader />
      <div className="send-voucher">
        <div className="content">
          <h1>Comprovante</h1>
          <p>
            Selecione o arquivo do seu comprovante ou arraste para a caixa
            abaixo:
          </p>
          <form onSubmit={handleSubmit}>
            <input type="file" name="file" id="voucher" required />
            <button type="submit">Enviar comprovante</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SendVoucher;
