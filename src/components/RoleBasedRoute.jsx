import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();

  // Verifica si el usuario tiene un rol permitido
  if (!auth || !allowedRoles.includes(auth.rol)) {
    return null; // No renderiza nada si no tiene permiso
  }

  return children; // Renderiza si tiene permiso
};

export default RoleBasedRoute;
