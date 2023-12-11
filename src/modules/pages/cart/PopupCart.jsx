import React, { useEffect, useState } from "react";
import "./styles.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useCart } from "../../../CartProvider";

function PopupCart() {
  const [modal, setModal] = useState(false);
  const { cartItems } = useCart();
  const { updateCart } = useCart();

  const handleGetPrice = () => {
    return cartItems.reduce((accumulator, currentItem) => {
      if (currentItem && currentItem.price && currentItem.quantity) {
        return accumulator + currentItem.price * currentItem.quantity;
      } else {
        return accumulator;
      }
    }, 0);
  };

  const updateCartLocal = (newCartItems) => {
    updateCart(newCartItems);
  };

  const divAnimation = useSpring({
    opacity: modal ? 1 : 0,
    transform: `translateY(${modal ? 0 : 10}px)`,
  });

  return (
    <>
      {modal ? (
        <>
          <animated.div style={divAnimation} className="cart-popup">
            <div
              className="cart-popup-title"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h1 style={{ fontWeight: 500, fontSize: "18px" }}>
                Resumo Carrinho
              </h1>
              <button className="close-button" onClick={() => setModal(!modal)}>
                X
              </button>
            </div>

            <div className="items-list">
              {cartItems.map((result) => (
                <>
                  <div className="item-section">
                    <div className="item-title">
                      <p>{result.name}</p>
                      <button
                        onClick={(e) => {
                          const updatedCart = cartItems.filter(
                            (item) => item.id !== result.id
                          );
                          updateCartLocal(updatedCart);
                          toast("Deletado com sucesso!", {
                            theme: "dark",
                            type: "success",
                          });
                        }}
                      >
                        <img src="/delete 2.svg" alt="Lixeira" />
                      </button>
                    </div>
                    <div className="item-total-price">
                      <p className="item-price-paragraf">
                        R${(result.price * result.quantity).toFixed(2)}
                      </p>
                      <form>
                        <p className="item-quantity-title">Quant.</p>
                        <input
                          type="number"
                          defaultValue={result.quantity}
                          onChange={(e) => {
                            const updatedCart = cartItems.map((item) =>
                              item.id === result.id
                                ? {
                                    ...item,
                                    quantity: parseInt(e.target.value, 10),
                                  }
                                : item
                            );
                            updateCartLocal(updatedCart);
                          }}
                        />
                      </form>
                    </div>
                    <div className="line"></div>
                  </div>
                </>
              ))}
              <div className="subtotal">
                <p>
                  Subtotal:{" "}
                  <span style={{ color: "red", fontWeight: 500 }}>
                    R$ {handleGetPrice().toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="cart-popup-buttons">
                <Link to={"/cart"}>
                  <button
                    style={{
                      backgroundColor: "#333",
                      color: "white",
                      fontWeight: 600,
                      padding: "8px",
                      borderRadius: "10px ",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    IR PARA O CARRINHO
                  </button>
                </Link>
                <Link to={"/buy/cart"}>
                  <button
                    style={{
                      backgroundColor: "var(--amarelo)",
                      color: "white",
                      fontWeight: 600,
                      padding: "8px",
                      borderRadius: "10px ",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    FECHAR PEDIDO
                  </button>
                </Link>
              </div>
            </div>
          </animated.div>
        </>
      ) : (
        <>
          <button
            className="cart-stick-button"
            onClick={() => {
              if (cartItems.length < 1) {
                toast("Adicione um item ao carrinho primeiro!", {
                  theme: "dark",
                  type: "warning",
                });
              } else {
                setModal(!modal);
              }
            }}
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
