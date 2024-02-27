import React, { useEffect, useState } from "react";
import "./styles.css";
const url = import.meta.env.VITE_URL;
const stripeKey = import.meta.env.VITE_STRIPE;
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardForm } from "../../../components/stripe-form/CardForm";
import { AllHeader } from "../../../components";
import { useParams } from "react-router-dom";
import { handleFindProduct } from "../../../helpers/find-product";
import { getNowDate } from "../../../helpers/get-date";
const stripePromise = loadStripe(stripeKey);

function OneProductCreditCard() {
  const { id, quantity } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [product, setProduct] = useState({});
  const userId = localStorage.getItem("userId");
  const userIp = sessionStorage.getItem("userip");

  const handleGetClientSecret = async () => {
    const response = await handleFindProduct(id);
    const price = ((await response.price) * quantity).toFixed(2);

    const date = getNowDate();

    try {
      fetch(`${url}/order/create/intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          userId,
          date,
          paymentMethod: "card",
          productType: "product",
          products: [
            {
              id,
              quantity: parseInt(quantity),
              price: response.price,
            },
          ],
          quantity,
          userIp,
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

  const handleGetProducts = async () => {
    const response = await handleFindProduct(id);
    setProduct(response);
  };

  const handleGetPrice = () => {
    return (product.price * quantity).toFixed(2);
  };

  useEffect(() => {
    handleGetProducts();

    handleGetClientSecret();
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
              <CardForm productId={[id]} quantity={quantity} />
            </Elements>
          )}
        </div>
        <div className="resum">
          <h1>Resumo</h1>
          <div className="line"></div>

          <div className="details">
            <div className="name">
              <p>{product.name}</p>
              <p>Quantidade</p>
            </div>
            <div className="price">
              <p>R$ {product.price}</p>
              <p> {quantity}</p>
            </div>
          </div>

          <div className="line"></div>
          <div className="total">
            <p>Total</p>
            <p className="total-price">R$ {handleGetPrice()}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export { OneProductCreditCard };
