import React, { useState } from "react";
import "../styles/global.css";
const url = import.meta.env.VITE_URL;
const local = import.meta.env.VITE_LOCAL;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const responseJson = await response.json();
        sessionStorage.setItem("token", responseJson.token);

        window.location.href = `${local}/admin/dashboard/home`;
      } else {
        const responseJson = await response.json();
        if (responseJson.error === "incorrect username/password!") {
          alert(responseJson.error);
          return;
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login">
      <h1
        style={{
          marginTop: "50px",
          color: "var(--amarelo)",
          fontWeight: "600",
        }}
      >
        Dashboard Login
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          marginTop: "70px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontWeight: "500",
            fontSize: "17px",
          }}
        >
          Painel Haxteras
        </p>
        <div className="form-control">
          <label htmlFor="user">Username: *</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            name="user"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password: *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            name="password"
            required
          />
        </div>

        <button
          type="submit"
          className="admin-button"
          style={{ marginTop: "30px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
