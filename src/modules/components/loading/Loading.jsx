import "./loader.css";

function Loading() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1c1427",
        flexDirection: "column",
      }}
    >
      <div
        className="carregando"
        style={{
          display: "flex",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "white" }}>Carregando...</p>
        <img style={{ width: "40px" }} src="/spinner.svg" alt="Loader" />
      </div>
      <img
        style={{ width: "200px", borderRadius: "20px" }}
        src="/loadingmon.gif"
        alt="Loader"
      />
    </div>
  );
}

export default Loading;
