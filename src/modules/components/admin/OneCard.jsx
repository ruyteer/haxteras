import React from "react";
import { Link } from "react-router-dom";

function OneCard({
  image,
  title,
  paragraf,
  buttonText,
  buttonLink,
  methodRefresh,
}) {
  return (
    <div
      className="card"
      style={{
        backgroundColor: "whitesmoke",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        width: "260px",
        height: "360px",
      }}
    >
      <img
        style={{ width: "250px", height: "180px", borderRadius: "10px" }}
        src={image}
        alt="Imagem"
      />
      <h2 style={{ fontWeight: "600" }}>{title}</h2>

      <p style={{ marginTop: "10px", fontSize: "15px" }}>{paragraf}</p>
      <button className="admin-button-2" style={{ marginTop: "15px" }}>
        <a
          style={{ color: "white", textDecoration: "none", padding: "30px" }}
          href={buttonLink}
        >
          {buttonText}
        </a>
      </button>
    </div>
  );
}

export default OneCard;
