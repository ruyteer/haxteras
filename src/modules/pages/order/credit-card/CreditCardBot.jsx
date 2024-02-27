import React, { useEffect, useState } from "react";
import "./styles.css";
const url = import.meta.env.VITE_URL;
const stripeKey = import.meta.env.VITE_STRIPE;
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardForm } from "../../../components/stripe-form/CardForm";
import { AllHeader } from "../../../components";
import { useParams } from "react-router-dom";
import { getNowDate } from "../../../helpers/get-date";
import { getClientIp } from "../../../helpers/get-ip";
const stripePromise = loadStripe(stripeKey);

function CreditCardBot({ botType }) {
  const [clientSecret, setClientSecret] = useState("");
  const botData = JSON.parse(sessionStorage.getItem("dashbotData"));
  const userId = localStorage.getItem("userId");
  const price = botData.price * botData.screen;

  const handleGetClientSecret = async () => {
    const price = botData.price * botData.screen;
    const userIp = await getClientIp();

    try {
      const date = getNowDate();

      const productData = {
        type: botType,
        day: botData.day,
        mdc: botData.screen,
      };

      fetch(`${url}/order/create/intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          paymentMethod: "card",
          products: [productData],
          date,
          userId,
          productType: botType,
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

  useEffect(() => {
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
              <CardForm />
            </Elements>
          )}
        </div>
        <div className="resum">
          <h1>Resumo</h1>
          <div className="line"></div>

          <div className="details">
            <div className="name">
              <p>{`${botType} ${botData.day}`}</p>
              <p>Quantidade</p>
            </div>
            <div className="price">
              <p>R$ {botData.price}</p>
              <p> {botData.screen}</p>
            </div>
          </div>

          <div className="line"></div>
          <div className="total">
            <p>Total</p>
            <p className="total-price">R$ {price}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreditCardBot;
