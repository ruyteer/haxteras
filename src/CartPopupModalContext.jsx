import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  return (
    <ModalContext.Provider value={{ visible, showModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const usePopup = () => {
  return useContext(ModalContext);
};
