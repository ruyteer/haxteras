import React, { useEffect } from "react";
import Router from "./modules/routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./modules/components/footer/Footer";
import Painel from "./modules/pages/chat/Painel";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <ToastContainer />
      <Router />
      <Painel />
      <Footer />
    </>
  );
}

export default App;
