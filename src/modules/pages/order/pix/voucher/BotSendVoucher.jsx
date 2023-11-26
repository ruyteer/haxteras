import React, { useEffect, useState } from "react";
import { AllHeader } from "../../../../components/header/AllHeader";
import "./styles.css";

const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function BotSendVoucher({ botType }) {
  const userId = localStorage.getItem("userId");
  const botData = JSON.parse(sessionStorage.getItem("dashbotData"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const date = `${day}/${month}/${year}:${hours}:${minutes}`;

    const price = botData.price * botData.screen;

    const orderId = Math.floor(Math.random() * 100000).toFixed(0);
    const formData = new FormData(e.target);
    formData.append("userId", userId);
    formData.append("quantity", botData.screen);
    formData.append("products", [`${botType} ${botData.day}`]);
    formData.append("paymentMethod", "pix");
    formData.append("paymentIntent", orderId);
    formData.append("amount", price);
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

export default BotSendVoucher;
