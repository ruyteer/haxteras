import React from "react";

function FormControl({ type, name, label, placeholder, id, required, value }) {
  return (
    <div
      className="form-control"
      style={{
        display: "flex",
        flexDirection: "column",
        color: "white",
        textAlign: "left",
      }}
    >
      <label htmlFor={name} style={{ fontSize: "18px", fontWeight: "600" }}>
        {label}
      </label>

      <input
        className="input-control"
        required={required}
        defaultValue={value}
        type={type}
        multiple
        name={name}
        placeholder={placeholder}
        id={id}
        style={{
          borderRadius: "10px",
          padding: "10px",
        }}
      />
    </div>
  );
}

export default FormControl;
