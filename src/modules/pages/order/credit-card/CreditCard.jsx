import React, { useEffect, useState } from "react";
import "./styles.css";
const url = import.meta.env.VITE_URL;
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardForm } from "../../../components/stripe-form/CardForm";
import { AllHeader } from "../../../components";
import { useParams } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51NOmpNIRbkxCjPq7BY4L1E7CzVhvF5eOxPdwJTBYDMZhPuNKh7MIjCWJGCsCmaZGt80w8a801PWwCkvW84J6vQNw00ThyuQ1HC"
);

function CreditCard() {
  const [clientSecret, setClientSecret] = useState("");
  const itemPrice = JSON.parse(sessionStorage.getItem("total-price"));
  const [products, setProducts] = useState([{}]);
  const userId = localStorage.getItem("userId");
  const [itemIds, setItemIds] = useState([]);
  const [quantityItem, setQuantityItem] = useState(0);
  const handleGetClientSecret = async () => {
    const { price } = JSON.parse(sessionStorage.getItem("total-price"));

    try {
      const now = new Date();

      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      const date = `${day}/${month}/${year}:${hours}:${minutes}`;
      const items = JSON.parse(localStorage.getItem("cart"));
      let listId = [];
      let itemQuantity = 0;
      items.map((result) => {
        listId.push(result.id);
        itemQuantity += result.quantity;
      });

      setItemIds(listId);
      setQuantityItem(itemQuantity);

      fetch(`${url}/order/create/intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          paymentMethod: "card",
          products: listId,
          quantity: itemQuantity,
          date,
          userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProducts = () => {
    const items = JSON.parse(localStorage.getItem("cart"));
    setProducts(items);
    let listId = [];
    let itemQuantity = 0;
    items.map((result) => {
      listId.push(result.id);
      itemQuantity += result.quantity;
    });

    setItemIds(listId);
    setQuantityItem(itemQuantity);
  };

  useEffect(() => {
    handleGetClientSecret();
    handleGetProducts();
  }, []);

  return (
    <>
      <AllHeader />
      <div className="payment-card">
        <div className="stripe-container">
          {clientSecret && (
            <Elements
              options={{
                clientSecret,
                appearance: {
                  theme: "night",
                },
                loader: "always",
              }}
              stripe={stripePromise}
            >
              <CardForm productId={itemIds} quantity={quantityItem} />
            </Elements>
          )}
        </div>
        <div className="resum">
          <h1>Resumo</h1>
          <div className="line"></div>
          {products.map((result) => (
            <>
              <div className="details">
                <div className="name">
                  <p>{result.name}</p>
                  <p>Quantidade</p>
                </div>
                <div className="price">
                  <p>R$ {result.price}</p>
                  <p> {result.quantity}</p>
                </div>
              </div>
            </>
          ))}
          <div className="line"></div>
          <div className="discount">
            <p>Desconto</p>
            <p>{itemPrice.discount}%</p>
          </div>
          <div className="line"></div>
          <div className="total">
            <p>Total</p>
            <p className="total-price">R$ {itemPrice.price}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export { CreditCard };
