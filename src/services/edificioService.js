import axios from 'axios';

const API_URL = 'http://localhost:8080/api/edificios'; // Cambia el puerto si tu backend usa otro

export const getAllEdificios = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los edificios:", error);
    throw error;
  }
};
