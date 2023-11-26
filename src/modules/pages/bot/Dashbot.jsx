import "./styles.css";
import { AllHeader } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const local = import.meta.env.VITE_LOCAL;

function Dashbot() {
  const { day } = useParams();
  const [mcdValue, setMcdValue] = useState(1);
  const [username, setUsername] = useState("");
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
    if (mcdValue < 5) {
      setMcdValue(mcdValue + 1);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      day,
      screen: mcdValue,
      username,
      price,
    };

    sessionStorage.setItem("dashbotData", JSON.stringify(data));
    window.location.href = `${local}/buy/bot/dashbot`;
  };

  return (
    <>
      <AllHeader />

      <div className="dashbot">
        <div className="image">
          <img src="/bot-digimon.png" alt="Digimon" />
        </div>

        <div className="dashbot-card">
          <h1>Dash BOT {day}D</h1>

          <p className="offer">
            por <span className="price">R$ {price}, 00</span>{" "}
            <span>uma tela</span>
          </p>

          <p className="installments">
            <img src="/Group.svg" alt="credit card" />
            em até 8x sem juros ou a vista no pix
          </p>

          <form onSubmit={handleSubmit}>
            <p>Digite seu username no ExpertHax</p>

            <input
              className="username-input"
              type="text"
              required
              placeholder="Seu username aqui"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="submit-buttons">
              <QuantityInput
                handleDecrease={handleDecrease}
                handleIncrease={handleIncrease}
                mcdValue={mcdValue}
              />

              <button type="submit" className="submit">
                Comprar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function QuantityInput({ handleDecrease, handleIncrease, mcdValue }) {
  return (
    <div className="quantity-input">
      <button
        type="button"
        className="decrease-button button"
        onClick={handleDecrease}
      >
        -
      </button>
      <input type="text" value={"MC" + mcdValue} />
      <button
        type="button"
        className="increase-button button"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
}

export default Dashbot;
