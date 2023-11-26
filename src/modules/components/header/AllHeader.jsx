import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function AllHeader() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  const handleGetPriceSoum = () => {
    let price = 0;

    items.map((result) => {
      price += result.price * result.quantity;
    });

    return price;
  };
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
            <Link to={"/"}>Discord e Whatsapp</Link>
          </li>
          <li>
            <Link to={"/vendas"}>Vendas</Link>
          </li>
        </ul>
      </nav>

      <Link to={"/cart"}>
        <div className="header-cart">
          <img src="/shopping_cart.svg" alt="Carrinho Svg" />
          <div className="cart-quantity">{items.length}</div>
          <p style={{ textDecoration: "none" }}>
            R$ {handleGetPriceSoum().toFixed(2)}
          </p>
        </div>
      </Link>
    </header>
  );
}

export { AllHeader };
