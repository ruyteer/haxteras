import React, { useEffect, useState } from "react";
import DashForm from "../DashForm";
import FormControl from "../FormControl";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import { handleFindCategoryId } from "../../../helpers/get-product-category";
import { useParams } from "react-router-dom";
const url = import.meta.env.VITE_URL;

function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const handleGetProducts = async () => {
    const repsonse = await fetch(`${url}/product/${id}`);
    const responseJson = await repsonse.json();
    setProduct(responseJson);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const stock = document.getElementById("stock").value;
    const price = document.getElementById("price").value;

    try {
      const request = await fetch(`${url}/product/update/${id}`, {
        body: JSON.stringify({ name, description, stock, price }),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (request.ok) {
        toast("Produto atualizado com sucesso!", {
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
          Editar Produto
        </h1>
        <DashForm
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center", marginTop: "40px" }}
        >
          <FormControl
            name={"name"}
            label={"Nome"}
            placeholder={"Digite o nome do produto aqui"}
            id={"name"}
            value={product.name}
            type={"text"}
            required={true}
          />
          <FormControl
            name={"description"}
            label={"Descrição"}
            placeholder={"Digite a descrição do produto aqui"}
            id={"description"}
            type={"text"}
            value={product.description}
            required={false}
          />
          <FormControl
            name={"stock"}
            label={"Estoque"}
            placeholder={"Digite a quantidade em estoque aqui"}
            id={"stock"}
            type={"number"}
            value={product.stock}
          />
          <FormControl
            name={"price"}
            label={"Preço"}
            placeholder={
              "Digite o preço do produto aqui. Formato: 1.99 ou 269.90"
            }
            id={"price"}
            value={product.price}
            type={"text"}
          />

          <button
            className="admin-button"
            style={{ width: "100px", marginTop: "25px" }}
            type="submit"
          >
            Update
          </button>
        </DashForm>
      </div>
    </>
  );
}

export default UpdateProduct;
