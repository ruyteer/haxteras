import React from "react";
import { useSpring, animated } from "react-spring";
import "./test.css";

const SeuComponente = () => {
  const [hovered, setHovered] = React.useState(false);

  const buttonsAnimation = useSpring({
    opacity: hovered ? 1 : 0,
    transform: `translateY(${hovered ? 0 : 10}px)`,
  });

  return (
    <div
      className="container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src="Omegamon 1.png" alt="Descrição da imagem" />
      <animated.div style={buttonsAnimation} className="botoes">
        <button onClick={() => console.log("Adicionar ao Carrinho")}>
          Adicionar ao Carrinho
        </button>
        <button onClick={() => console.log("Comprar")}>Comprar</button>
      </animated.div>
    </div>
  );
};

export default SeuComponente;
