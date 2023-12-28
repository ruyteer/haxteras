import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChatBody from "./server/ChatBody";
import { socket } from "../../../config/socket";

function Painel() {
  const [open, setOpen] = useState(false);

  const handleOpenChat = () => {
    socket.emit("openned chat", socket.id);
    setOpen(true);
  };
  return (
    <>
      {open ? (
        <>
          <ChatBody />
        </>
      ) : (
        <>
          <div
            style={{
              position: "fixed",
              zIndex: 1,
              bottom: "0px",
              right: "30px",
              backgroundColor: "var(--amarelo)",
              color: "white",
              fontWeight: "600",
              height: "20px",
              padding: "15px",
              textAlign: "left",
              width: "300px",
              borderRadius: "18px 18px 0 0",
              cursor: "pointer",
              border: "1px solid var(--preto)",
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleOpenChat}
          >
            <p>Online</p>
          </div>
        </>
      )}
    </>
  );
}

export default Painel;
