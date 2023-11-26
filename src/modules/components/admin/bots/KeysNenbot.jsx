import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_URL;
function KeysNenbot() {
  const [keys, setKeys] = useState([{}]);

  const handleGetKeys = async () => {
    const response = await fetch(`${url}/nenbot`);
    const responseJson = await response.json();
    setKeys(responseJson);
  };

  const handleDeleteKey = async (key) => {
    const response = await fetch(`${url}/nenbot/${key}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast("Key deletada com sucesso!", {
        theme: "dark",
        type: "success",
      });
    }
  };

  useEffect(() => {
    handleGetKeys();
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center", color: "white", marginTop: "40px" }}>
          Gerenciar Keys Nenbot
        </h1>

        <Link to={"/admin/dashboard/nenbots/keys/create"}>
          <button
            className="admin-button"
            style={{ width: "200px", marginTop: "50px", marginBottom: "10px" }}
          >
            Criar Key
          </button>
        </Link>
        <table style={{ marginTop: "13px" }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Chave</th>
              <th>Dias</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {keys.map((result) => (
              <tr>
                <td>{result.name}</td>
                <td>{result.key}</td>
                <td>{result.days}D</td>
                <td>
                  <button
                    className="admin-button"
                    onClick={(e) => {
                      handleDeleteKey(result.id);
                    }}
                  >
                    Excluir
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default KeysNenbot;
