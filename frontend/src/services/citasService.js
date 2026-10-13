import axios from 'axios';

const API_URL = 'http://localhost:3000/citas';

export const obtenerCitas = async () => {
    const respuesta = await axios.get(API_URL);
    return respuesta.data;
};

export const obtenerCitaPorId = async (id) => {
    const respuesta = await axios.get(`${API_URL}/${id}`);
    return respuesta.data;
};

export const crearCita = async (cita) => {
    const respuesta = await axios.post(API_URL, cita);
    return respuesta.data;
};

export const actualizarCita = async (id, cita) => {
    const respuesta = await axios.put(`${API_URL}/${id}`, cita);
    return respuesta.data;
};

export const eliminarCita = async (id) => {
    const respuesta = await axios.delete(`${API_URL}/${id}`);
    return respuesta.data;
};