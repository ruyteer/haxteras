import React, { useEffect, useState } from "react";
import DashForm from "../DashForm";
import FormControl from "../FormControl";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import { handleFindCategoryId } from "../../../helpers/get-product-category";
const url = import.meta.env.VITE_URL;

function CreateProduct() {
  const [categories, setCategories] = useState([{}]);

  const handleGetCategories = async () => {
    const response = await fetch(`${url}/category`);
    const categoriesJson = await response.json();
    setCategories(categoriesJson);
  };

  useEffect(() => {
    handleGetCategories();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { target } = e;
    const formData = new FormData(target);

    const categoryId = document.getElementById("category").value;

    try {
      const request = await fetch(`${url}/product/create/${categoryId}`, {
        body: formData,
        method: "POST",
      });

      if (request.ok) {
        toast("Produto criado com sucesso!", {
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
          Criar novo produto
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
            type={"text"}
            required={true}
          />
          <FormControl
            name={"description"}
            label={"Descrição"}
            placeholder={"Digite a descrição do produto aqui"}
            id={"description"}
            type={"text"}
            required={false}
          />
          <FormControl
            name={"file"}
            label={"Imagem"}
            placeholder={"Arraste ou selecione o arquivo aqui"}
            id={"file"}
            type={"file"}
          />
          <FormControl
            name={"stock"}
            label={"Estoque"}
            placeholder={"Digite a quantidade em estoque aqui"}
            id={"stock"}
            type={"number"}
          />
          <FormControl
            name={"price"}
            label={"Preço"}
            placeholder={
              "Digite o preço do produto aqui. Formato: 1.99 ou 269.90"
            }
            id={"price"}
            type={"text"}
          />

          <select
            required
            name="category"
            placeholder="Selecione a categoria aqui"
            id="category"
            style={{
              borderRadius: "10px",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            {categories.map((result) => (
              <option value={result.id}>{result.name}</option>
            ))}
          </select>

          <button
            className="admin-button"
            style={{ width: "100px", marginTop: "25px" }}
            type="submit"
          >
            Create
          </button>
        </DashForm>
      </div>
    </>
  );
}

export default CreateProduct;
