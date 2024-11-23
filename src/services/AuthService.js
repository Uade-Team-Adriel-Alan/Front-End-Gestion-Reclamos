import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export const log = {
  login: async (email, password) => {
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAClP2wOFP9rTPUACBdU_rSyQgpPccji_Y',
        {
          email, // Corregido: enviar email y password en el cuerpo
          password,
          returnSecureToken: true, // Firebase requiere este parámetro
        }
      );
      return response.data.idToken; // Devuelve el token recibido
    } catch (error) {
      throw error.response ? error.response.data : error; // Maneja errores
    }
  },
};

export const token = {
  login: async (idToken) => {
    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${idToken}`, // Incluye el token como header
        },
      });
      return response.data; // Retorna los datos de la respuesta
    } catch (error) {
      throw error.response ? error.response.data : error; // Maneja errores
    }
  },
};

export const auth = {
  logout: () => {
    // Eliminar el token almacenado en localStorage
    localStorage.removeItem('auth');
    // Redirigir a la página de login
    window.location.href = '/login';  // Esto redirige a login
  },
};

export const getUser = {
  getUsuarioByDocumento: async (documento) => {
    try {
      const response = await axios.get(`${API_URL}/${documento}`);
      return response.data; // Retorna los datos del usuario
    } catch (error) {
      throw error.response ? error.response.data : error; // Maneja errores
    }
  },
};

export const createUser = {
  registerUser: async (documento, rol) => {
    try {
      const response = await axios.post(`${API_URL}/register`, null, {
        params: { documento, rol }, // Enviar parámetros como query string
      });
      return response.data; // Retorna el mensaje de éxito
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error.response ? error.response.data : error; // Maneja errores
    }
  },
};

export const deleteUser = {
  eliminarUsuario: async (mail) => {
    try {
      // Realizar la solicitud DELETE con el parámetro en la query string
      const response = await axios.delete(`${API_URL}/eliminar`, {
        params: { mail }, // Enviar el mail como parámetro
      });
      return response.data; // Retorna el mensaje de éxito
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw error.response ? error.response.data : error; // Manejo de errores
    }
  },
};



