import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function CardForm({ productId, quantity }) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const orderId = Math.floor(Math.random() * 100000).toFixed(0);
  const userId = localStorage.getItem("userId");

  const emailValue = JSON.parse(sessionStorage.getItem("userEmail"));

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,

      confirmParams: {
        return_url: `${local}/payment/success/${orderId}`,
        receipt_email: emailValue,
      },
    });

    if (paymentIntent) {
      if (paymentIntent.status === "succeeded") {
        localStorage.removeItem("cart");
        sessionStorage.removeItem("userEmail");
      }

      setIsLoading(false);
    }

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        toast(error.message, {
          type: "error",
          theme: "dark",
          pauseOnFocusLoss: false,
        });

        setMessage(error.message);
        setIsLoading(false);
      } else {
        toast("Houve um erro ao tentar efetuar o pagamento!", {
          type: "error",
          theme: "dark",
          pauseOnFocusLoss: false,
        });

        setMessage("An unexpected error occurred.");
        setIsLoading(false);
      }
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onLoadError={() => alert("Houve um erro, tente novamente mais tarde!")}
        options={{ defaultValues: { email: emailValue } }}
      />
      <PaymentElement
        id="payment-element"
        className="stripe-element"
        options={{
          layout: "tabs",
        }}
        onLoadError={() => alert("Houve um erro, tente novamente mais tarde!")}
      />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pagar agora"
          )}
        </span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export { CardForm };
