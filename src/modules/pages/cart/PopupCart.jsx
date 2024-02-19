import React, { useEffect, useState } from "react";
import "./styles.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useCart } from "../../../CartProvider";
import { usePopup } from "../../../CartPopupModalContext";
import { useLoading } from "../../../LoadingProvider";
const local = import.meta.env.VITE_LOCAL;
const url = import.meta.env.VITE_URL;

function PopupCart() {
  const { visible, showModal, closeModal } = usePopup();
  const { cartItems } = useCart();
  const { updateCart } = useCart();
  const { showLoading } = useLoading();

  const handlePreference = async (e) => {
    showLoading();
    e.preventDefault();

    const mpItems = [];
    cartItems.map((result) => {
      const edit = {
        id: result.id,
        title: result.name,
        picture_url: result.images[0],
        description: result.description,
        quantity: parseInt(result.quantity),
        unit_price: result.price,
      };

      mpItems.push(edit);
    });

    const response = await fetch(`${url}/order/preference`, {
      method: "POST",
      body: JSON.stringify({
        products: JSON.stringify(mpItems),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (response.ok) {
      localStorage.setItem("preferenceId", responseJson);
      window.location.href = `${local}/buy/cart/${0}`;
    }
  };

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
    opacity: visible ? 1 : 0,
    transform: `translateY(${visible ? 0 : 10}px)`,
  });

  return (
    <>
      {visible ? (
        <>
          <animated.div style={divAnimation} className="cart-popup">
            <div
              className="cart-popup-title"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h1 style={{ fontWeight: 500, fontSize: "18px" }}>
                Resumo Carrinho
              </h1>
              <button className="close-button" onClick={() => closeModal()}>
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
                            const newQuantity = parseInt(e.target.value, 10);

                            if (newQuantity <= result.stock) {
                              const updatedCart = cartItems.map((item) =>
                                item.id === result.id
                                  ? { ...item, quantity: newQuantity }
                                  : item
                              );
                              updateCartLocal(updatedCart);
                            } else {
                              e.target.value = 1;
                              const updatedCart = cartItems.map((item) =>
                                item.id === result.id
                                  ? { ...item, quantity: 1 }
                                  : item
                              );
                              updateCartLocal(updatedCart);

                              toast("Essa quantidade não existe no estoque!", {
                                theme: "dark",
                                type: "error",
                              });
                            }
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
                {cartItems.length < 1 ? (
                  <>
                    {" "}
                    <button
                      style={{
                        backgroundColor: "var(--amarelo)",
                        color: "red",
                        fontWeight: 600,
                        padding: "8px",
                        borderRadius: "10px ",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      FECHAR PEDIDO
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handlePreference}
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
                  </>
                )}
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
                showModal();
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
