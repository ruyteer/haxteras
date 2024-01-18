import React, { useEffect, useState } from "react";
import "./styles.css";
const url = import.meta.env.VITE_URL;
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardForm } from "../../../components/stripe-form/CardForm";
import { AllHeader } from "../../../components";
import { getNowDate } from "../../../helpers/get-date";
const stripePromise = loadStripe(
  "pk_live_51N09qSCO5oq5CqAZFzFFzAztN59UukW2J6XAcGaECxJsBGlWyMXPPotwvnbUtxsvTwfUPW3QK7Q0Mpp1Te3Z65vv00DQdIINZv"
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
      const date = getNowDate();
      const items = JSON.parse(localStorage.getItem("cart"));

      let productsList = [];

      items.map((result) => {
        productsList.push({
          id: result.id,
          quantity: result.quantity,
          price: result.price,
        });
      });

      fetch(`${url}/order/create/intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          paymentMethod: "card",
          products: productsList,
          date,
          userId,
          productType: "product",
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
            <p className="total-price">R$ {itemPrice.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export { CreditCard };
