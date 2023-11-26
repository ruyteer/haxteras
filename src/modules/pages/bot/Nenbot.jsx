import React, { useEffect, useState } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AllHeader } from "../../components";
const local = import.meta.env.VITE_LOCAL;

function Nenbot() {
  const { day } = useParams();
  const [mcdValue, setMcdValue] = useState(1);

  const [price, setPrice] = useState(0);

  const handleGetPrice = () => {
    if (day === "30") {
      setPrice(45);
    } else if (day === "15") {
      setPrice(25);
    } else if (day === "7") {
      setPrice(15);
    } else {
      alert("Ocorreu um erro!");
    }
  };

  useEffect(() => {
    handleGetPrice();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      day,
      screen: mcdValue,
      price,
    };

    sessionStorage.setItem("dashbotData", JSON.stringify(data));
    window.location.href = `${local}/buy/bot/nenbot`;
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
              R$ {price}, 00 <span>uma tela</span>
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
