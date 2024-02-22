import { useEffect, useState } from "react";
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
    setMcdValue(mcdValue + 1);
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
function NenBot({ effectClass }) {
  const [nenbotAvaiable, setNenbotAvaiable] = useState(false);
  const [bot, setBot] = useState([{ price: 0, name: "Nenbot 30D" }]);

  const handleGetBots = async () => {
    const response = await handleGetProductOfCategory("Nenbot");
    console.log(response);
    setBot(response);
  };

  useEffect(() => {
    handleGetBots();
    handleGetAvaiable();
  }, []);

  const handleGetAvaiable = async () => {
    const response = await fetch(`${url}/avaiable-bots`);
    const responseJson = await response.json();

    setNenbotAvaiable(responseJson.nenbot);
  };

  return (
    <>
      <section
        className={`bot-section ${effectClass} `}
        data-aos="fade-up-left"
      >
        <div className="bot-card">
          <img src="/digimon2.jpeg" alt="Bot Image" />

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
            {nenbotAvaiable ? (
              <>
                {bot.map((result) => (
                  <Link
                    to={`/nenbot/${result.name
                      .split(" ")[1]
                      .replace("D", "")}/${result.id}`}
                  >
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

export { NenBot };
