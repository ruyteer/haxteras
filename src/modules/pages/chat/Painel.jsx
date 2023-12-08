import React from "react";

function Painel() {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1,
        bottom: "0px",
        right: "30px",
        backgroundColor: "var(--amarelo)",
        color: "white",
        fontWeight: "600",
        height: "20px",
        padding: "15px",
        textAlign: "left",
        width: "300px",
        borderRadius: "18px 18px 0 0",
        cursor: "pointer",
        border: "1px solid var(--preto)",
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
      }}
    >
      <p>Online</p>
    </div>
  );
}

export default Painel;
