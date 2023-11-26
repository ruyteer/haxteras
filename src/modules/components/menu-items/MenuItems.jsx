import React, { useState, useEffect } from "react";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleGetProductOfCategory } from "../../helpers/get-product-category";
import { handleFindProduct } from "../../helpers/find-product";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_URL;

export function QuantityInput({ onQuantityChange, itemId }) {
  const [mcdValue, setMcdValue] = useState(1);

  const handleDecrease = () => {
    if (mcdValue > 1) {
      setMcdValue(mcdValue - 1);
      onQuantityChange(mcdValue - 1, itemId);
    } else {
      toast("Você deve selecionar ao menos um!", {
        theme: "dark",
        pauseOnHover: false,
        type: "error",
      });
    }
  };

  const handleIncrease = () => {
    setMcdValue(mcdValue + 1);
    onQuantityChange(mcdValue + 1, itemId);
  };

  return (
    <div className="quantity-input">
      <button className="decrease-button button" onClick={handleDecrease}>
        -
      </button>
      <input type="text" value={mcdValue} />
      <button className="increase-button button" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
}

function MenuItems() {
  const [item, setItem] = useState([{}]);

  const [quantityMcd, setQuantity] = useState([{}]);

  useEffect(() => {
    handleGetItem();
  }, []);

  const handleGetItem = async () => {
    const response = await handleGetProductOfCategory("Itens Servidores Ladmo");
    setItem(response);
  };

  const handleAddToCart = async (id) => {
    const quantity = quantityMcd.filter((result) => result.itemId === id);

    const product = await handleFindProduct(id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productExists = cart.find((item) => item.id === id);

    if (quantity[0].quantity > product.stock) {
      toast("Não há essa quantia no estoque!", {
        type: "error",
        theme: "dark",
        pauseOnHover: false,
      });
      return;
    }

    if (quantity[0]) {
      if (productExists && quantity[0].quantity) {
        productExists.quantity += quantity[0].quantity;
      } else if (!productExists && quantity[0].quantity) {
        product.quantity = quantity[0].quantity;
        cart.push(product);
      }
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast("Produto adicionado ao carrinho!", {
      type: "success",
      theme: "dark",
      pauseOnHover: false,
    });
  };

  return (
    <section className="menu-items-section">
      <div className="menu-content">
        <div className="menu-section-title">
          <h1>Itens servidores LADMO</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Itens</th>
              <th>Preço Unidade</th>
              <th>Quantidade</th>
              <th>Estoque</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {item.map((result) => (
              <tr>
                <td>{result.name}</td>
                <td>R$ {result.price}</td>
                <td>
                  <QuantityInput
                    onQuantityChange={(quantity, itemId) => {
                      setQuantity([{ quantity, itemId }]);
                    }}
                    itemId={result.id}
                  />
                </td>
                <td>{result.stock} em estoque</td>
                <td>
                  <Link to={`/product/${result.id}`}>
                    <button className="button-table">Comprar</button>
                  </Link>
                </td>
                <td>
                  <button
                    type="submit"
                    className="cart-button"
                    onClick={() => handleAddToCart(result.id)}
                  >
                    <img src="/cart.svg" alt="Cart" />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>Crown</td>
              <td>R$ 0.28</td>
              <td>
                <QuantityInput />
              </td>
              <td>estoque livre</td>
              <td>
                <Link to={`/product/crown`}>
                  <button style={{ width: "200px" }} className="button-table">
                    Escolher itens
                  </button>
                </Link>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <p>Itens de crown são entregues entre 22h:00 e 00h:00</p>
      </div>
    </section>
  );
}

export { MenuItems };
