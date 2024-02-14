import "./styles.css";
import { AllHeader } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function Dashbot() {
  const { day } = useParams();
  const [mcdValue, setMcdValue] = useState(1);
  const [username, setUsername] = useState("");
  const [price, setPrice] = useState(0);
  const [dashbot, setDashbot] = useState({ name: "A AD" });

  const handleGetPrice = async () => {
    const response = await fetch(`${url}/product/${day}`);
    const responseJson = await response.json();
    console.log(responseJson);
    setPrice(responseJson.price);
    setDashbot(responseJson);
  };
  //a
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      day: dashbot.name.split(" ")[1].replace("D", ""),
      screen: mcdValue,
      username,
      price,
    };

    sessionStorage.setItem("dashbotData", JSON.stringify(data));

    const response = await fetch(`${url}/order/preference`, {
      method: "POST",
      body: JSON.stringify({
        products: JSON.stringify([
          {
            id: "Dashbot",
            title: `${"Dashbot"} ${data.day}D`,
            picture_url:
              "https://storage.googleapis.com/haxteras.appspot.com/2a8ecc3215e0a270301afdc3de5e587f2e14bc03r1-1200-1773v2_hq.jpg?GoogleAccessId=firebase-adminsdk-fb1sc%40haxteras.iam.gserviceaccount.com&Expires=16730323200&Signature=FMRzz2llF6Nfj8zo1je%2BbmIpVrwZuqfUP%2F1MW%2FaY2%2B3KaNXaqSlSougfnFUBHaTOalrWrno5APnZgY%2BSOHjqDdhsZIlbUl7Kpj4Knyql6kfWnoeSauAz53I29hO9ZQM%2B8Oj4XJLdXhi9HYsdf0DxocIMjyZoZFR3sJ4gq64X6R72ESuTVUroUgB1WDxGlljvF%2Fz4kZDPCoCKMe1nC5KH9EH1nwtkAH7INgOzmW%2FRRuoYmrtRGm6zi%2BMb4YC4PD36xiaN%2BadUzNcG%2B%2BFcTlxIo7UDgcen2Rz2qj8LhUeAp%2F75LPEadRG19yyxa6Vfe04FJTtP%2F%2BvjF04%2B6Yy48f8Uqw%3D%3D",
            description: `${"Dashbot"} ${data.day}D`,
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
      window.location.href = `${local}/buy/bot/dashbot`;
    }
  };

  return (
    <>
      <AllHeader />

      <div className="dashbot">
        <div className="image">
          <img src="/bot-digimon.png" alt="Digimon" />
        </div>

        <div className="dashbot-card">
          <h1>{dashbot.name}</h1>

          <p className="offer">
            por{" "}
            <span className="price">R$ {(price * mcdValue).toFixed(2)}</span>{" "}
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
