import React, { useState, useEffect } from "react";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleGetProductOfCategory } from "../../helpers/get-product-category";
import { handleFindProduct } from "../../helpers/find-product";
import { Link } from "react-router-dom";
import { useCart } from "../../../CartProvider";
import { usePopup } from "../../../CartPopupModalContext";
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
      <input
        type="number"
        value={mcdValue}
        onChange={(e) => {
          if (e.target.value < 1) {
            toast("Você deve selecionar ao menos um!", {
              theme: "dark",
              pauseOnHover: false,
              type: "error",
            });
          } else {
            setMcdValue(e.target.value);
            onQuantityChange(e.target.value, itemId);
          }
        }}
      />
      <button className="increase-button button" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
}

function MenuItems() {
  const [item, setItem] = useState([{}]);
  const { updateCart } = useCart();

  const [quantityMcd, setQuantity] = useState({});
  const { visible, showModal } = usePopup();

  useEffect(() => {
    handleGetItem();
  }, []);

  const handleGetItem = async () => {
    const response = await handleGetProductOfCategory("Itens Servidores Ladmo");
    setItem(response);
  };

  const handleAddToCart = async (id) => {
    const product = await handleFindProduct(id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productExists = cart.find((item) => item.id === id);
    const productExistsIndex = cart.findIndex((item) => item.id === id);

    if (quantityMcd.itemId === id) {
      // se eu tiver selecionado a quantidade
      if (quantityMcd.quantity <= product.stock) {
        // se a quantidade tem no estoque
        if (productExists) {
          // se o produto existe
          cart[productExistsIndex].quantity =
            parseInt(productExists.quantity) + parseInt(quantityMcd.quantity);
        } else {
          product.quantity = quantityMcd.quantity;
          cart.push(product);
        }
      } else {
        toast("Não há essa quantia no estoque!", {
          type: "error",
          theme: "dark",
          pauseOnHover: false,
        });
        return;
      }
    } else {
      // se não tiver selecionado quantidade
      if (productExists) {
        cart[productExistsIndex].quantity += 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
    }

    updateCart(cart);
    showModal(true);
    toast("Produto adicionado ao carrinho!", {
      type: "success",
      theme: "dark",
      pauseOnHover: false,
    });
  };

  return (
    <section className="menu-items-section" data-aos="fade-right">
      <div className="menu-content">
        <div className="menu-section-title" data-aos="fade-up">
          <h1>Itens servidores LADMO</h1>
        </div>
        <table data-aos="flip-left">
          <thead>
            <tr>
              <th>Itens</th>
              <th>Preço Unidade</th>
              <th className="responsive">Quantidade</th>
              <th>Estoque</th>
              <th className="responsive"></th>
              <th className="responsive"></th>
            </tr>
          </thead>
          <tbody>
            {item.map((result) => (
              <tr>
                <td>{result.name}</td>
                <td>R$ {result.price}</td>
                <td className="responsive">
                  <QuantityInput
                    onQuantityChange={(quantity, itemId) => {
                      setQuantity({ quantity, itemId });
                    }}
                    itemId={result.id}
                  />
                </td>
                <td>{result.stock} em estoque</td>
                <td>
                  {result.stock > 0 ? (
                    <Link to={`/product/${result.id}`}>
                      <button className="button-table">Comprar</button>
                    </Link>
                  ) : (
                    <button className="button-table" style={{ color: "red" }}>
                      Indisponível
                    </button>
                  )}
                </td>
                <td>
                  {result.stock > 0 ? (
                    <button
                      type="submit"
                      className="cart-button responsive"
                      onClick={() => handleAddToCart(result.id)}
                    >
                      <img src="/cart.svg" alt="Cart" />
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="cart-button responsive"
                        onClick={() =>
                          toast("Indisponível no estoque!", {
                            theme: "dark",
                            type: "error",
                          })
                        }
                      >
                        <img src="/cart.svg" alt="Cart" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td>Crown</td>
              <td>R$ 0.18</td>
              <td className="responsive">
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
