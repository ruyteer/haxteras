import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./CartProvider.jsx";
import { ModalProvider } from "./CartPopupModalContext.jsx";
import { LoadingProvider } from "./LoadingProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ModalProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ModalProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
