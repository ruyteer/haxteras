import React, { useEffect, useState } from "react";
import { AllHeader } from "../../../../components/header/AllHeader";
import "./styles.css";
import { getNowDate } from "../../../../helpers/get-date";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function CartSendVoucher() {
  const userId = localStorage.getItem("userId");
  const products = JSON.parse(localStorage.getItem("cart"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = getNowDate();

    const orderId = Math.floor(Math.random() * 100000).toFixed(0);

    const fetchPromises = products.map(async (result) => {
      const formData = new FormData(e.target);
      formData.append("userId", userId);
      formData.append("quantity", result.quantity);
      formData.append("products", JSON.stringify([result.id]));
      formData.append("paymentMethod", "pix");
      formData.append("paymentIntent", orderId);
      formData.append("amount", JSON.stringify(result.price * result.quantity));
      formData.append("date", date);

      // Check if a file is selected
      const fileInput = e.target.querySelector('input[type="file"]');
      const file = fileInput.files[0];

      if (!file) {
        // If no file is selected, append a placeholder string
        formData.delete("file");
      }

      return fetch(`${url}/order/create`, {
        method: "POST",
        body: formData,
      });
    });

    Promise.all(fetchPromises)
      .then(() => {
        window.location.href = `${local}/payment/success/${orderId}`;
      })
      .catch((error) => {
        console.error("Erro ao processar as fetchs:", error);
      });
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

export default CartSendVoucher;
