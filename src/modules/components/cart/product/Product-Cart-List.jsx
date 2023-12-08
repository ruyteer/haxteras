import React from "react";
import "./styles.css";
import { QuantityInput } from "../../menu-items/MenuItems";

function ProductCartList() {
  const products = JSON.parse(localStorage.getItem("cart")) || [];

  const handleDeleteItem = (id) => {
    const selectedProduct = products.filter((result) => result.id === id);

    const newArray = products.filter((result) => result !== selectedProduct[0]);

    localStorage.setItem("cart", JSON.stringify(newArray));
    window.location.reload();
  };

  return (
    <div className="cart-list">
      {products.length > 0 ? (
        <table>
          {products.map((result) => (
            <>
              <tbody>
                <td>
                  <img
                    src={result.images[0]}
                    alt="Product Image"
                    style={{
                      width: "120px",
                    }}
                  />
                </td>
                <td>
                  <div className="title">
                    <p className="name">{result.name}</p>
                    <p>Unid.: R$ {result.price}</p>
                  </div>
                </td>

                <td>
                  <p className="quantity">
                    Quantidade: <span>{result.quantity}</span>
                  </p>
                </td>
                <td>
                  <p>R${(result.price * result.quantity).toFixed(2)}</p>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(result.id)}
                    className="delete-item"
                  >
                    <img src="/delete 2.svg" alt="Trash Icon" />
                  </button>
                </td>
              </tbody>
            </>
          ))}
        </table>
      ) : (
        <div className="empty-cart">O carrinho está vazio!</div>
      )}
    </div>
  );
}

export { ProductCartList };
