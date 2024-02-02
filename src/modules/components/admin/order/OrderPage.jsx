import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_URL;

function OrderPage() {
  const [orders, setOrders] = useState([{}]);

  const handleGetOrders = async () => {
    try {
      // Buscar pedidos
      const response = await fetch(`${url}/order`);
      const orders = await response.json();

      // Buscar todos os usuários de uma vez
      const userResponse = await fetch(`${url}/user`);
      const users = await userResponse.json();

      // Associar usuários aos pedidos
      const ordersWithUsers = orders.map((order) => {
        const user = users.find((user) => user.id === order.userId);
        return {
          ...order,
          username: user ? user.name : "Nome não encontrado",
        };
      });

      // Ordenar e setar os pedidos
      const sortedOrders = ordersWithUsers.sort((a, b) => {
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

      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

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
      await fetch(`${url}/order/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await fetch(`${url}/product/${products}`);
      const responseJson = await response.json();

      console.log(responseJson.stock);
      console.log(quantity);
      const updatedStock = responseJson.stock - parseInt(quantity);
      console.log(updatedStock);

      await fetch(`${url}/product/update/${products}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock: updatedStock,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetOrders();
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
          Gerenciar pedidos
        </h1>

        <table style={{ marginTop: "13px" }}>
          <thead>
            <tr>
              <th>Nome Comprador</th>
              <th>Comprador</th>
              <th>Status</th>
              <th>Valor</th>
              <th>Comprovante</th>
              <th>Data</th>
              <th>Produtos</th>
              <th>Quantidade</th>
              <th>Método de Pagamento</th>
              <th>Código</th>
              <th>Aprovar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((result) => (
              <tr>
                <td>
                  <p style={{ textAlign: "center" }}>{result.username}</p>
                </td>
                <td>
                  <a href={`/admin/dashboard/user/${result.userId}`}>
                    Clique Aqui
                  </a>
                </td>
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
                <td style={{ width: "100px" }}> R$ {result.amount} </td>
                <td>
                  {" "}
                  <a href={`${result.voucher}`}>Clique Aqui</a>{" "}
                </td>
                <td> {result.date} </td>
                <td>
                  <button
                    className="admin-button"
                    onClick={() => handleToast(result.products)}
                  >
                    Clique aqui
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderPage;
