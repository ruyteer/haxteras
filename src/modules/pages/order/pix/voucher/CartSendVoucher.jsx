import React, { useEffect, useState } from "react";
import { AllHeader } from "../../../../components/header/AllHeader";
import "./styles.css";
import { getNowDate } from "../../../../helpers/get-date";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function CartSendVoucher() {
  const userId = localStorage.getItem("userId");
  const products = JSON.parse(localStorage.getItem("cart"));
  const orderIdList = JSON.parse(localStorage.getItem("orderPixId"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderIdGenerated = Math.floor(Math.random() * 100000).toFixed(0);

    const fetchPromises = orderIdList.map(async (result) => {
      const formData = new FormData(e.target);

      return fetch(`${url}/order/update/voucher/${result}`, {
        method: "PUT",
        body: formData,
      });
    });

    Promise.all(fetchPromises)
      .then(() => {
        localStorage.removeItem("orderPixId");
        window.location.href = `${local}/payment/success/${orderIdGenerated}`;
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
