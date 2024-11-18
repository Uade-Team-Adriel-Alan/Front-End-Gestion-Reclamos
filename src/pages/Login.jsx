import React, { useState } from "react";
import { log, token } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
  
    try {
      const idToken = await log.login(email, password);
      const userData = await token.login(idToken);
      login({ ...userData, token: idToken });  // Guarda el usuario en el contexto
  
      // Guarda los datos en el localStorage
      localStorage.setItem("auth", JSON.stringify({ ...userData, token: idToken }));
  
      if (userData.rol === "admin") {
        navigate("/");
      } else {
        navigate("/personas/" + userData.documento);
      }
    } catch (error) {
      setErrorMessage(error.message || "Error al iniciar sesión");
    }
  };
  

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Login;
