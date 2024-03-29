import React, { useEffect, useState } from "react";
import { AllHeader } from "../../components";
import "./styles.css";
import { handleFindProduct } from "../../helpers/find-product";
import { useLoaderData, useParams } from "react-router-dom";
import { getNowDate } from "../../helpers/get-date";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useLoading } from "../../../LoadingProvider";
import { getClientIp } from "../../helpers/get-ip";
initMercadoPago(import.meta.env.VITE_MERCADOPAGO);
import validator from "validator";
import { cpf } from "cpf-cnpj-validator";
const validatorCpf = cpf;

function BuyCartPage() {
  const [products, setProducts] = useState([{}]);
  const [emailVerify, setEmailVerify] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [formVerify, setFormVerify] = useState(false);
  const [formData, setFormData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const { discount } = useParams();
  const preferenceId = localStorage.getItem("preferenceId");
  const [error, setError] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mpOpen, setMpOpen] = useState(true);
  const [isGringo, setIsGringo] = useState(false);
  const { closeLoading } = useLoading();

  useEffect(() => {
    handleGetProduct();
    closeLoading();
  }, []);

  const handleGetProduct = async () => {
    const response = JSON.parse(localStorage.getItem("cart"));
    setProducts(response);
  };

  const handleTotalPrice = () => {
    if (discount > 0) {
      let price = 0;

      products.map((result) => {
        const total = result.price * result.quantity;
        const percent = discount / 100;
        price += total * percent;
      });
      return price;
    } else {
      let price = 0;
      products.map((result) => (price += result.price * result.quantity));

      return price;
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setEmailVerify(!emailVerify);
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    const formDataValues = e.target;
    const objectData = {};

    for (const field of formDataValues) {
      objectData[field.name] = field.value;
    }

    setFormVerify(!formVerify);
    setFormData(objectData);
  };

  const handleFinishOrder = async (e) => {
    e.preventDefault();
    const userIp = await getClientIp();
    sessionStorage.setItem("userip", userIp);

    const cpfValidator = validatorCpf.isValid(formData.cpf, true);
    const phoneValidator = validator.isMobilePhone(formData.phone, "pt-BR");
    if (!phoneValidator) {
      return alert("Número de telefone inválido!");
    }

    sessionStorage.setItem("userEmail", JSON.stringify(emailValue));

    let cpf = formData.cpf;
    if (isGringo) {
      cpf = "0110";
    } else {
      if (!cpfValidator) {
        return alert("CPF inválido!");
      }
    }

    try {
      const response = await fetch(`${url}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          cpf: cpf,
          email: emailValue,
          phone: formData.phone,
          surname: formData.surname,
          address: {
            city: formData.city,
            address: formData.address,
            cep: formData.cep,
            neighborhood: formData.neighborhood,
            state: formData.state,
            country: formData.country,
            number: formData.number,
          },
        }),
      });

      if (response.ok) {
        const responseJson = await response.json();

        localStorage.setItem("userId", responseJson);

        const total = handleTotalPrice();
        sessionStorage.setItem(
          "total-price",
          JSON.stringify({ discount, price: total })
        );

        window.location.href = `${local}/payment/credit-card/cart`;
      } else {
        const responseJson = await response.json();
        return alert(responseJson);
      }
    } catch (error) {
      return alert(error);
    }
  };

  const handleFinishPixOrder = async (e) => {
    e.preventDefault();
    const userIp = await getClientIp();
    sessionStorage.setItem("userEmail", JSON.stringify(emailValue));
    const name = document.getElementById("pix-name").value;
    const number = document.getElementById("pix-number").value;
    const nickname = document.getElementById("pix-nick").value;
    const cpf = document.getElementById("pix-cpf").value;

    const cpfValidator = validatorCpf.isValid(cpf, true);
    const phoneValidator = validator.isMobilePhone(number, "pt-BR");

    if (!phoneValidator) {
      return alert("Número de telefone inválido!");
    } else if (!cpfValidator) {
      return alert("CPF inválido!");
    }

    try {
      const response = await fetch(`${url}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          cpf: cpf,
          email: emailValue,
          phone: number,
          surname: name.split(" ")[1] || "vazio",
          nickname,
          address: {
            city: "-",
            address: "-",
            cep: "0",
            neighborhood: "-",
            state: "-",
            country: "-",
            number: 0,
          },
        }),
      });

      if (response.ok) {
        const responseJson = await response.json();

        localStorage.setItem("userId", responseJson);

        const total = handleTotalPrice();
        sessionStorage.setItem(
          "total-price",
          JSON.stringify({ discount, price: total })
        );

        const date = getNowDate();
        const orderId = Math.floor(Math.random() * 100000).toFixed(0);
        localStorage.setItem("orderGenerated", orderId);

        const orderIdsList = [];

        const fetchPromises = products.map(async (result) => {
          const formData = new FormData();
          formData.append("userId", responseJson);
          formData.append("quantity", result.quantity);
          formData.append("products", JSON.stringify([result.id]));
          formData.append("paymentMethod", "pix");
          formData.append("paymentIntent", orderId);
          formData.append("userIp", userIp);
          formData.append(
            "amount",
            JSON.stringify(result.price * result.quantity)
          );
          formData.append("date", date);

          const orderResponse = await fetch(`${url}/order/create`, {
            method: "POST",
            body: formData,
          });
          if (orderResponse.ok) {
            const orderJson = await orderResponse.json();
            return orderIdsList.push(orderJson);
          } else {
            alert("Houve um erro. Tente novamente!");
          }
        });

        Promise.all(fetchPromises)
          .then(() => {
            localStorage.setItem("orderPixId", JSON.stringify(orderIdsList));
            window.location.href = `${local}/payment/pix/cart`;
          })
          .catch((error) => {
            console.error("Erro ao processar as fetchs:", error);
          });
      } else {
        const responseJson = await response.json();
        alert(responseJson);
      }
    } catch (error) {
      return alert(error);
    }
  };

  const handleCEPChange = (e) => {
    const { value } = e.target;

    const numericCEP = value.replace(/\D/g, "");

    const formattedCEP = numericCEP.replace(/(\d{5})(\d{3})/, "$1-$2");

    setFormData({ ...formData, cep: formattedCEP });
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;

    const numericPhone = value.replace(/\D/g, "");

    const formattedPhone = numericPhone.replace(
      /(\d{2})(\d{1})(\d{4})(\d{4})/,
      "($1) $2 $3-$4"
    );

    setFormData({ ...formData, phone: formattedPhone });
  };

  const handleCPFChange = (e) => {
    const { value } = e.target;

    const numericCPF = value.replace(/\D/g, "");

    const formattedCPF = numericCPF.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );

    setFormData({ ...formData, cpf: formattedCPF });
  };

  const handleFinishMpOrder = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("userEmail", JSON.stringify(emailValue));
    const userIp = await getClientIp();

    const name = document.getElementById("pix-name").value;
    const number = document.getElementById("pix-number").value;
    const nickname = document.getElementById("pix-nick").value;
    const cpf = document.getElementById("pix-cpf").value;

    const cpfValidator = validatorCpf.isValid(cpf, true);
    const phoneValidator = validator.isMobilePhone(number, "pt-BR");

    if (!phoneValidator) {
      return alert("Número de telefone inválido!");
    } else if (!cpfValidator) {
      return alert("CPF inválido!");
    }

    try {
      const response = await fetch(`${url}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          cpf: cpf,
          email: emailValue,
          phone: number,
          surname: name.split(" ")[1] || "vazio",
          nickname,
          address: {
            city: "-",
            address: "-",
            cep: "0",
            neighborhood: "-",
            state: "-",
            country: "-",
            number: 0,
          },
        }),
      });
      if (response.ok) {
        const responseJson = await response.json();

        localStorage.setItem("userId", responseJson);

        try {
          const date = getNowDate();
          const orderId = Math.floor(Math.random() * 100000).toFixed(0);

          const orderIdsList = [];

          const fetchPromises = products.map(async (result) => {
            const formData = new FormData();
            formData.append("userId", responseJson);
            formData.append("quantity", result.quantity);
            formData.append("products", JSON.stringify([result.id]));
            formData.append("paymentMethod", "mercadopago");
            formData.append("paymentIntent", orderId);
            formData.append("userIp", userIp);
            formData.append(
              "amount",
              JSON.stringify(result.price * result.quantity)
            );
            formData.append("date", date);

            const orderResponse = await fetch(`${url}/order/create`, {
              method: "POST",
              body: formData,
            });

            if (orderResponse.ok) {
              const orderJson = await orderResponse.json();
              return orderIdsList.push(orderJson);
            } else {
              alert("Houve um erro, tente novamente!");
            }
          });

          Promise.all(fetchPromises).then(async () => {
            localStorage.setItem("orderMpId", JSON.stringify(orderIdsList));
            const mpItems = [];
            products.map((result) => {
              const edit = {
                id: result.id,
                title: result.name,
                picture_url: result.images[0],
                description: result.description,
                quantity: parseInt(result.quantity),
                unit_price: result.price,
              };

              mpItems.push(edit);
            });

            const pResponse = await fetch(`${url}/order/preference/update`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: responseJson,
                orderId: JSON.stringify(orderIdsList),
                preferenceId,
                code: orderId,
                products: JSON.stringify(mpItems),
              }),
            });

            if (pResponse.ok) {
              setMpOpen(false);
              setCheckoutOpen(true);
            } else {
              alert("Houve um erro. Tente novamente!");
            }
          });
        } catch (error) {
          setError(error);
        }
      } else {
        const responseJson = await response.json();
        setError(responseJson);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <AllHeader />
      <div className="buy-content">
        <div className="buy-page">
          <div className="payment-method">
            <h1>Formas de pagamento</h1>

            <form onSubmit={handleFinishOrder}>
              {products.some((result) => result.description === "bloquear") ? (
                <>
                  <div className="form-radio">
                    <input
                      type="radio"
                      onClick={() => setPaymentMethod("pix")}
                      name="payment-method"
                      id="pix"
                    />
                    <p>Pix</p>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="form-radio">
                    <input
                      type="radio"
                      onClick={() => setPaymentMethod("credit-card")}
                      name="payment-method"
                      id="credit-card"
                    />
                    <p>Cartão de Crédito - Stripe</p>
                  </div>
                  <div className="form-radio">
                    <input
                      type="radio"
                      onClick={() => setPaymentMethod("pix")}
                      name="payment-method"
                      id="pix"
                    />
                    <p>Pix</p>
                  </div>
                  <div className="form-radio">
                    <input
                      type="radio"
                      onClick={() => setPaymentMethod("mp")}
                      name="payment-method"
                      id="mp"
                    />
                    <p>Cartão de Crédito - Mercado Pago</p>
                  </div>
                </>
              )}
            </form>
          </div>
          {paymentMethod === "credit-card" ? (
            <>
              <div
                className={`email-container ${emailVerify ? "checked" : ""}`}
              >
                <h1>Meu contato</h1>
                <p className="email-value">{emailValue}</p>
                <form onSubmit={handleEmailSubmit}>
                  <div className="content">
                    <p>Endereço de e-mail</p>
                    <input
                      type="email"
                      required
                      placeholder="email@gmail.com"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                    />
                    <p className="info">
                      O número do pedido e o recibo serão enviados para esse
                      endereço de email.
                    </p>
                  </div>

                  <button type="submit">
                    {emailVerify ? <>Alterar email</> : <>Salvar alterações</>}
                  </button>
                </form>
              </div>

              <div className="ship-infos">
                <form
                  onSubmit={handleInfoSubmit}
                  className={formVerify ? "form-checked" : ""}
                >
                  <h1>Informações de faturamento</h1>
                  <div className="grid-columns">
                    <div className="form-content">
                      <label htmlFor="name">Nome</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="Lucas"
                      />
                    </div>
                    <div className="form-content">
                      <label htmlFor="surname">Sobrenome</label>
                      <input
                        type="text"
                        name="surname"
                        id="surname"
                        required
                        placeholder="Alves"
                      />
                    </div>
                    <div className="form-content">
                      <label htmlFor="country">País</label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        required
                        placeholder="Brasil"
                      />
                    </div>
                    <div className="form-content">
                      <label htmlFor="cep">CEP</label>
                      <input
                        type="text"
                        name="cep"
                        id="cep"
                        onChange={handleCEPChange}
                        value={formData.cep}
                        maxLength={8}
                        required
                        placeholder="XXXXXX-XXX"
                      />
                    </div>
                    <div className="form-content">
                      <label htmlFor="address">Endereço</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        required
                        placeholder="Rua do ouro 23"
                      />
                    </div>
                    <div className="form-content">
                      <label htmlFor="number">Número</label>
                      <input
                        type="text"
                        name="number"
                        id="number"
                        required
                        placeholder="1"
                      />
                    </div>
                    <div className="form-content">
                      <label htmlFor="state">Estado</label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        required
                        placeholder="Rio de Janeiro"
                      />
                    </div>
                    <div className="form-content">
                      <label htmlFor="city">Cidade</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        required
                        placeholder="Rio de Janeiro"
                      />
                    </div>
                    <div className="form-content">
                      <label htmlFor="neighborhood">Bairro</label>
                      <input
                        type="text"
                        name="neighborhood"
                        id="neighborhood"
                        required
                        placeholder="Arapoangas"
                      />
                    </div>
                    <div className="form-content">
                      <label htmlFor="phone">Telefone</label>
                      <input
                        type="text"
                        maxLength={11}
                        name="phone"
                        id="phone"
                        required
                        placeholder="DDD 9 XXXX-XXXX"
                      />
                    </div>
                    <div className="form-content">
                      {isGringo ? (
                        <></>
                      ) : (
                        <>
                          <label htmlFor="cpf">CPF</label>
                          <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            maxLength={11}
                            required
                            placeholder="XXX.XXX.XXX-XX"
                          />
                        </>
                      )}
                      <div
                        className="grigo-question"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <label htmlFor="gringo">You're not Brazilian?</label>
                        <input
                          style={{ marginLeft: "10px", marginTop: "0" }}
                          type="checkbox"
                          name="gringo"
                          id="gringo"
                          checked={isGringo}
                          onChange={(e) => {
                            setIsGringo(e.target.checked);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className={formVerify ? "form-button" : ""}
                    type="submit"
                  >
                    {formVerify ? (
                      <>Alterar informações</>
                    ) : (
                      <>Prosseguir para pagamento</>
                    )}
                  </button>

                  {formVerify ? (
                    <>
                      {" "}
                      <button
                        onClick={handleFinishOrder}
                        style={{ marginBottom: "30px" }}
                      >
                        Prosseguir
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </form>
              </div>
            </>
          ) : paymentMethod === "pix" ? (
            <>
              <div className={`email-container`}>
                <h1>Meu contato</h1>
                <p className="email-value">{emailValue}</p>
                <form onSubmit={handleFinishPixOrder}>
                  <div className="content">
                    <p>Endereço de e-mail</p>
                    <input
                      type="email"
                      required
                      placeholder="email@gmail.com"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                    />
                    <p className="info">
                      O número do pedido e o recibo serão enviados para esse
                      endereço de email.
                    </p>

                    <p>Nome</p>

                    <input
                      type="text"
                      name="name"
                      placeholder="Joaquim"
                      required
                      id="pix-name"
                    />
                    <p>CPF</p>

                    <input
                      type="text"
                      name="cpf"
                      required
                      maxLength={11}
                      placeholder="XXX.XXX.XXX-XX"
                      id="pix-cpf"
                    />
                    <p>Nick do jogo</p>

                    <input
                      type="text"
                      name="nickname"
                      required
                      placeholder="joaquimmm123"
                      id="pix-nick"
                    />
                    <p>Número</p>

                    <input
                      type="text"
                      name="number"
                      maxLength={11}
                      placeholder="DDD 9 XXXX-XXXX"
                      required
                      id="pix-number"
                    />
                  </div>

                  <button type="submit">Prosseguir para pagamento</button>
                </form>
              </div>
            </>
          ) : paymentMethod === "mp" ? (
            <>
              <div className={`email-container`}>
                <h1>Meu contato</h1>
                <p className="email-value">{emailValue}</p>
                <form onSubmit={handleFinishMpOrder}>
                  {mpOpen ? (
                    <>
                      {" "}
                      <div className={"content"}>
                        <p>Endereço de e-mail</p>
                        <input
                          type="email"
                          required
                          placeholder="email@gmail.com"
                          value={emailValue}
                          onChange={(e) => setEmailValue(e.target.value)}
                        />
                        <p className="info">
                          O número do pedido e o recibo serão enviados para esse
                          endereço de email.
                        </p>

                        <p>Nome</p>

                        <input
                          type="text"
                          name="name"
                          placeholder="Joaquim"
                          id="pix-name"
                          required
                        />
                        <p>CPF</p>

                        <input
                          type="text"
                          name="cpf"
                          required
                          maxLength={11}
                          placeholder="XXX.XXX.XXX-XX"
                          id="pix-cpf"
                        />
                        <p>Nick do jogo</p>

                        <input
                          type="text"
                          name="nickname"
                          placeholder="joaquimmm123"
                          id="pix-nick"
                          required
                        />
                        <p>Número</p>

                        <input
                          type="text"
                          name="number"
                          maxLength={11}
                          placeholder="DDD 9 XXXX-XXXX"
                          required
                          id="pix-number"
                        />
                      </div>
                      <button type="submit">Prosseguir para pagamento</button>
                    </>
                  ) : (
                    <></>
                  )}
                </form>

                {checkoutOpen ? (
                  <>
                    <Wallet
                      locale="pt-BR"
                      onError={(error) => {
                        setError(error);
                      }}
                      initialization={{
                        preferenceId: preferenceId,
                        redirectMode: "self",
                      }}
                      customization={{
                        texts: { valueProp: "smart_option" },
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <>
              <p style={{ color: "gray" }}>Selecione o método de pagamento!</p>
            </>
          )}
        </div>
        <div className="resum">
          <h1>Resumo</h1>
          <div className="line"></div>
          {products.map((result) => (
            <>
              <div className="details">
                <div className="name">
                  <p>{result.name}</p>
                  <p>Quantidade</p>
                </div>
                <div className="price">
                  <p>R$ {result.price}</p>
                  <p> {result.quantity}</p>
                </div>
              </div>
            </>
          ))}
          <div className="line"></div>
          <div className="discount">
            <p>Desconto</p>
            <p>{discount}%</p>
          </div>
          <div className="line"></div>
          <div className="total">
            <p>Total</p>
            <p className="total-price">R$ {handleTotalPrice().toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export { BuyCartPage };
