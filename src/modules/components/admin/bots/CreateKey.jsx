import React from "react";
import Navbar from "../Navbar";
import DashForm from "../DashForm";
import FormControl from "../FormControl";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_URL;

function CreateKey() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { target } = e;
    const formData = new FormData(target);

    const name = document.getElementById("name").value;
    const key = document.getElementById("key").value;
    const days = document.getElementById("days").value;

    try {
      const response = await fetch(`${url}/nenbot/create`, {
        body: JSON.stringify({ name, key, days }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        toast(`Key criada com sucesso!`, {
          theme: "dark",
          type: "success",
        });
      } else {
        const errorJson = await response.json();
        toast(`Houve um erro ao tentar criar a key: ${errorJson}`, {
          theme: "dark",
          type: "error",
        });
      }
    } catch (error) {
      toast(`Houve um erro ao tentar criar a key: ${error}`, {
        theme: "dark",
        type: "error",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ marginTop: "70px", color: "white" }}>Criar Keys Nenbot</h1>
        <DashForm
          onSubmit={handleSubmit}
          style={{
            width: "600px",
            marginTop: "60px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FormControl
            label={"Nome"}
            placeholder={"Digite o nome da key aqui"}
            name={"name"}
            required={true}
            type={"text"}
            id={"name"}
          />
          <FormControl
            label={"Chave"}
            placeholder={"Digite a key aqui"}
            name={"key"}
            required={true}
            type={"text"}
            id={"key"}
          />
          <FormControl
            label={"Dias"}
            placeholder={"Digite os dias aqui | Ex: 30 25 15 7"}
            name={"days"}
            required={true}
            type={"text"}
            id={"days"}
          />

          <button
            style={{ marginTop: "50px", width: "200px" }}
            className="admin-button"
            type="submit"
          >
            Criar Key
          </button>
        </DashForm>
      </div>
    </>
  );
}

export default CreateKey;
