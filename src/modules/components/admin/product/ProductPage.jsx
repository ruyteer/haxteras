import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_URL;

function ProductPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([{ images: [""] }]);
  const [preview, setPreview] = useState([
    { price: 0, images: [""], categoryId: "" },
  ]);
  const [categories, setCategories] = useState([{}]);

  const handleSearch = (e) => {
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(e.toLowerCase())
    );

    if (e.toLowerCase() === "") {
      setPreview(products);
    } else {
      setPreview(result);
    }
  };

  const handleGetProducts = async () => {
    const response = await fetch(`${url}/product`);
    const responseJson = await response.json();

    setProducts(responseJson);
    setPreview(responseJson);
  };

  const handleGetCategories = async () => {
    const response = await fetch(`${url}/category`);
    const categoriesJson = await response.json();
    setCategories(categoriesJson);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Categoria desconhecida";
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${url}/product/delete/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      toast(
        "Produto deletado com sucesso! Recarregue a página para atualizar os valores.",
        {
          theme: "dark",
          type: "success",
        }
      );
    }
  };

  useEffect(() => {
    handleGetProducts();
    handleGetCategories();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1
          style={{
            marginTop: "30px",
            fontSize: "23px",
            color: "white",
            textAlign: "center",
          }}
        >
          Gerenciar produtos
        </h1>
        <div className="methods">
          <Link to={"/admin/dashboard/product/create"}>
            <button className="admin-button" style={{ width: "200px" }}>
              Criar novo produto
            </button>
          </Link>

          <input
            type="text"
            required
            placeholder="Pesquise o item"
            value={search}
            onChange={(e) => {
              e.preventDefault();
              handleSearch(e.target.value);
              setSearch(e.target.value);
            }}
            style={{ width: "300px" }}
          />
        </div>
        <table style={{ marginTop: "13px" }}>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Estoque</th>
              <th>Categoria</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {preview.map((result) => (
              <tr>
                <td>
                  <a href={result.images[0]}>
                    <img
                      src={result.images[0]}
                      alt="Imagem"
                      style={{ width: "80px", borderRadius: "10px" }}
                    />
                  </a>
                </td>
                <td>{result.name}</td>
                <td> R$ {result.price} </td>
                <td> {result.description || "-"} </td>
                <td> {result.stock} </td>

                <td>{getCategoryName(result.categoryId)}</td>
                <td>
                  <button
                    className="admin-button"
                    onClick={(e) => handleDelete(result.id)}
                  >
                    Excluir
                  </button>
                </td>
                <td>
                  <Link to={`/admin/dashboard/product/edit/${result.id}`}>
                    {" "}
                    <button className="admin-button">Editar</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductPage;
