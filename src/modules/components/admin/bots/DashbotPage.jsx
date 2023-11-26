import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
const url = import.meta.env.VITE_URL;

function DashbotPage() {
  const [dashbot, setDashbot] = useState(false);

  const handleGetDashbots = async () => {
    const response = await fetch(`${url}/avaiable-bots`);
    const responseJson = await response.json();
    if (responseJson.dashbot == true) {
      setDashbot(true);
    } else {
      setDashbot(false);
    }
  };

  const handleChangeDashbots = async (value) => {
    await fetch(`${url}/avaiable-bots/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dashbot: value }),
    });
  };

  useEffect(() => {
    handleGetDashbots();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashbots">
        <h1>Gerenciar Dashbots</h1>

        <div className="gerentment">
          <p>Status do estoque de Dashbots:</p>

          <form>
            <div className="dash">
              <label htmlFor="">Disponível</label>
              <input
                type="radio"
                checked={dashbot === true}
                onChange={(e) => {
                  e.preventDefault();
                  setDashbot(true);
                  handleChangeDashbots(true);
                }}
              />
            </div>

            <div className="dash">
              <label htmlFor="">Em falta no estoque</label>
              <input
                type="radio"
                checked={dashbot === false}
                onChange={(e) => {
                  e.preventDefault();
                  setDashbot(false);
                  handleChangeDashbots(false);
                }}
              />
            </div>
          </form>
          <span style={{ textAlign: "center", marginTop: "20px" }}>
            Clique duas vezes!
          </span>
        </div>
      </div>
    </>
  );
}

export default DashbotPage;
