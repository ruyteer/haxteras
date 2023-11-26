import React, { useEffect, useState } from "react";
import "./styles.css";
import { AllHeader, ProductCartList } from "../../components/";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_URL;

function Cart() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  const handleGetTotalPrice = () => {
    let price = 0;
    items.map((result) => (price += result.price * result.quantity));

    return price;
  };

  const handleGetDiscount = () => {
    if (discount > 0) {
      let price = 0;

      items.map((result) => {
        const total = result.price * result.quantity;
        const percent = discount / 100;
        price += total * percent;
      });
      return price;
    } else {
      let price = 0;
      items.map((result) => (price += result.price * result.quantity));

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

  return (
    <>
      <AllHeader />
      <div className="cart">
        <div className="cart-left">
          <div className="titles">
            <h1>Carrinho de Compras</h1>
            <p>Você selecionou {items.length} itens</p>
          </div>
          <ProductCartList />
        </div>

        {items.length === 0 ? (
          <></>
        ) : (
          <>
            <div className="cart-right">
              <div className="resum">
                <h1>Resumo</h1>
                <div className="line"></div>
                <div className="details">
                  <div className="name">
                    <p>Itens({items.length})</p>
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
                  <Link to={`/buy/cart/${discount}`}>
                    <button>Fechar Pedido</button>
                  </Link>
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
