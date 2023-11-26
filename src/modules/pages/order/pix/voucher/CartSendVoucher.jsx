import React, { useEffect, useState } from "react";
import { AllHeader } from "../../../../components/header/AllHeader";
import "./styles.css";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function CartSendVoucher() {
  const userId = localStorage.getItem("userId");
  const [products, setProducts] = useState([{}]);
  const totalPrice = JSON.parse(sessionStorage.getItem("total-price"));

  useEffect(() => {
    handleGetProduct();
  }, []);

  const handleGetProduct = async () => {
    const result = JSON.parse(localStorage.getItem("cart"));
    setProducts(result);
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
    let quantity = 0;
    products.map((result) => {
      idArray.push(result.id);
      quantity += result.quantity;
    });

    console.log(idArray);

    const orderId = Math.floor(Math.random() * 100000).toFixed(0);
    const formData = new FormData(e.target);
    formData.append("userId", userId);
    formData.append("quantity", quantity);
    formData.append("products", JSON.stringify(idArray));
    formData.append("paymentMethod", "pix");
    formData.append("paymentIntent", orderId);
    formData.append("amount", totalPrice.price);
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

export default CartSendVoucher;
