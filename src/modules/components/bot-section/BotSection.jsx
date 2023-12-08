import React, { useEffect, useState } from "react";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { handleGetProductOfCategory } from "../../helpers/get-product-category";
const url = import.meta.env.VITE_URL;

function QuantityInput() {
  const [mcdValue, setMcdValue] = useState(1);

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

  return (
    <div className="quantity-input">
      <button className="decrease-button button" onClick={handleDecrease}>
        -
      </button>
      <input type="text" value={"MC" + mcdValue} />
      <button className="increase-button button" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
}

function BotSection({ effectClass }) {
  const [dashbotAvaiable, setDashbotAvaiable] = useState(false);
  const [bot, setBot] = useState([{ price: 0, name: "A AD" }]);

  const handleGetBots = async () => {
    const response = await handleGetProductOfCategory("Dashbot");
    setBot(response);
  };

  useEffect(() => {
    handleGetBots();
    handleGetAvaiable();
  }, []);

  const handleGetAvaiable = async () => {
    const response = await fetch(`${url}/avaiable-bots`);
    const responseJson = await response.json();
    setDashbotAvaiable(responseJson.dashbot);
  };

  return (
    <>
      <section className={`bot-section ${effectClass}`} data-aos="fade-up-left">
        <div className="bot-card">
          <img src="/bot-image.png" alt="Bot Image" />

          <div className="bot-info">
            <ul>
              {bot.map((result) => (
                <li>
                  <h2>{result.name}</h2>
                  <p>R$ {result.price.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bot-quantity">
            <p>Quant. de telas</p>

            <QuantityInput />
            <QuantityInput />
            <QuantityInput />
          </div>

          <div className="buy-buttons">
            {dashbotAvaiable ? (
              <>
                {bot.map((result) => (
                  <Link to={`/dashbot/${result.id}`}>
                    <button>Comprar</button>
                  </Link>
                ))}
              </>
            ) : (
              <>
                <button style={{ color: "red" }}>Indisponível</button>

                <button style={{ color: "red" }}>Indisponível</button>

                <button style={{ color: "red" }}>Indisponível</button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export { BotSection };
