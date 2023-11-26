import React, { useEffect, useState } from "react";
import { AllHeader } from "../../../../components/header/AllHeader";
import "./styles.css";
import { useParams } from "react-router-dom";
import { handleFindProduct } from "../../../../helpers/find-product";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function SendVoucher() {
  const userId = localStorage.getItem("userId");
  const { quantity, id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    handleGetProduct();
  }, []);

  const handleGetProduct = async () => {
    const result = await handleFindProduct(id);
    setProduct(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const date = `${day}/${month}/${year}:${hours}:${minutes}`;
    let idArray = [];
    idArray.push(id);
    const orderId = Math.floor(Math.random() * 100000).toFixed(0);
    const formData = new FormData(e.target);
    formData.append("userId", userId);
    formData.append("quantity", quantity);
    formData.append("products", idArray);
    formData.append("paymentMethod", "pix");
    formData.append("paymentIntent", orderId);
    formData.append("amount", product.price);
    formData.append("date", date);

    try {
      const response = await fetch(`${url}/order/create`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.href = `${local}/payment/success/${orderId}`;
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
            <input type="file" name="file" id="voucher" />
            <button type="submit">Enviar comprovante</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SendVoucher;
