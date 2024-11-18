import React, { useState } from 'react';
import { log, token } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      // Obtiene el idToken de Firebase
      const idToken = await log.login(email, password);
      
      // Llama al endpoint de backend para obtener datos del usuario
      const userData = await token.login(idToken);
      console.log('Usuario autenticado:', userData);

      // Redirección basada en el rol
      if (userData.rol == 'admin') {
        navigate('/'); // Página principal
      } else {
        navigate('/Reclamos'); // Página de reclamos
      }
    } catch (error) {
      setErrorMessage(error.error?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            Tu información no será compartida
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
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
