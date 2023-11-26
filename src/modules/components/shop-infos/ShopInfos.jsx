import React from "react";
import "./styles.css";

function ShopInfos() {
  return (
    <div className="shop-info">
      <div className="infos">
        <div className="infos-title">
          <img src="/delivery_dining.svg" alt="Delivery Dinning" />
          <h2>Entrega Rápida!</h2>
        </div>
        <p>
          A entrega será feita imediatamente <br /> após a confirmação do
          pagamento, <br />
          dentro do horário de entrega.
        </p>
      </div>
      <div className="info-line"></div>
      <div className="infos">
        <div className="infos-title">
          <img src="/security.svg" alt="Security" />
          <h2>Segurança</h2>
        </div>
        <p>
          A entrega é feita de maneira segura, <br />
          dessa forma não haverá perigo de ban <br /> na sua conta.
        </p>
      </div>
      <div className="info-line"></div>
      <div className="infos">
        <div className="infos-title">
          <img src="/access_time.svg" alt="Access Time" />
          <h2>Horário de Entrega</h2>
        </div>
        <p>
          As entregas estão ocorrendo normalmente <br />
          no intervalo de 11h:30 às 2h:00 da madrugada.
        </p>
      </div>
    </div>
  );
}

export { ShopInfos };
