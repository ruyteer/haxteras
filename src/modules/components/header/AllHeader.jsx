import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useSpring, animated } from "react-spring";
import { useCart } from "../../../CartProvider";

function AllHeader() {
  const { cartItems } = useCart();
  const [visible, setVisible] = useState(false);

  const handleGetPriceSoum = () => {
    let price = 0;

    cartItems.map((result) => {
      price += result.price * result.quantity;
    });

    return price;
  };

  const transitionDiv = useSpring({
    opacity: visible ? 1 : 0,
    transform: `translateY(${visible ? 0 : 10}px)`,
  });
  return (
    <header className="all-header">
      <Link to={"/"}>
        <img
          src="/logo-1.png"
          alt="Logo HaxTeras"
          style={{
            width: "104px",
            height: "32px",
            marginTop: "10px",
          }}
        />
      </Link>

      <nav>
        <ul>
          <li>
            <Link to={"/"} style={{ color: "#FBA901" }}>
              Menu Inicial
            </Link>
          </li>
          <li>
            <Link to={"/"}>Bots</Link>
          </li>
          <li>
            <Link to={"/"}>Teras</Link>
          </li>
          <li>
            <Link to={"/"}>Itens e Crown</Link>
          </li>
          <li>
            <Link
              to={"/"}
              onPointerOver={() => {
                setVisible(true);
              }}
            >
              Discord e Whatsapp
            </Link>
            {visible ? (
              <>
                <animated.div
                  style={transitionDiv}
                  className="discord-container"
                  id="discord-container"
                  onPointerLeave={() => {
                    setVisible(false);
                  }}
                >
                  <div className="links-a">
                    <img
                      loading="lazy"
                      width="18"
                      height="18"
                      src="https://haxtera.com/wp-content/uploads/2023/06/10481-1.png"
                      class="attachment-large size-large wp-image-11139"
                      alt=""
                    />{" "}
                    <a href="https://chat.whatsapp.com/KuGQsHQdmeCEc9Vet2RcNA">
                      Whatsapp
                    </a>
                  </div>
                  <div className="links-a">
                    <img
                      loading="lazy"
                      width="18"
                      height="18"
                      src="https://haxtera.com/wp-content/uploads/2023/06/10480-1.png"
                      class="attachment-large size-large wp-image-11140"
                      alt=""
                    />{" "}
                    <a href="https://discord.com/invite/6d7MWsgkMQ">Discord</a>
                  </div>
                </animated.div>
              </>
            ) : (
              <></>
            )}
          </li>
          <li>
            <Link to={"/vendas"}>Vendas</Link>
          </li>
        </ul>
      </nav>

      <Link to={"/cart"}>
        <div className="header-cart">
          <img src="/shopping_cart.svg" alt="Carrinho Svg" />
          <div className="cart-quantity">{cartItems.length}</div>
          <p style={{ textDecoration: "none" }}>
            R$ {handleGetPriceSoum().toFixed(2)}
          </p>
        </div>
      </Link>
    </header>
  );
}

export { AllHeader };
