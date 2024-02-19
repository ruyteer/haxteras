import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };
  const closeLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{ loading, showLoading, closeLoading, setLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  return useContext(LoadingContext);
};
