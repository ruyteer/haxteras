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

  useEffect(() => {
    handleGetProduct();
  }, []);

  const handleGetProduct = async () => {
    const result = await handleFindProduct(id);
    setProduct(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = getNowDate();

    const orderId = Math.floor(Math.random() * 100000).toFixed(0);
    const formData = new FormData(e.target);
    formData.append("userId", userId);
    formData.append("quantity", quantity);
    formData.append("products", JSON.stringify([id]));
    formData.append("paymentMethod", "pix");
    formData.append("paymentIntent", orderId);
    formData.append("amount", (product.price * quantity).toFixed(2));
    formData.append("date", date);

    // Check if a file is selected
    const fileInput = e.target.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (!file) {
      // If no file is selected, append a placeholder string
      formData.append("file", "comprovante nao enviado");
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

export default SendVoucher;
