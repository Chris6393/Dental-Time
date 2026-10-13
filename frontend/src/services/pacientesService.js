import axios from 'axios';

const API_URL = 'http://localhost:3000/pacientes';

export const obtenerPacientes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const obtenerPacientePorDni = async (dni) => {
    const response = await axios.get(`${API_URL}/${dni}`);
    return response.data;
};

export const crearPaciente = async (paciente) => {
    const response = await axios.post(API_URL, paciente);
    return response.data;
};

export const actualizarPaciente = async (dni, paciente) => {
    const response = await axios.put(`${API_URL}/${dni}`, paciente);
    return response.data;
};

export const eliminarPaciente = async (dni) => {
    const response = await axios.delete(`${API_URL}/${dni}`);
    return response.data;
};