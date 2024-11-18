import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedUser = localStorage.getItem("auth");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (user) => {
    setAuth(user);
    localStorage.setItem("auth", JSON.stringify(user));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
