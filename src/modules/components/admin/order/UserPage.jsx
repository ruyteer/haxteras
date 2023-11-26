import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
const url = import.meta.env.VITE_URL;

function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState({ address: [{}] });

  const handleGetUser = async () => {
    const response = await fetch(`${url}/user/${id}`);
    const responseJson = await response.json();
    setUser(responseJson);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="user">
        <div className="user-content">
          <h1>Dados do Usuário</h1>
          <p>
            <span>Nome:</span> {user.name}
          </p>
          <p>
            <span>Sobrenome:</span> {user.surname}
          </p>
          <p>
            <span>Email:</span> {user.email}{" "}
          </p>
          <p>
            <span>Whatsapp:</span> {user.phone}{" "}
          </p>

          <p>
            <span>Dashbot Nickname:</span>{" "}
            {user.nickname ? <>{user.nickname}</> : "Vazio"}{" "}
          </p>
          <p>
            <span>CPF:</span> {user.cpf}{" "}
          </p>
          {user.address.map((result) => (
            <>
              <p>
                <span>CEP:</span> {result.cep}{" "}
              </p>
              <p>
                <span>Estado:</span> {result.state}{" "}
              </p>
              <p>
                <span>País:</span> {result.country}{" "}
              </p>
              <p>
                <span>Cidade:</span> {result.city}{" "}
              </p>
              <p>
                <span>Bairro:</span> {result.neighborhood}{" "}
              </p>
              <p>
                <span>Número:</span> {result.number}{" "}
              </p>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserPage;
