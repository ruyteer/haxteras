import React, { useEffect, useState } from "react";
import { AllHeader } from "../../../../components/header/AllHeader";
import "./styles.css";
import { getNowDate } from "../../../../helpers/get-date";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function CartSendVoucher() {
  const userId = localStorage.getItem("userId");
  const products = JSON.parse(localStorage.getItem("cart"));
  const orderIdList = localStorage.getItem("orderPixId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderIdGenerated = localStorage.getItem("orderGenerated");

    try {
      const formData = new FormData(e.target);
      formData.append("orderList", orderIdList);

      const response = await fetch(`${url}/order/update/voucher`, {
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
            <input type="file" name="file" id="voucher" />
            <button type="submit">Enviar comprovante</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CartSendVoucher;
