import React from "react";
import "./styles.css";
import { AllHeader } from "../../../components";
import { Link, useParams } from "react-router-dom";

function PaymentSuccess() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("redirect_status");
  const { orderId } = useParams();

  const handleRedirect = (link) => {
    window.location.href = link;
  };

  return (
    <>
      <AllHeader />
      <div className="payment-success">
        <div className="message">
          <h1>Obrigado! Sua compra foi efetuada com sucesso.</h1>
          <p>
            Status da compra: <span>sucesso</span>
          </p>
          <p>
            Código da compra: <span>{orderId}</span>
          </p>
          <div className="buttons">
            <Link to={"/"}>
              <button>Voltar</button>
            </Link>
            <button
              onClick={() => handleRedirect("https://discord.gg/7cAaZM357U")}
            >
              Discord
            </button>
            <button
              onClick={() =>
                handleRedirect(
                  "https://chat.whatsapp.com/KuGQsHQdmeCEc9Vet2RcNA"
                )
              }
            >
              Grupo whatsapp
            </button>
            <button
              onClick={() =>
                handleRedirect(
                  "https://api.whatsapp.com/send/?phone=%2B5516996406236&text=Ol%C3%A1&type=phone_number&app_absent=0"
                )
              }
            >
              Whatsapp Richard
            </button>
            <button
              onClick={() =>
                handleRedirect(
                  "https://api.whatsapp.com/send/?phone=%2B5516996406236&text=Ol%C3%A1&type=phone_number&app_absent=0"
                )
              }
            >
              Whatsapp Daniel
            </button>
          </div>

          <p
            style={{ marginTop: "50px", fontSize: "15px" }}
            className="infos-p"
          >
            Obs: se você comprou Nenbots via pix, entre em contato com Richard
            ou Daniel. <br />
            Caso tenha comprado via cartão de crédito, confira seu e-mail!
          </p>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
