import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();

  // Verifica si hay un token o si el auth está vacío
  if (!auth || !localStorage.getItem("auth")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
