import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./CartProvider.jsx";
import { ModalProvider } from "./CartPopupModalContext.jsx";
import { LoadingProvider } from "./LoadingProvider.jsx";
import { PrismicProvider } from "@prismicio/react";
import { client } from "./config/prismic.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrismicProvider client={client}>
      <BrowserRouter>
        <LoadingProvider>
          <ModalProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ModalProvider>
        </LoadingProvider>
      </BrowserRouter>
    </PrismicProvider>
  </React.StrictMode>
);
