import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/Navbar";
import Cards from "../../../components/admin/Cards";
import { CardsObject } from "../../../helpers/cards-object";
const url = import.meta.env.VITE_URL;
import "../styles/global.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [orders, setOrders] = useState([{}]);
  const [approvedOrders, setApprovedOrders] = useState([{}]);
  const [visibleOrders, setVisibleOrders] = useState([{ amount: 0 }]);
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

  useEffect(() => {
    const handleGetOrdersList = async () => {
      try {
        const responseOrders = await fetch(`${url}/order`);
        const responseUsers = await fetch(`${url}/user`);

        const orders = await responseOrders.json();
        const users = await responseUsers.json();

        const sortedOrders = orders.sort((a, b) => {
          const dateA = new Date(
            a.date.replace(
              /(\d{2})\/(\d{2})\/(\d{4}):(\d{2}):(\d{2})/,
              "$3-$2-$1T$4:$5"
            )
          );
          const dateB = new Date(
            b.date.replace(
              /(\d{2})\/(\d{2})\/(\d{4}):(\d{2}):(\d{2})/,
              "$3-$2-$1T$4:$5"
            )
          );
          return dateB - dateA;
        });

        const ordersWithUsers = sortedOrders.map((order) => {
          const user = users.find((user) => user.id === order.userId);
          return {
            ...order,
            username: user ? user.name : "Nome não encontrado",
          };
        });

        setVisibleOrders(ordersWithUsers.slice(0, 4));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    handleGetOrdersList();

    const interval = setInterval(() => {
      handleGetOrdersList();
      handleGetOrders();
    }, 10000);

    return () => clearInterval(interval);
  }, [4]);

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

        <div
          className="last-orders"
          style={{
            marginLeft: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1
            style={{ fontSize: "25px", fontWeight: "600", textAlign: "left" }}
          >
            Últimos pedidos recentes
          </h1>
          <table
            className="order-table"
            style={{ marginTop: "10px", width: "600px", fontSize: "10px" }}
          >
            <thead>
              <tr>
                <th>Comprador</th>
                <th>Valor</th>
                <th>Método de Pagamento</th>
                <th>Código</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((result) => (
                <tr>
                  <td>
                    <p style={{ textAlign: "center" }}>{result.username}</p>
                  </td>

                  <td style={{ width: "100px" }}>
                    R$ {result.amount.toFixed(2)}
                  </td>

                  <td>
                    {result.paymentMethod === "card"
                      ? "Cartão de Crédito"
                      : result.paymentMethod === "pix"
                      ? "PIX"
                      : "Mercado Pago"}
                  </td>
                  <td>
                    {result.paymentMethod === "pix" ? (
                      <>{result.paymentIntent}</>
                    ) : result.paymentMethod === "mercadopago" ? (
                      <>{result.paymentIntent}</>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: "center", marginTop: "-60px" }}>
            <Link to={"/admin/dashboard/order"}>
              <button className="show-more">Mostrar Mais</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
