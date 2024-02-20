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
import { handleFindProduct } from "../../helpers/find-product";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import PopupCart from "../cart/PopupCart";
import { useCart } from "../../../CartProvider";
import Painel from "../chat/Painel";
import { usePopup } from "../../../CartPopupModalContext";
import Loading from "../../components/loading/Loading";
import { useLoading } from "../../../LoadingProvider";

const url = import.meta.env.VITE_URL;

function NewsProduct({ result }) {
  const [hovered, setHovered] = useState(false);
  const { updateCart } = useCart();
  const { visible, showModal, closeModal } = usePopup();
  const { loading, showLoading, closeLoading } = useLoading();

  const handleAddToCart = async (id) => {
    const product = await handleFindProduct(id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productExists = cart.find((item) => item.id === id);
    const productExistsIndex = cart.findIndex((item) => item.id === id);

    if (productExists) {
      cart[productExistsIndex].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    updateCart(cart);
    showModal();

    toast("Produto adicionado ao carrinho!", {
      type: "success",
      theme: "dark",
      pauseOnHover: false,
    });
  };

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
        <img src={result.images[0]} alt="Items" style={{ maxWidth: "190px" }} />
        {hovered ? (
          <>
            <animated.div style={buttonAnimations} className={"buttons-buy"}>
              <Link to={`/product/${result.id}`}>
                <button className="news-button">Comprar</button>
              </Link>
              <button
                className="cart-button"
                onClick={() => handleAddToCart(result.id)}
              >
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
        <p className="price-number">{result.price.toFixed(2)}</p>
      </div>
    </>
  );
}

function Home() {
  const [botType, setBotType] = useState(true);
  const [newsProduct, setNewsProduct] = useState([{ images: [], price: 0 }]);
  const { loading, showLoading, closeLoading } = useLoading();
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
      <PopupCart />

      <div className="home">
        <div className="left-section">
          <div className="box-news">
            <h2>Teras em Geral</h2>
          </div>
          <h2 className="title">
            Teras em promoções <br /> Aproveitem o desconto!
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
          Disponível <span className="title-pisca">GameKing</span> e{" "}
          <span className="title-pisca">Steam</span>
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
