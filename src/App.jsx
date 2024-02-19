import React, { useEffect } from "react";
import Router from "./modules/routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./modules/components/footer/Footer";
import Painel from "./modules/pages/chat/Painel";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "./modules/components/loading/Loading";
import { useLoading } from "./LoadingProvider";

function App() {
  const { loading, showLoading, closeLoading } = useLoading();
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <ToastContainer />

      {loading ? (
        <>
          <Loading />
          <Router />
        </>
      ) : (
        <>
          <Router />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
