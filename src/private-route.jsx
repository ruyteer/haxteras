import React, { useEffect } from "react";
import { useJwt } from "react-jwt";
import { Navigate, useNavigate } from "react-router-dom";
const local = import.meta.env.VITE_LOCAL;

function PrivateRoutes({ children }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { isExpired } = useJwt(token);

  const verify = () => {
    if (!token) {
      console.log("aq");
      return (window.location.href = `${local}/admin/login`);
    }

    if (isExpired) {
      console.log(isExpired);
      return (window.location.href = `${local}/admin/login`);
    }
  };

  useEffect(() => {
    verify();
  });

  return children;
}

export default PrivateRoutes;
