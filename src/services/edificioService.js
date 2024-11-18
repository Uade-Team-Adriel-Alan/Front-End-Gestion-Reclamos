import axios from 'axios';

const API_URL = 'http://localhost:8080/api/edificios'; // Cambia el puerto si tu backend usa otro

// Obtener todos los edificios
export const getAllEdificios = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los edificios:', error);
        throw error;
    }
};

// Obtener edificio por código
export const getEdificioByCodigo = async (codigo) => {
    try {
        const response = await axios.get(`${API_URL}/${codigo}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el edificio con código ${codigo}:`, error);
        throw error;
    }
};

// Obtener habitantes por edificio
export const getHabitantesPorEdificio = async (codigo) => {
    try {
        const response = await axios.get(`${API_URL}/${codigo}/habitantes`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener habitantes del edificio con código ${codigo}:`, error);
        throw error;
    }
};

// Obtener dueños por edificio
export const getDueniosPorEdificio = async (codigo) => {
    try {
        const response = await axios.get(`${API_URL}/${codigo}/duenios`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener dueños del edificio con código ${codigo}:`, error);
        throw error;
    }
};

// Obtener inquilinos por edificio
export const getInquilinosPorEdificio = async (codigo) => {
    try {
        const response = await axios.get(`${API_URL}/${codigo}/inquilinos`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener inquilinos del edificio con código ${codigo}:`, error);
        throw error;
    }
};

// Obtener unidades por edificio
export const getUnidadesPorEdificio = async (codigo) => {
    try {
        const response = await axios.get(`${API_URL}/${codigo}/unidades`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener unidades del edificio con código ${codigo}:`, error);
        throw error;
    }
};

// Crear edificio
export const crearEdificio = async (direccion, nombre) => {
    try {
        const response = await axios.post(`${API_URL}/crear`, null, {
            params: { direccion, nombre },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el edificio:', error);
        throw error;
    }
};

// Obtener reclamos de zona común por edificio
export const getReclamosZonaComunPorEdificio = async (codigo) => {
    try {
        const response = await axios.get(`${API_URL}/${codigo}/reclamosZonaComun`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener reclamos de zona común del edificio con código ${codigo}:`, error);
        throw error;
    }
};

// Obtener reclamos por edificio
export const getReclamosPorEdificio = async (codigo) => {
    try {
        const response = await axios.get(`${API_URL}/${codigo}/reclamos`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener reclamos del edificio con código ${codigo}:`, error);
        throw error;
    }
};
