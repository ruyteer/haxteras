import React, { useEffect, useState } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AllHeader } from "../../components";
const local = import.meta.env.VITE_LOCAL;
const url = import.meta.env.VITE_URL;

function Nenbot() {
  const { id, day } = useParams();
  const [nenbot, setNenbot] = useState({});
  const [mcdValue, setMcdValue] = useState(1);

  const [price, setPrice] = useState(0);

  const handleGetNenbot = async () => {
    const response = await fetch(`${url}/product/${id}`);
    const responseJson = await response.json();
    setNenbot(responseJson);
  };

  useEffect(() => {
    handleGetNenbot();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      day,
      screen: mcdValue,
      price: nenbot.price,
    };

    sessionStorage.setItem("dashbotData", JSON.stringify(data));

    const response = await fetch(`${url}/order/preference`, {
      method: "POST",
      body: JSON.stringify({
        products: JSON.stringify([
          {
            id: "Nenbot",
            title: `${"Nenbot"} ${data.day}D`,
            picture_url:
              "https://storage.googleapis.com/haxteras.appspot.com/2a8ecc3215e0a270301afdc3de5e587f2e14bc03r1-1200-1773v2_hq.jpg?GoogleAccessId=firebase-adminsdk-fb1sc%40haxteras.iam.gserviceaccount.com&Expires=16730323200&Signature=FMRzz2llF6Nfj8zo1je%2BbmIpVrwZuqfUP%2F1MW%2FaY2%2B3KaNXaqSlSougfnFUBHaTOalrWrno5APnZgY%2BSOHjqDdhsZIlbUl7Kpj4Knyql6kfWnoeSauAz53I29hO9ZQM%2B8Oj4XJLdXhi9HYsdf0DxocIMjyZoZFR3sJ4gq64X6R72ESuTVUroUgB1WDxGlljvF%2Fz4kZDPCoCKMe1nC5KH9EH1nwtkAH7INgOzmW%2FRRuoYmrtRGm6zi%2BMb4YC4PD36xiaN%2BadUzNcG%2B%2BFcTlxIo7UDgcen2Rz2qj8LhUeAp%2F75LPEadRG19yyxa6Vfe04FJTtP%2F%2BvjF04%2B6Yy48f8Uqw%3D%3D",
            description: `${"Nenbot"} ${data.day}D`,
            quantity: parseInt(data.screen),
            unit_price: data.price,
          },
        ]),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (response.ok) {
      localStorage.setItem("preferenceId", responseJson);
      window.location.href = `${local}/buy/bot/nenbot`;
    }
  };

  const handleDecrease = () => {
    if (mcdValue > 1) {
      setMcdValue(mcdValue - 1);
    } else {
      toast("Você deve selecionar ao menos um!", {
        theme: "dark",
        pauseOnHover: false,
        type: "error",
      });
    }
  };
  const handleIncrease = () => {
    setMcdValue(mcdValue + 1);
  };

  return (
    <>
      <AllHeader />
      <div className="product-page">
        <img
          className="product-image"
          src="/bot-digimon.png"
          alt="Imagem do Produto"
          style={{ width: "450px" }}
        />

        <div className="details">
          <div className="info">
            <h1>Nenbot {day}D</h1>
            <p className="price">
              R$ {(nenbot.price * mcdValue).toFixed(2)} <span>uma tela</span>
            </p>
            <p className="installments">
              <img src="/Group.svg" alt="" />
              <p> em até 8x sem juros ou a vista no pix</p>
            </p>
            <p className="additional-info">
              Entrega imediata e segura, <br /> sem riscos de ban
            </p>

            <div className="buttons">
              <div className="quantity-input">
                <button
                  className="decrease-button button"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <input type="text" value={"MC" + mcdValue} />
                <button
                  className="increase-button button"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
              <Link to={`/buy/nenbot/`}>
                <button className="buy-button" onClick={handleSubmit}>
                  COMPRAR
                </button>
              </Link>
              <Link to={`/buy/nenbot/`}>
                <button className="add-cart-button" onClick={handleSubmit}>
                  <img src="/cart.svg" alt="Carrinho de Compras" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="cards-info">
          <div className="card-shipping">
            <p>Oferecemos um preço justo e acessível.</p>
          </div>
          <div className="card-shipping">
            <p>Oferecemos serviços de qualidade desde o NA.</p>
          </div>
          <div className="card-shipping">
            <p>Entre no discord e veja as referências.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nenbot;
