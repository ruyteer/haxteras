import React, { useState } from "react";
import "./styles.css";

function PopupCart() {
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal ? (
        <>
          <div className="cart-popup">
            <p>Carrinho de Compras</p>
          </div>
        </>
      ) : (
        <>
          <button
            className="cart-stick-button"
            onClick={() => setModal(!modal)}
          >
            <img
              src="/cart.svg"
              style={{ marginRight: "5px" }}
              alt="Carrinho"
            />
          </button>
        </>
      )}
    </>
  );
}

export default PopupCart;
