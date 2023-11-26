import React from "react";

function DashForm({ onSubmit, style, children }) {
  const styles = {
    display: "flex",
    alignItens: "center",
    flexDirection: "column",
    ...style,
  };

  return (
    <form style={styles} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default DashForm;
