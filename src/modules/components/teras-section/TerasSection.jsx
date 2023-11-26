import React, { useEffect, useState } from "react";
import "./styles.css";
import { ShopInfos } from "../shop-infos/ShopInfos";
import { handleGetProductOfCategory } from "../../helpers/get-product-category";
import { Link } from "react-router-dom";

function TerasSection() {
  const [naProducts, setNaProducts] = useState([{ images: [] }]);
  const [laProducts, setLaProducts] = useState([{ images: [] }]);

  useEffect(() => {
    handleGetProduct();
  }, []);

  const handleGetProduct = async () => {
    const productsJson = await handleGetProductOfCategory(
      "Teras servidores LADMO"
    );
    setLaProducts(productsJson);
    const productsJson2 = await handleGetProductOfCategory(
      "Teras servidores NADMO"
    );
    setNaProducts(productsJson2);
  };

  return (
    <section id="teras" className="teras-section">
      <ShopInfos />

      <div className="titles">
        <h1>Teras servidores NADMO</h1>
      </div>

      <div className="card-section">
        {naProducts.map((result) => (
          <>
            <div className="teras-card">
              <div className="image">
                <img src={result.images[0]} alt="Omegamon" />
              </div>
              <div className="card-title">
                <h1>{result.description}</h1>
              </div>
              <div className="card-content">
                <p className="description">{result.name}</p>
                <p className="price">R$ {result.price}</p>
                <p className="unity-price">Preço da unidade</p>
                <Link to={`/product/${result.id}`}>
                  <button>COMPRAR</button>
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="titles">
        <h1>Teras servidores LADMO</h1>
      </div>

      <div className="card-section">
        {laProducts.map((result) => (
          <>
            <div className="teras-card">
              <div className="image">
                <img src={result.images[0]} alt="Omegamon" />
              </div>
              <div className="card-title">
                <h1>{result.description}</h1>
              </div>
              <div className="card-content">
                <p className="description">{result.name}</p>
                <p className="price">R$ {result.price}</p>
                <p className="unity-price">Preço da unidade</p>
                <Link to={`/product/${result.id}`}>
                  <button>COMPRAR</button>
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}

export { TerasSection };
