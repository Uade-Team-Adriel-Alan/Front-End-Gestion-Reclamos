import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reclamos'; // Base URL del controlador

const ReclamoService = {
  obtenerReclamos: async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  },

  obtenerReclamosPorEdificio: async (codigo) => {
    const response = await axios.get(`${API_URL}/edificio/${codigo}`);
    return response.data;
  },

  obtenerReclamosPorUnidad: async (id) => {
    const response = await axios.get(`${API_URL}/unidad/${id}`);
    return response.data;
  },

  obtenerReclamoPorNumero: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    const reclamo = response.data;
    return Array.isArray(reclamo) ? reclamo : [reclamo]; // Devuelve un arreglo siempre
  },
  

  obtenerReclamosPorPersona: async (documento) => {
    const response = await axios.get(`${API_URL}/persona/${documento}`);
    return response.data;
  },

  agregarReclamo: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/agregar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Asegúrate de establecer el encabezado adecuado
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  agregarReclamoZonaComun: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/agregarZonaComun`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Especificar que estamos enviando datos de formulario
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  

  cambiarEstado: async (idReclamo, idEstado) => {
    try {
      const response = await axios.put(`${API_URL}/cambiarEstado`, null, {
        params: { idReclamo, idEstado },
      });
      return response.data;
    } catch (error) {
      console.error('Error en cambiarEstado:', error.response || error);
      throw new Error('Hubo un problema al cambiar el estado del reclamo.');
    }
  },
  

  contarReclamosPorEstado: async (idEstado) => {
    const response = await axios.get(`${API_URL}/estado/${idEstado}/contar`);
    return response.data;
  },

  obtenerReclamosPorEstado: async (idEstado) => {
    const response = await axios.get(`${API_URL}/estado/${idEstado}`);
    return response.data;
  },

  obtenerReclamosPorTipo: async (tipo) => {
    const response = await axios.get(`${API_URL}/tipo/${tipo}`);
    return response.data;
  },

};

export default ReclamoService;
