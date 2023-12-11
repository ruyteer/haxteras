import React from "react";
import "./styles.css";
import { QuantityInput } from "../../menu-items/MenuItems";
import { useCart } from "../../../../CartProvider";

function ProductCartList() {
  const { cartItems, updateCart } = useCart();

  const handleDeleteItem = (id) => {
    const selectedProduct = cartItems.filter((result) => result.id === id);

    const newArray = cartItems.filter(
      (result) => result !== selectedProduct[0]
    );

    updateCart(newArray);
  };

  return (
    <div className="cart-list">
      {cartItems.length > 0 ? (
        <table>
          {cartItems.map((result) => (
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
                    Quantidade:{" "}
                    <input
                      type="number"
                      className="cart-quantity"
                      defaultValue={result.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);

                        if (newQuantity <= result.stock) {
                          const updatedCart = cartItems.map((item) =>
                            item.id === result.id
                              ? { ...item, quantity: newQuantity }
                              : item
                          );
                          updateCart(updatedCart);
                        } else {
                          if (result.stock < e.target.value) {
                            e.target.value = result.stock;
                            const updatedCart = cartItems.map((item) =>
                              item.id === result.id
                                ? { ...item, quantity: result.stock }
                                : item
                            );
                            updateCart(updatedCart);
                          } else if (e.target.value < 1) {
                            e.target.value = 1;
                            const updatedCart = cartItems.map((item) =>
                              item.id === result.id
                                ? { ...item, quantity: 1 }
                                : item
                            );
                            updateCart(updatedCart);
                          }
                        }
                      }}
                    />
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
