import React, { useEffect, useState } from "react";
import "./styles.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function PixBodyBot({ botData, botType }) {
  const handleTotalPrice = () => {
    const price = botData.price * botData.screen;

    return price;
  };

  const handleCopyKey = (e) => {
    e.preventDefault();

    navigator.clipboard.writeText("41.632.917/0001-96");
    toast("Chave pix copiada para a área de transferência!", {
      type: "success",
      theme: "dark",
      pauseOnHover: false,
    });
  };

  return (
    <div className="pix-body">
      <div className="content">
        <div className="titles">
          <h1>Pague agora com Pix</h1>

          <div className="paragraf">
            <p>
              Faça o pagamento via PIX. O seu pedido será liberado assim que a
              confirmação do pagamento for efetuada.
            </p>
            <p style={{ marginTop: "10px" }}>
              Leia o QRCode abaixo com o aplicativo do seu banco e realize o
              pagamento do Pix:
            </p>
          </div>
        </div>

        <div className="voucher-buttons">
          <Link to={`/payment/pix/voucher/${botType}`}>
            <button>Enviar comprovante</button>
          </Link>
        </div>

        <div className="qrcode">
          <img src="/qrcode.jpeg" alt="Pix QRCODE" />
        </div>

        <div className="copy-key">
          <p>
            Transfira: <span> R$ {handleTotalPrice().toFixed(2)}</span>{" "}
          </p>

          <label>Para a chave Pix:</label>
          <input type="text" value={"41.632.917/0001-96"} />
          <label>Tipo de chave:</label>
          <input type="text" value={"CNPJ"} />

          <button onClick={handleCopyKey}>Copiar chave</button>
        </div>
      </div>

      <div className="resum">
        <h1>Resumo</h1>
        <div className="line"></div>

        <div className="details">
          <div className="name">
            <p>{`${botType} ${botData.day}D`}</p>
            <p>Quantidade</p>
          </div>
          <div className="price">
            <p>R$ {botData.price}, 00</p>
            <p> {botData.screen}</p>
          </div>
        </div>

        <div className="line"></div>
        <div className="total">
          <p>Total</p>
          <p className="total-price">R$ {handleTotalPrice().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default PixBodyBot;
