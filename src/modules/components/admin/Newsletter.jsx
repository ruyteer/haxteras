import React, { useEffect, useState } from "react";
import DashForm from "./DashForm";
import FormControl from "./FormControl";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const url = import.meta.env.VITE_URL;

function Newsletter() {
  const [newsletterText, setNewsletterText] = useState("");

  const handleGetNewsletter = async () => {
    const response = await fetch(`${url}/newsletter`);
    const responseJson = await response.json();
    setNewsletterText(responseJson.text);
  };

  useEffect(() => {
    handleGetNewsletter();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = document.getElementById("text").value;

    try {
      const request = await fetch(`${url}/newsletter/update`, {
        body: JSON.stringify({ text }),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (request.ok) {
        toast("Alterado com sucesso!", {
          theme: "dark",
        });
      }
    } catch (error) {
      toast(`Houve um erro: ${error}`, {
        theme: "dark",
        type: "error",
        pauseOnHover: false,
      });
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ marginBottom: "50px" }}>
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "21px",
            marginTop: "40px",
          }}
        >
          Alterar Newsletter Cabeçalho
        </h1>
        <DashForm
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center", marginTop: "40px" }}
        >
          <FormControl
            name={"text"}
            label={"Mensagem"}
            placeholder={"Digite a mensagem do aviso aqui"}
            id={"text"}
            type={"text"}
            value={newsletterText}
            required={true}
          />

          <button
            className="admin-button"
            style={{ width: "100px", marginTop: "25px" }}
            type="submit"
          >
            Alterar
          </button>
        </DashForm>
      </div>
    </>
  );
}

export default Newsletter;
