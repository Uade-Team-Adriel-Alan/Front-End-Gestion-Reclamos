import axios from 'axios';

const API_URL = 'http://localhost:8080/api/personas'; // Asegúrate de que esta URL sea correcta

const PersonaService = {
  // Agregar una nueva persona
  agregarPersona: async (documento, nombre) => {
    try {
      const response = await axios.post(API_URL, null, {
        params: { documento, nombre },
      });
      return response.data;
    } catch (error) {
      console.error('Error al agregar la persona:', error);
      throw error;
    }
  },

  // Obtener todas las personas
  getAllPersonas: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las personas:', error);
      throw error;
    }
  },

  // Obtener persona por documento
  getPersonaByDocumento: async (documento) => {
    try {
      const response = await axios.get(`${API_URL}/${documento}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la persona con documento ${documento}:`, error);
      throw error;
    }
  },

  // Obtener reclamos de una persona por documento
  getReclamosByDocumento: async (documento) => {
    try {
      const response = await axios.get(`${API_URL}/${documento}/reclamos`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener los reclamos de la persona con documento ${documento}:`, error);
      throw error;
    }
  },
};

export default PersonaService;