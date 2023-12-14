import React, { useEffect, useState } from "react";
import "./styles.css";
import { AllHeader, QuantityInput, SiteInfo } from "../../components/";
import { handleGetProductOfCategory } from "../../helpers/get-product-category";
import { handleFindProduct } from "../../helpers/find-product";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../../CartProvider";

function Crown() {
  const [products, setProducts] = useState([{}]);
  const [preview, setPreview] = useState([{ price: 0 }]);
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState({});
  const { cartItems, updateCart } = useCart();

  const handleSearch = (e) => {
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(e.toLowerCase())
    );

    setPreview(result.slice(0, 3));
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    const result = await handleGetProductOfCategory("Itens de Crown");

    setProducts(result);
    setPreview(result.slice(0, 3));
  };

  const handleAddToCart = async () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = await handleFindProduct(quantity.itemId);

    const productExists = cart.find((item) => item.id === quantity.itemId);
    const productExistsIndex = cart.findIndex(
      (item) => item.id === quantity.itemId
    );

    if (quantity.quantity <= product.stock) {
      // se a quantidade tem no estoque
      if (productExists) {
        // se o produto existe
        cart[productExistsIndex].quantity =
          parseInt(productExists.quantity) + parseInt(quantity.quantity);
      } else {
        product.quantity = quantity.quantity;
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

    updateCart(cart);
    toast("Produto adicionado ao carrinho!", {
      type: "success",
      theme: "dark",
      pauseOnHover: false,
    });
  };

  const handleSubmitError = () => {
    toast("Selecione um produto e a quantidade primeiro!", {
      type: "error",
      theme: "dark",
      pauseOnHover: false,
    });
  };

  return (
    <>
      <AllHeader />
      <div className="crown-page">
        <div className="crown-items">
          <img
            className="crown-item-image"
            src="/Crown.png"
            alt="tems Crown Digimon"
          />
          <div className="crown-container">
            <div className="titles">
              <h1>Itens de Crown Omegamon LA</h1>
            </div>
            <form>
              <div className="form-control">
                <input
                  type="text"
                  required
                  placeholder="Pesquise o item"
                  value={search}
                  onChange={(e) => {
                    e.preventDefault();
                    handleSearch(e.target.value);
                    setSearch(e.target.value);
                  }}
                />
                <button onClick={handleSearch}>
                  <img src="/Lupa.svg" alt="Lupa SVG" />
                </button>
              </div>
            </form>

            {preview.length > 0 ? (
              preview.map((result) => (
                <>
                  <div className="items">
                    <p className="item-name">{result.name}</p>
                    <p className="price">R$ {result.price.toFixed(2)}Un.</p>
                    <QuantityInput
                      onQuantityChange={(quantity, itemId) => {
                        setQuantity({ quantity, itemId });
                      }}
                      itemId={result.id}
                    />
                  </div>
                </>
              ))
            ) : (
              <>
                <p className="not-found">Não encontrado!</p>
              </>
            )}

            <div className="select-buttons">
              {quantity.itemId != undefined ? (
                <>
                  <Link to={`/product/${quantity.itemId}`}>
                    <button className="buy-button">COMPRAR</button>
                  </Link>
                  <button className="add-cart" onClick={handleAddToCart}>
                    <img src="/cart.svg" alt="Carrinho de Compras" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSubmitError}
                    className="buy-button-warning"
                  >
                    COMPRAR
                  </button>

                  <button className="add-cart" onClick={handleSubmitError}>
                    <img src="/cart.svg" alt="Carrinho de Compras" />
                  </button>
                </>
              )}
            </div>
          </div>
          <SiteInfo />
        </div>
        <AlphaCrown />
      </div>
    </>
  );
}

function AlphaCrown() {
  const [products, setProducts] = useState([{}]);
  const [preview, setPreview] = useState([{ price: 0 }]);
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState({});
  const { cartItems, updateCart } = useCart();

  const handleSearch = (e) => {
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(e.toLowerCase())
    );

    setPreview(result.slice(0, 3));
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    const result = await handleGetProductOfCategory("Itens de Crown");

    setProducts(result);
    setPreview(result.slice(0, 3));
  };

  const handleAddToCart = async () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = await handleFindProduct(quantity.itemId);

    const productExists = cart.find((item) => item.id === quantity.itemId);
    const productExistsIndex = cart.findIndex(
      (item) => item.id === quantity.itemId
    );

    if (quantity.quantity <= product.stock) {
      // se a quantidade tem no estoque
      if (productExists) {
        // se o produto existe
        cart[productExistsIndex].quantity =
          parseInt(productExists.quantity) + parseInt(quantity.quantity);
      } else {
        product.quantity = quantity.quantity;
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

    updateCart(cart);
    toast("Produto adicionado ao carrinho!", {
      type: "success",
      theme: "dark",
      pauseOnHover: false,
    });
  };

  const handleSubmitError = () => {
    toast("Selecione um produto e a quantidade primeiro!", {
      type: "error",
      theme: "dark",
      pauseOnHover: false,
    });
  };
  return (
    <>
      <div className="crown-items" style={{ marginRight: "230px" }}>
        <img
          className="crown-item-image"
          src="/bot-digimon.png"
          alt="tems Crown Digimon"
        />
        <div className="crown-container">
          <div className="titles">
            <h1>Itens de Crown Alphamon LA</h1>
          </div>
          <form>
            <div className="form-control">
              <input
                type="text"
                required
                placeholder="Pesquise o item"
                value={search}
                onChange={(e) => {
                  e.preventDefault();
                  handleSearch(e.target.value);
                  setSearch(e.target.value);
                }}
              />
              <button onClick={handleSearch}>
                <img src="/Lupa.svg" alt="Lupa SVG" />
              </button>
            </div>
          </form>

          {preview.length > 0 ? (
            preview.map((result) => (
              <>
                <div className="items">
                  <p className="item-name">{result.name}</p>
                  <p className="price">R$ {result.price.toFixed(2)}Un.</p>
                  <QuantityInput
                    onQuantityChange={(quantity, itemId) => {
                      setQuantity({ quantity, itemId });
                    }}
                    itemId={result.id}
                  />
                </div>
              </>
            ))
          ) : (
            <>
              <p className="not-found">Não encontrado!</p>
            </>
          )}

          <div className="select-buttons">
            {quantity.itemId != undefined ? (
              <>
                <Link to={`/product/${quantity.itemId}`}>
                  <button className="buy-button">COMPRAR</button>
                </Link>
                <button className="add-cart" onClick={handleAddToCart}>
                  <img src="/cart.svg" alt="Carrinho de Compras" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSubmitError}
                  className="buy-button-warning"
                >
                  COMPRAR
                </button>

                <button className="add-cart" onClick={handleSubmitError}>
                  <img src="/cart.svg" alt="Carrinho de Compras" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { Crown };
