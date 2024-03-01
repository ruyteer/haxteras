import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <h1 style={{ color: "white" }}>Dashboard</h1>

      <ul>
        <li>
          <Link to={"/admin/dashboard/home"}>Home</Link>
        </li>
        <li>
          <Link to={"/admin/dashboard/product"}>Produtos</Link>
        </li>
        <li>
          <Link to={"/admin/dashboard/order"}>Pedidos</Link>
        </li>
        <li>
          <Link to={"/admin/dashboard/dashbots"}>Dashbots</Link>
        </li>
        <li>
          <Link to={"/admin/dashboard/nenbots"}>Nenbots</Link>
        </li>
        <li>
          <Link to={"/admin/dashboard/coupons"}>Cupons</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
