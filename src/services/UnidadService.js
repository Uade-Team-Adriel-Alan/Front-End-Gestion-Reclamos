import axios from 'axios';

const API_URL = 'http://localhost:8080/api/unidades'; // Base URL del controlador

const UnidadService = {
  obtenerUnidad: async (codigo, piso, numero) => {
    const response = await axios.get(`${API_URL}`, {
      params: { codigo, piso, numero },
    });
    return response.data;
  },

  obtenerDueniosPorUnidad: async (codigo, piso, numero) => {
    const response = await axios.get(`${API_URL}/dueniosPorUnidad`, {
      params: { codigo, piso, numero },
    });
    return response.data;
  },

  obtenerInquilinosPorUnidad: async (codigo, piso, numero) => {
    const response = await axios.get(`${API_URL}/inquilinosPorUnidad`, {
      params: { codigo, piso, numero },
    });
    return response.data;
  },

  obtenerHabitantesPorUnidad: async (codigo, piso, numero) => {
    const response = await axios.get(`${API_URL}/habitantesPorUnidad`, {
      params: { codigo, piso, numero },
    });
    return response.data;
  },

  agregarDuenioUnidad: async (codigo, piso, numero, documento) => {
    const response = await axios.post(`${API_URL}/agregarDuenio`, null, {
      params: { codigo, piso, numero, documento },
    });
    return response.data;
  },

  transferirUnidad: async (codigo, piso, numero, documento) => {
    const response = await axios.post(`${API_URL}/nuevoDuenio`, null, {
      params: { codigo, piso, numero, documento },
    });
    return response.data;
  },

  agregarInquilinoUnidad: async (codigo, piso, numero, documento) => {
    const response = await axios.post(`${API_URL}/agregarInquilino`, null, {
      params: { codigo, piso, numero, documento },
    });
    return response.data;
  },

  agregarHabitanteUnidad: async (codigo, piso, numero, documento) => {
    const response = await axios.post(`${API_URL}/agregarHabitante`, null, {
      params: { codigo, piso, numero, documento },
    });
    return response.data;
  },

  liberarUnidad: async (codigo, piso, numero) => {
    const response = await axios.delete(`${API_URL}/liberar`, {
      params: { codigo, piso, numero },
    });
    return response.data;
  },

  agregarUnidad: async (codigo, piso, numero) => {
    const response = await axios.post(`${API_URL}/agregar`, null, {
      params: { codigo, piso, numero },
    });
    return response.data;
  },

  eliminarHabitanteUnidad: async (codigo, piso, numero, documento) => {
    const response = await axios.delete(`${API_URL}/eliminarHabitante`, {
      params: { codigo, piso, numero, documento },
    });
    return response.data;
  },

  eliminarInquilinoUnidad: async (codigo, piso, numero, documento) => {
    const response = await axios.delete(`${API_URL}/eliminarInquilino`, {
      params: { codigo, piso, numero, documento },
    });
    return response.data;
  },

  eliminarDuenioUnidad: async (codigo, piso, numero, documento) => {
    const response = await axios.delete(`${API_URL}/eliminarDuenio`, {
      params: { codigo, piso, numero, documento },
    });
    return response.data;
  },
};

export default UnidadService;
