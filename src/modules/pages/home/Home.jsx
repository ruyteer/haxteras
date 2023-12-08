import "./styles.css";
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import ScrollReveal from "scrollreveal";
import {
  Header,
  BotSection,
  NenBot,
  TerasSection,
  MenuItems,
} from "../../components";

import ScrollAnimation from "./Test";

const url = import.meta.env.VITE_URL;

function NewsProduct({ result }) {
  const [hovered, setHovered] = useState(false);

  const buttonAnimations = useSpring({
    opacity: hovered ? 1 : 0,
    transform: `translanteY(${hovered ? 0 : 10}px)`,
  });

  return (
    <>
      <div
        className="news-product"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={result.images[0]} alt="Items" />
        {hovered ? (
          <>
            <animated.div style={buttonAnimations} className={"buttons-buy"}>
              <button className="news-button">Comprar</button>
              <button className="cart-button">
                <img src="/cart.svg" alt="Carrinho" />
              </button>
            </animated.div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="item-price">
        <p className="sigle">R$</p>
        <p className="price-number">{result.price}</p>
      </div>
    </>
  );
}

function Home() {
  const [botType, setBotType] = useState(true);
  const [newsProduct, setNewsProduct] = useState([{ images: [] }]);
  const handleChangeBot = () => {
    setBotType(!botType);
  };

  useEffect(() => {
    handleGetNewsProduct();
  }, []);

  const handleGetNewsProduct = async () => {
    const categoryResponse = await fetch(`${url}/category`);
    const categories = await categoryResponse.json();
    const category = categories.filter(
      (result) => result.name === "NewsProduct"
    );

    const categoryId = category.map((result) => result.id);

    try {
      const response = await fetch(`${url}/category/products/${categoryId[0]}`);

      const responseJson = await response.json();
      setNewsProduct(responseJson);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScrollAnimation />
      <Header />

      <div className="home">
        <div className="left-section">
          <div className="box-news">
            <h2>Novos Itens</h2>
          </div>
          <h2 className="title">
            Itens disponíveis até <br /> 12 de junho
          </h2>

          <div className="items">
            {newsProduct.map((result) => (
              <>
                <NewsProduct result={result} />
              </>
            ))}
          </div>
        </div>
        <div className="right-section">
          <div className="box-card">
            <img src="/cc.png" alt="Cartão de Crédito" />
            <p>Aceitamos Cartões</p>
          </div>
        </div>
      </div>

      <div className="bot-title">
        <h1>
          Disponível <span>GameKing</span> e <span>Steam</span>
        </h1>

        <p>
          Clique nas <span>setas laterais</span> para <br /> alterar entre
          <span> Nenbot</span> e <span>Dashbot</span>
        </p>
      </div>

      <div className="choose-bot">
        <button onClick={handleChangeBot} className="prev-button">
          <img
            src="./arrow-left.svg"
            alt="Seta Esquerda"
            style={{
              width: "50px",
            }}
          />
        </button>

        {botType ? <BotSection /> : <NenBot />}

        <button onClick={handleChangeBot} className="next-button">
          <img
            src="./arrow-rigth.svg"
            alt="Seta Direita"
            style={{
              width: "50px",
            }}
          />
        </button>
      </div>

      <TerasSection />
    </>
  );
}

export { Home };
