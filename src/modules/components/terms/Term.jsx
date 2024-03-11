import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Term({ link }) {
  const [checked, setChecked] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.73)",
        width: "100%",
        height: "200%",
        display: "flex",
        zIndex: 1,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "800px",
          backgroundColor: "white",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          maxHeight: "750px",
          marginTop: "50px",
          borderRadius: "10px",
        }}
        className="terms-list"
      >
        <h1>Termos e Condições:</h1>

        <ol>
          <li>
            <h2>Disponibilidade de Estoque:</h2>
            <p>
              Ao adquirir bilhetes, observe que poderão ocorrer situações em que
              o produto não esteja disponível em nosso estoque, sendo necessário
              encomendá-lo. Recomendamos verificar a disponibilidade por meio do
              nosso chat antes de finalizar a compra.
            </p>
          </li>
          <li>
            <h2>Informações Pessoais:</h2>

            <p>
              É imprescindível preencher seus dados com precisão, incluindo CPF
              e endereço, para garantir a entrega adequada do seu produto.
              Qualquer informação incorreta pode resultar em atrasos ou falhas
              na entrega.
            </p>
          </li>
          <li>
            <h2>Verificação de Compradores:</h2>

            <p>
              Realizamos uma verificação minuciosa de cada comprador para
              garantir a segurança de nossas transações. Portanto, solicitamos
              que evitem o uso de informações falsas ou fraudulentas durante o
              processo de compra.
            </p>
          </li>
          <li>
            <h2>Resolução de Problemas:</h2>
            <p>
              Em caso de qualquer problema ou inconveniente com sua compra,
              comprometemo-nos a entrar em contato com seus familiares ou
              contatos designados para resolver a questão de forma eficiente e
              satisfatória.
            </p>
          </li>
        </ol>

        <p
          style={{
            marginTop: "50px",
            fontWeight: 600,
          }}
        >
          Estou ciente e concordo em seguir os termos e condições estabelecidos
          para garantir uma experiência de compra satisfatória.
          <input
            type="checkbox"
            onClick={(e) => {
              setChecked(!checked);
            }}
            style={{
              width: "20px",
              height: "20px",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          />
        </p>
        {checked ? (
          <>
            <Link to={link}>
              <button
                style={{
                  padding: "15px",
                  border: "1px solid black",
                  borderRadius: "10px",
                  marginTop: "35px",
                  width: "100%",
                }}
              >
                Prosseguir com a compra
              </button>
            </Link>
          </>
        ) : (
          <>
            <button
              style={{
                padding: "15px",
                border: "1px solid black",
                borderRadius: "10px",
                marginTop: "35px",
                width: "100%",
              }}
              onClick={(e) => {
                toast("Para prosseguir, aceite os termos de condições!", {
                  theme: "dark",
                  type: "error",
                });
              }}
            >
              Prosseguir com a compra
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Term;
