import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_URL;

function NenbotPage() {
  const [nenbot, setNenbot] = useState(false);

  const handleGetNenbots = async () => {
    const response = await fetch(`${url}/avaiable-bots`);
    const responseJson = await response.json();
    if (responseJson.nenbot == true) {
      setNenbot(true);
    } else {
      setNenbot(false);
    }
  };

  const handleChangeNenbots = async (value) => {
    await fetch(`${url}/avaiable-bots/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nenbot: value }),
    });
  };

  useEffect(() => {
    handleGetNenbots();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div className="dashbots">
          <h1>Gerenciar Nenbots</h1>

          <div className="gerentment">
            <p>Status do estoque de Nenbots:</p>

            <form>
              <div className="dash">
                <label htmlFor="">Disponível</label>
                <input
                  type="radio"
                  checked={nenbot === true}
                  onChange={(e) => {
                    e.preventDefault();
                    setNenbot(true);
                    handleChangeNenbots(true);
                  }}
                />
              </div>

              <div className="dash">
                <label htmlFor="">Em falta no estoque</label>
                <input
                  type="radio"
                  checked={nenbot === false}
                  onChange={(e) => {
                    e.preventDefault();
                    setNenbot(false);
                    handleChangeNenbots(false);
                  }}
                />
              </div>
            </form>
            <span style={{ textAlign: "center", marginTop: "20px" }}>
              Clique duas vezes!
            </span>
          </div>
          <Link to={"/admin/dashboard/nenbots/keys"}>
            <button
              className="admin-button"
              style={{ marginTop: "50px", width: "200px" }}
            >
              Gerenciar as Keys
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NenbotPage;
