import React, { useEffect, useState } from "react";
import "./styles.css";
import { AllHeader, ProductCartList } from "../../components/";
import { Link } from "react-router-dom";
import { useCart } from "../../../CartProvider";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function Cart() {
  const { cartItems, updateCart } = useCart();
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  const handleGetTotalPrice = () => {
    let price = 0;
    cartItems.map((result) => (price += result.price * result.quantity));

    return price;
  };

  const handleGetDiscount = () => {
    if (discount > 0) {
      let price = 0;

      cartItems.map((result) => {
        const total = result.price * result.quantity;
        const percent = discount / 100;
        price += total * percent;
      });
      return price;
    } else {
      let price = 0;
      cartItems.map((result) => (price += result.price * result.quantity));

      return price;
    }
  };

  const handleCheckCoupon = async (e) => {
    e.preventDefault();
    const code = document.getElementById("code").value;

    try {
      const response = await fetch(`${url}/coupon`);
      const responseJson = await response.json();

      const check = responseJson.filter((result) => result.code === code);
      if (check.length > 0) {
        setDiscount(check[0].discount);
      } else {
        setError("Cupom expirado ou inválido!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreference = async (e) => {
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
      window.location.href = `${local}/buy/cart/${discount}`;
    }
  };

  return (
    <>
      <AllHeader />
      <div className="cart">
        <div className="cart-left">
          <div className="titles">
            <h1>Carrinho de Compras</h1>
            <p>Você selecionou {cartItems.length} itens</p>
          </div>
          <ProductCartList />
        </div>

        {cartItems.length === 0 ? (
          <></>
        ) : (
          <>
            <div className="cart-right">
              <div className="resum">
                <h1>Resumo</h1>
                <div className="line"></div>
                <div className="details">
                  <div className="name">
                    <p>Itens({cartItems.length})</p>
                    <p>Desconto</p>
                  </div>
                  <div className="price">
                    <p>R$ {handleGetTotalPrice().toFixed(2)}</p>
                    <p> {discount}%</p>
                  </div>
                </div>
                <div className="line"></div>
                <div className="total">
                  <p>Total</p>
                  <p className="total-price">
                    R$ {handleGetDiscount().toFixed(2)}
                  </p>
                </div>
                <div className="finaly">
                  <button onClick={handlePreference}>Fechar Pedido</button>
                </div>
              </div>
              <div className="coupon">
                <form onSubmit={handleCheckCoupon}>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    placeholder="Cupom de desconto"
                    required
                  />
                  <button type="submit">Aplicar</button>
                </form>
              </div>
              <div className="error">{error}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export { Cart };
