import React, { useEffect, useState } from "react";
import { AllHeader } from "../../../../components/header/AllHeader";
import "./styles.css";
import { getNowDate } from "../../../../helpers/get-date";

const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function BotSendVoucher({ botType }) {
  const userId = localStorage.getItem("userId");
  const botData = JSON.parse(sessionStorage.getItem("dashbotData"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = getNowDate();

    const price = botData.price * botData.screen;

    const orderId = Math.floor(Math.random() * 100000).toFixed(0);

    const dataBody = {
      type: botType,
      day: botData.day,
      mdc: botData.screen,
    };

    const formData = new FormData(e.target);
    formData.append("userId", userId);
    formData.append("quantity", botData.screen);
    formData.append("products", JSON.stringify([dataBody]));
    formData.append("paymentMethod", "pix");
    formData.append("paymentIntent", orderId);
    formData.append("amount", price);
    formData.append("date", date);

    // Check if a file is selected
    const fileInput = e.target.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (!file) {
      // If no file is selected, append a placeholder string
      formData.delete("file");
    }

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
