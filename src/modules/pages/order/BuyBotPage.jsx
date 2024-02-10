import React, { useEffect, useState } from "react";
import { AllHeader } from "../../components";
import "./styles.css";
import { handleFindProduct } from "../../helpers/find-product";
import { useParams } from "react-router-dom";
import { getNowDate } from "../../helpers/get-date";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago(import.meta.env.VITE_MERCADOPAGO);

function BuyBotPage({ botType }) {
  const [emailVerify, setEmailVerify] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [formVerify, setFormVerify] = useState(false);
  const [formData, setFormData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const botData = JSON.parse(sessionStorage.getItem("dashbotData"));
  const [mpOpen, setMpOpen] = useState(true);
  const preferenceId = localStorage.getItem("preferenceId");
  const [error, setError] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isGringo, setIsGringo] = useState(false);

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

    sessionStorage.setItem("userEmail", JSON.stringify(emailValue));

    let cpf = formData.cpf;
    if (isGringo) {
      cpf = "0110";
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
          nickname: botData.username,
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
        if (botType === "dashbot") {
          window.location.href = `${local}/payment/credit-card/dashbot`;
        } else if (botType === "nenbot") {
          window.location.href = `${local}/payment/credit-card/nenbot`;
        }
      } else {
        const responseJson = await response.json();
        return alert(responseJson);
      }
    } catch (error) {
      return alert(error);
    }
  };

  const handleGetTotalPrice = () => {
    const mcdValue = botData.screen;
    const result = mcdValue * botData.price;
    return result;
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

  const handleFinishPixOrder = async (e) => {
    e.preventDefault();

    sessionStorage.setItem("userEmail", JSON.stringify(emailValue));
    const name = document.getElementById("pix-name").value;
    const number = document.getElementById("pix-number").value;
    const cpf = document.getElementById("pix-cpf").value;

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
          nickname: botData.username,
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

        const date = getNowDate();
        const orderId = Math.floor(Math.random() * 100000).toFixed(0);
        localStorage.setItem("orderGenerated", orderId);

        const dataBody = {
          type: botType,
          day: botData.day,
          mdc: botData.screen,
        };

        const orderResponse = await fetch(`${url}/order/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: responseJson,
            quantity: botData.screen,
            products: JSON.stringify([dataBody]),
            paymentMethod: "pix",
            paymentIntent: orderId,
            amount: (botData.price * botData.screen).toFixed(2),
            date,
          }),
        });

        if (orderResponse.ok) {
          const orderResponseJson = await orderResponse.json();

          localStorage.setItem(
            "orderPixId",
            JSON.stringify([orderResponseJson])
          );

          if (botType === "dashbot") {
            window.location.href = `${local}/payment/pix/dashbot`;
          } else if (botType === "nenbot") {
            window.location.href = `${local}/payment/pix/nenbot`;
          }
        } else {
          alert("Houve um erro. Tente novamente!");
        }
      } else {
        const responseJson = await response.json();
        alert(responseJson);
      }
    } catch (error) {
      return alert(error);
    }
  };

  const handleFinishMpOrder = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("userEmail", JSON.stringify(emailValue));

    const name = document.getElementById("pix-name").value;
    const number = document.getElementById("pix-number").value;
    const nickname = document.getElementById("pix-nick").value;
    const cpf = document.getElementById("pix-cpf").value;

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
          nickname: botData.username,
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

          const dataBody = {
            type: botType,
            day: botData.day,
            mdc: botData.screen,
          };

          const orderResponse = await fetch(`${url}/order/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: responseJson,
              quantity: botData.screen,
              products: JSON.stringify([dataBody]),
              paymentMethod: "mercadopago",
              paymentIntent: orderId,
              amount: (botData.price * botData.screen).toFixed(2),
              date,
            }),
          });

          if (orderResponse.ok) {
            const orderResponseJson = await orderResponse.json();

            localStorage.setItem(
              "orderMpId",
              JSON.stringify([orderResponseJson])
            );

            const pResponse = await fetch(`${url}/order/preference/update`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: responseJson,
                orderId: JSON.stringify([orderResponseJson]),
                preferenceId,
                code: orderId,
                products: JSON.stringify([
                  {
                    id: botType,
                    title: `${botType} ${botData.day}D`,
                    picture_url:
                      "https://storage.googleapis.com/haxteras.appspot.com/2a8ecc3215e0a270301afdc3de5e587f2e14bc03r1-1200-1773v2_hq.jpg?GoogleAccessId=firebase-adminsdk-fb1sc%40haxteras.iam.gserviceaccount.com&Expires=16730323200&Signature=FMRzz2llF6Nfj8zo1je%2BbmIpVrwZuqfUP%2F1MW%2FaY2%2B3KaNXaqSlSougfnFUBHaTOalrWrno5APnZgY%2BSOHjqDdhsZIlbUl7Kpj4Knyql6kfWnoeSauAz53I29hO9ZQM%2B8Oj4XJLdXhi9HYsdf0DxocIMjyZoZFR3sJ4gq64X6R72ESuTVUroUgB1WDxGlljvF%2Fz4kZDPCoCKMe1nC5KH9EH1nwtkAH7INgOzmW%2FRRuoYmrtRGm6zi%2BMb4YC4PD36xiaN%2BadUzNcG%2B%2BFcTlxIo7UDgcen2Rz2qj8LhUeAp%2F75LPEadRG19yyxa6Vfe04FJTtP%2F%2BvjF04%2B6Yy48f8Uqw%3D%3D",
                    description: `${botType} ${botData.day}D`,
                    quantity: parseInt(botData.screen),
                    unit_price: botData.price,
                  },
                ]),
              }),
            });

            if (pResponse.ok) {
              setMpOpen(false);
              setCheckoutOpen(true);
            }
          } else {
            alert("Houve um erro. Tente novamente!");
          }
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
                        onChange={handlePhoneChange}
                        value={formData.phone}
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
                            onChange={handleCPFChange}
                            value={formData.cpf}
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
                      onChange={handleCPFChange}
                      maxLength={11}
                      value={formData.cpf}
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
                      onChange={handlePhoneChange}
                      value={formData.phone}
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
                          onChange={handleCPFChange}
                          maxLength={11}
                          value={formData.cpf}
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
                          onChange={handlePhoneChange}
                          value={formData.phone}
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
          <div className="details">
            <div className="name">
              <p>Itens(1)</p>
              <p>Quantidade</p>
            </div>
            <div className="price">
              <p>R$ {botData.price}</p>
              <p> {botData.screen}</p>
            </div>
          </div>
          <div className="line"></div>
          <div className="total">
            <p>Total</p>
            <p className="total-price">R$ {handleGetTotalPrice()}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyBotPage;
