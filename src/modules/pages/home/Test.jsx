import React from "react";
import { useSpring, animated } from "react-spring";
import "./test.css";

const ScrollAnimation = () => {
  return (
    <animated.div className="animated-div">
      <p className="recados">Ficaremos abertos até às 10:00!</p>
    </animated.div>
  );
};

export default ScrollAnimation;
