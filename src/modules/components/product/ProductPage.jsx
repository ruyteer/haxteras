import React, { useEffect, useState } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { handleFindProduct } from "../../helpers/find-product";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../../CartProvider";
import { usePopup } from "../../../CartPopupModalContext";
const local = import.meta.env.VITE_LOCAL;
const url = import.meta.env.VITE_URL;
import { useLoading } from "../../../LoadingProvider";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({ images: [], price: 0 });
  const [mcdValue, setMcdValue] = useState(1);
  const { cartItems, updateCart } = useCart();
  const { showModal } = usePopup();
  const { showLoading, closeLoading } = useLoading();

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
    if (mcdValue + 1 > product.stock) {
      toast(`Há apenas ${product.stock} no estoque!`, {
        theme: "dark",
        pauseOnHover: false,
        type: "error",
      });
      return;
    }

    setMcdValue(mcdValue + 1);
    onQuantityChange(mcdValue + 1, itemId);
  };

  const handleGetProduct = async () => {
    const product = await handleFindProduct(id);
    setProduct(product);
  };

  const handleAddToCart = async (id) => {
    const product = await handleFindProduct(id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productExists = cart.find((item) => item.id === id);

    if (productExists && mcdValue > 1) {
      productExists.quantity += mcdValue;
    } else if (!productExists && mcdValue > 1) {
      product.quantity = mcdValue;
      cart.push(product);
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    updateCart(cart);
    showModal();
    toast("Produto adicionado ao carrinho!", {
      type: "success",
      theme: "dark",
      pauseOnHover: false,
    });
  };

  const handlePreference = async (e) => {
    showLoading();
    e.preventDefault();

    const response = await fetch(`${url}/order/preference`, {
      method: "POST",
      body: JSON.stringify({
        products: JSON.stringify([
          {
            id: product.id,
            title: product.name,
            picture_url: product.images[0],
            description: product.description,
            quantity: parseInt(mcdValue),
            unit_price: product.price,
          },
        ]),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (response.ok) {
      localStorage.setItem("preferenceId", responseJson);
      window.location.href = `${local}/buy/${product.id}/${mcdValue}`;
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <div className="product-page">
      <img
        className="product-image"
        src={product.images[0]}
        alt="Imagem do Produto"
      />

      <div className="details">
        <div className="info">
          <h1>{product.name}</h1>
          <p className="price">
            R$ {(product.price.toFixed(2) * mcdValue).toFixed(2)}{" "}
            <span>a unidade</span>
          </p>
          <p className="installments">
            <img src="/Group.svg" alt="" />
            <p>
              {" "}
              cartão, débito e crédito worked for other countries. <br />
              <span>mercado pago até 12x, crédito ou débito à vista.</span>{" "}
              <br />
              crie uma conta para melhor aprovação do pagamento!
            </p>
          </p>

          <p className="additional-info">
            Entrega imediata e segura, <br /> sem riscos de ban
          </p>

          <div className="buttons">
            <div className="quantity-input">
              <button
                className="decrease-button button"
                onClick={handleDecrease}
              >
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
                  }
                }}
              />
              <button
                className="increase-button button"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>

            <button className="buy-button" onClick={handlePreference}>
              COMPRAR
            </button>

            <button
              className="add-cart-button"
              onClick={() => handleAddToCart(product.id)}
            >
              <img src="/cart.svg" alt="Carrinho de Compras" />
            </button>
          </div>
        </div>
      </div>

      <div className="cards-info">
        <div className="card-shipping">
          <p>Oferecemos um preço justo e acessível.</p>
        </div>
        <div className="card-shipping">
          <p>Oferecemos serviços de qualidade desde o NA.</p>
        </div>
        <div className="card-shipping">
          <p>Entre no discord e veja as referências.</p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
