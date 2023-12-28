import React, { useEffect, useState } from "react";
import { AllHeader } from "../../components";
import "./styles.css";
import { handleFindProduct } from "../../helpers/find-product";
import { useParams } from "react-router-dom";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function BuyPage() {
  const { id, quantity } = useParams();
  const [product, setProduct] = useState({});
  const [emailVerify, setEmailVerify] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [formVerify, setFormVerify] = useState(false);
  const [formData, setFormData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    handleGetProduct();
  }, []);

  const handleGetProduct = async () => {
    const response = await handleFindProduct(id);
    setProduct(response);
  };

  const handleTotalPrice = () => {
    const total = product.price * quantity;
    return total;
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

    sessionStorage.setItem("userEmail", JSON.stringify(emailValue));

    try {
      const response = await fetch(`${url}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          cpf: formData.cpf,
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

      const responseJson = await response.json();

      localStorage.setItem("userId", responseJson);
    } catch (error) {
      alert(error);
    }

    window.location.href = `${local}/payment/credit-card/${product.id}/${quantity}`;
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

        window.location.href = `${local}/payment/pix/${product.id}/${quantity}`;
      } else {
        const responseJson = await response.json();
        alert(responseJson);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <AllHeader />
      <div className="buy-content">
        <div className="buy-page">
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
                  <p>Cartão de Crédito</p>
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
                      {emailVerify ? (
                        <>Alterar email</>
                      ) : (
                        <>Salvar alterações</>
                      )}
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
                        id="pix-name"
                      />
                      <p>CPF</p>

                      <input
                        type="text"
                        name="cpf"
                        placeholder="3531253464"
                        id="pix-cpf"
                      />
                      <p>Nick do jogo</p>

                      <input
                        type="text"
                        name="nickname"
                        placeholder="joaquimmm123"
                        id="pix-nick"
                      />
                      <p>Número</p>

                      <input
                        type="text"
                        name="number"
                        placeholder="(61) 983532132"
                        id="pix-number"
                      />
                    </div>

                    <button type="submit">Prosseguir para pagamento</button>
                  </form>
                </div>
              </>
            ) : (
              <>
                <p style={{ color: "gray" }}>
                  Selecione o método de pagamento!
                </p>
              </>
            )}
          </div>
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
              <p>R$ {product.price}</p>
              <p> {quantity}</p>
            </div>
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

export { BuyPage };
