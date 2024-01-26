import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import "./test.css";
const url = import.meta.env.VITE_URL;

const ScrollAnimation = () => {
  const [message, setMessage] = useState("");

  const handleGetNewsletter = async () => {
    const response = await fetch(`${url}/newsletter`);
    const responseJson = await response.json();
    setMessage(responseJson.text);
  };

  useEffect(() => {
    handleGetNewsletter();
  }, []);

  return (
    <animated.div className="animated-div">
      <p className="recados">{message}</p>
    </animated.div>
  );
};

export default ScrollAnimation;
