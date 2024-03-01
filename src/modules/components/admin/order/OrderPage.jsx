import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_URL;
import "./styles.css";
import { Link } from "react-router-dom";

function OrderPage() {
  const [orders, setOrders] = useState([{}]);
  const [allOrders, setAllOrders] = useState([]); // Armazena todos os pedidos do backend
  const [visibleOrders, setVisibleOrders] = useState([]); // Pedidos a serem exibidos na página
  const [pageSize, setPageSize] = useState(10); // Número de pedidos a serem exibidos por vez
  const [search, setSearch] = useState("");

  const handleToast = async (products) => {
    let productArray = [];
    console.log(products);
    for (const product of products) {
      // Check if the product contains an ID (assuming an ID has a specific format)
      const isID = /^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(product);
      console.log(isID);

      if (isID) {
        // If it's an ID, make a fetch request to get the product details
        const response = await fetch(`${url}/product/${product}`);
        const productData = await response.json();

        if (productData) {
          const formattedProduct = `Nome: ${productData.name}\n    Preço: ${productData.price}`;
          productArray.push(formattedProduct);
        }
      } else {
        // If it's not an ID, it's in a different format (e.g., "Dashbot 30D")
        productArray.push(product + "D");
      }
    }

    // Show the data in the toast
    toast(productArray.join("\n"), { theme: "dark", type: "success" });
  };

  const handleApprovePayment = async ({ id, products, quantity }) => {
    try {
      const response = await fetch(`${url}/order/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast("Pedido aprovado com sucesso!", {
          theme: "dark",
          type: "success",
        });
        setVisibleOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order.id === id) {
              return { ...order, status: "succeeded" };
            }
            return order;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleGetOrders = async () => {
      try {
        const responseOrders = await fetch(`${url}/order`);
        const responseUsers = await fetch(`${url}/user`);

        const orders = await responseOrders.json();
        const users = await responseUsers.json();

        const sortedOrders = orders.sort((a, b) => {
          const dateA = new Date(
            a.date.replace(
              /(\d{2})\/(\d{2})\/(\d{4}):(\d{2}):(\d{2})/,
              "$3-$2-$1T$4:$5"
            )
          );
          const dateB = new Date(
            b.date.replace(
              /(\d{2})\/(\d{2})\/(\d{4}):(\d{2}):(\d{2})/,
              "$3-$2-$1T$4:$5"
            )
          );
          return dateB - dateA;
        });

        const ordersWithUsers = sortedOrders.map((order) => {
          const user = users.find((user) => user.id === order.userId);
          return {
            ...order,
            username: user ? user.name : "Nome não encontrado",
          };
        });

        setAllOrders(ordersWithUsers);
        setVisibleOrders(ordersWithUsers.slice(0, pageSize));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    handleGetOrders();

    const interval = setInterval(() => {
      handleGetOrders();
    }, 10000); // 60000 milissegundos = 1 minuto

    // Retorna uma função de limpeza que limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [pageSize]);

  const loadMoreOrders = () => {
    const newPageSize = pageSize + 20; // Adicione 20 ao tamanho atual
    setPageSize(newPageSize);

    // Atualize os pedidos visíveis com base no novo tamanho da página
    setVisibleOrders(allOrders.slice(0, newPageSize));
  };

  const handleSearch = async (text) => {
    const result = allOrders.filter((order) => {
      return (
        order.username.toLowerCase().includes(text.toLowerCase()) ||
        order.paymentIntent.toLowerCase().includes(text.toLowerCase())
      );
    });

    setVisibleOrders(result);
  };

  const handleDeleteOrder = async (id) => {
    const response = await fetch(`${url}/order/delete/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      toast("Pedido excluído com sucesso!", { theme: "dark", type: "success" });

      const updatedOrders = visibleOrders.filter((result) => result.id !== id);

      setVisibleOrders(updatedOrders);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: "rgb(229, 229, 229)",
          height: "100%",
          padding: "10px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(229, 229, 229)",
            height: "100%",
            padding: "10px",
          }}
        >
          <h1
            style={{
              marginTop: "30px",
              fontSize: "23px",
              color: "black",
              textAlign: "center",
            }}
          >
            Gerenciar pedidos
          </h1>

          <div
            className="search"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
              gap: "10px",
            }}
          >
            <label style={{ color: "black" }}>
              Pesquisar pedido pelo código ou nome do comprador:
            </label>
            <input
              type="text"
              value={search}
              style={{
                padding: "10px",
              }}
              placeholder="Digite o código ou nome do comprador aqui"
              onChange={(e) => {
                e.preventDefault();
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>

          <table className="order-table" style={{ marginTop: "40px" }}>
            <thead>
              <tr>
                <th>Comprador</th>
                <th>IP</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Comprovante</th>
                <th>Data</th>
                <th>Produtos</th>
                <th>Quantidade</th>
                <th>Método de Pagamento</th>
                <th>Código</th>
                <th>Aprovar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((result) => (
                <tr>
                  <td>
                    <p style={{ textAlign: "center" }}>
                      <Link to={`/admin/dashboard/user/${result.userId}`}>
                        {result.username}
                      </Link>
                    </p>
                  </td>
                  <td>{result.userIp}</td>
                  <td>
                    {" "}
                    {result.status === "succeeded" ? (
                      <>Aprovada</>
                    ) : result.status === "approved" ? (
                      <>Aprovada</>
                    ) : (
                      <>Não autorizada</>
                    )}{" "}
                  </td>
                  <td style={{ width: "100px" }}>
                    {" "}
                    R$ {result.amount.toFixed(2)}{" "}
                  </td>
                  <td>
                    {" "}
                    <Link to={`${result.voucher}`}>
                      <button className="admin-button">Clique aqui</button>
                    </Link>
                  </td>
                  <td> {result.date} </td>
                  <td>
                    <button
                      className="admin-button"
                      onClick={() => handleToast(result.products)}
                    >
                      Produtos
                    </button>
                  </td>
                  <td>{result.quantity}</td>
                  <td>
                    {result.paymentMethod === "card"
                      ? "Cartão de Crédito"
                      : result.paymentMethod === "pix"
                      ? "PIX"
                      : "Mercado Pago"}
                  </td>
                  <td>
                    {result.paymentMethod === "pix" ? (
                      <>{result.paymentIntent}</>
                    ) : result.paymentMethod === "mercadopago" ? (
                      <>{result.paymentIntent}</>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td>
                    {" "}
                    {result.paymentMethod === "pix" ? (
                      <>
                        <button
                          className="admin-button"
                          onClick={(e) =>
                            handleApprovePayment({
                              id: result.id,
                              products: result.products[0],
                              quantity: result.quantity,
                            })
                          }
                        >
                          Aprovar pagamento
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td>
                    <button
                      className="admin-button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteOrder(result.id);
                      }}
                    >
                      Excluir Pedido
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: "center", margin: "20px" }}>
            <button className="show-more" onClick={loadMoreOrders}>
              Mostrar Mais
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderPage;
