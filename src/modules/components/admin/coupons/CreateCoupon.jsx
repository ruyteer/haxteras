import React from "react";
import Navbar from "../Navbar";
import FormControl from "../FormControl";
import DashForm from "../DashForm";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_URL;

function CreateCoupon() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = document.getElementById("code").value;
    const discount = document.getElementById("discount").value;

    const formData = JSON.stringify({ code, discount });

    try {
      const response = await fetch(`${url}/coupon/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        toast("Cupom criado com sucesso!", { theme: "dark", type: "success" });
      }
    } catch (error) {
      toast(`Houve um erro: ${error}`, { theme: "dark", type: "error" });
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
          Criar novo cupom
        </h1>
        <DashForm
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "40px",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <FormControl
            name={"code"}
            label={"Código"}
            placeholder={"Digite o código do cupom aqui"}
            id={"code"}
            type={"text"}
            required={true}
          />
          <FormControl
            name={"discount"}
            label={"Desconto"}
            placeholder={"Digite o desconto em porcentagem aqui"}
            id={"discount"}
            type={"number"}
            required={false}
          />

          <button
            className="admin-button"
            style={{ width: "100px", marginTop: "25px" }}
            type="submit"
          >
            Criar
          </button>
        </DashForm>
      </div>
    </>
  );
}

export default CreateCoupon;
