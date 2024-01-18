import React, { useEffect, useState } from "react";
import "./styles.css";
import { socket } from "../../../../config/socket";

function ChatBody({ setOpen }) {
  const [messages, setMessages] = useState([{ type: "", message: "" }]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.off("listen messages");

    socket.on("listen messages", (args) => {
      setMessages((prev) => [...prev, args]);
    });

    return () => {
      socket.off("listen message");
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    socket.emit("send message", { type: "client", message: text });

    const messagesDiv = document.getElementById("messages-div");

    setText("");

    setTimeout(() => {
      messagesDiv.scrollTop = messagesDiv.scrollHeight + 100;
    }, 0);
  };

  return (
    <div className="chatbody">
      <div className="chat-title">
        <button className="close-button" onClick={() => setOpen(false)}>
          X
        </button>
        <div className="title">
          <img src="/digimon chat.png" alt="Digimon" />
          <div className="balloon">
            <p>Olá! Eu sou o Hique, qual a sua dúvida?</p>
          </div>
        </div>
      </div>

      <div className="chat-bottom">
        <div className="messages" id="messages-div">
          <div className="hique-div">
            <p className="hique-message">Em que posso te ajudar hoje?</p>
          </div>

          {messages.map((result, index) => (
            <div
              key={index}
              className={result.type === "client" ? "client-div" : "hique-div"}
            >
              <p
                className={
                  result.type === "client" ? "client-message" : "hique-message"
                }
              >
                {result.message}
              </p>
            </div>
          ))}
          <div
            className="client-div"
            style={{ backgroundColor: "transparent" }}
          >
            <p
              className="client-message"
              style={{ backgroundColor: "transparent", height: "20px" }}
            ></p>
          </div>
        </div>
        <div className="input">
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Digite sua mensagem aqui..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBody;
