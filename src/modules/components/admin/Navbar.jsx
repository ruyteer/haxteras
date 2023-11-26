import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "white" }}>Dashboard</h1>

      <ul>
        <li>
          <a href={"/admin/dashboard/home"}>Home</a>
        </li>
        <li>
          <a href={"/admin/dashboard/product"}>Produtos</a>
        </li>
        <li>
          <a href={"/admin/dashboard/order"}>Pedidos</a>
        </li>
        <li>
          <a href={"/admin/dashboard/dashbots"}>Dashbots</a>
        </li>
        <li>
          <a href={"/admin/dashboard/nenbots"}>Nenbots</a>
        </li>
        <li>
          <a href={"/admin/dashboard/coupons"}>Cupons</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
