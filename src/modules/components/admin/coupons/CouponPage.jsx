import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_URL;

function CouponPage() {
  const [coupons, setCoupons] = useState([{}]);

  const handleGetCoupons = async () => {
    const response = await fetch(`${url}/coupon`);
    const responseJson = await response.json();
    setCoupons(responseJson);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${url}/coupon/delete/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast(
        "Cupom deletado com sucesso! Recarregue a página para atualizar os valores.",
        {
          theme: "dark",
          type: "success",
        }
      );
    }
  };

  useEffect(() => {
    handleGetCoupons();
  }, []);

  return (
    <>
      <Navbar />

      <div className="coupons">
        <h1 style={{ marginTop: "60px", color: "white", textAlign: "center" }}>
          Gerenciar Cupons
        </h1>

        <Link to={"/admin/dashboard/coupons/create"}>
          {" "}
          <button
            className="admin-button"
            style={{
              width: "200px",
              marginLeft: "70px",
              marginTop: "70px",
              marginBottom: "40px",
            }}
          >
            Criar Cupom
          </button>
        </Link>
        <table style={{ marginTop: "13px" }}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Desconto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((result) => (
              <tr>
                <td>{result.code}</td>
                <td>{result.discount}%</td>
                <td>
                  <button
                    className="admin-button"
                    onClick={(e) => {
                      handleDelete(result.id);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CouponPage;
