import React from "react";
import "../styles/global.css";

function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // tratar login
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
          <input type="text" placeholder="Username" name="user" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password: *</label>
          <input
            type="password"
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
