import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/Navbar";
import Cards from "../../../components/admin/Cards";
import { CardsObject } from "../../../helpers/cards-object";
const url = import.meta.env.VITE_URL;
import "../styles/global.css";

function Dashboard() {
  const [orders, setOrders] = useState([{}]);
  const [approvedOrders, setApprovedOrders] = useState([{}]);
  const [totalSold, setTotalSold] = useState({
    total: 0,
    mpTotal: 0,
    pixTotal: 0,
    stripeTotal: 0,
  });

  const handleMakeSoum = (array) => {
    let value = 0;
    array.map((result) => {
      value += result.amount;
    });
    return value;
  };

  const handleGetOrders = async () => {
    const response = await fetch(`${url}/order`);
    const orderResponse = await response.json();
    setOrders(orderResponse);
    const approved = orderResponse.filter(
      (result) => result.status === "approved" || result.status === "succeeded"
    );
    const mpApproved = approved.filter(
      (result) => result.paymentMethod === "mercadopago"
    );
    const pixApproved = approved.filter(
      (result) => result.paymentMethod === "pix"
    );
    const stripeApproved = approved.filter(
      (result) => result.paymentMethod === "card"
    );
    setApprovedOrders(approved);
    const totalSoldApproved = handleMakeSoum(approved);
    const mpSold = handleMakeSoum(mpApproved);
    const pixSold = handleMakeSoum(pixApproved);
    const stripeSold = handleMakeSoum(stripeApproved);
    setTotalSold({
      total: totalSoldApproved,
      mpTotal: mpSold,
      pixTotal: pixSold,
      stripeTotal: stripeSold,
    });
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="cards">
          <div className="dash-card">
            <h1>Pedidos</h1>
            <h2>Quantidade total de pedidos</h2>
            <p>{orders.length}</p>
          </div>
          <div className="dash-card">
            <h1>Pedidos</h1>
            <h2>Pedidos aprovados</h2>
            <p>{approvedOrders.length}</p>
          </div>
          <div className="dash-card">
            <h1>Pedidos</h1>
            <h2>
              Quantia <span>total</span> vendida
            </h2>
            <p>R$ {totalSold.total.toFixed(2)}</p>
          </div>
          <div className="dash-card">
            <h1>Pedidos</h1>
            <h2>
              Quantia total <span>MP</span> vendida
            </h2>
            <p>R$ {totalSold.mpTotal.toFixed(2)}</p>
          </div>
          <div className="dash-card">
            <h1>Pedidos</h1>
            <h2>
              Quantia total <span>Stripe</span> vendida
            </h2>
            <p>R$ {totalSold.stripeTotal.toFixed(2)}</p>
          </div>
          <div className="dash-card">
            <h1>Pedidos</h1>
            <h2>
              Quantia total <span>PIX</span> vendida
            </h2>
            <p>R$ {totalSold.pixTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
