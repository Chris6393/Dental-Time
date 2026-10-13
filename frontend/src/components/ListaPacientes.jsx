import { useEffect, useState } from 'react';
import { obtenerPacientes, eliminarPaciente } from '../services/pacientesService';
import { Link } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

function ListaPacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const cargarPacientes = async () => {
            const datos = await obtenerPacientes();
            setPacientes(datos);
        };

        cargarPacientes();
    }, []);

    const confirmarEliminacion = async () => {
        try {
            await eliminarPaciente(pacienteSeleccionado.dni);

            setPacientes((prevPacientes) =>
                prevPacientes.filter(
                    (p) => p.dni !== pacienteSeleccionado.dni
                )
            );

            setMensaje('Paciente eliminado correctamente');
            setMostrarModal(false);
            setPacienteSeleccionado(null);

        } catch (error) {
            console.error('Error al eliminar paciente:', error);
            setMostrarModal(false);
            setPacienteSeleccionado(null);
        }
    };

    return (
        <main className="pacientes">
            <h1 className="pacientes__titulo">Lista de pacientes</h1>

            <div className="pacientes__tabla-contenedor">
                <table className="pacientes__tabla">
                    <thead className="pacientes__cabecera">
                        <tr>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Edad</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pacientes.map((paciente) => (
                            <tr
                                className="pacientes__fila"
                                key={paciente.dni}
                            >
                                <td className="pacientes__celda">
                                    {paciente.dni}
                                </td>
                                <td className="pacientes__celda">
                                    {paciente.nombre}
                                </td>
                                <td className="pacientes__celda">
                                    {paciente.apellidos}
                                </td>
                                <td className="pacientes__celda">
                                    {paciente.edad}
                                </td>
                                <td className="pacientes__celda">
                                    {paciente.telefono}
                                </td>
                                <td className="pacientes__celda">
                                    {paciente.email}
                                </td>

                                <td className="pacientes__acciones">
                                    <Link
                                        className="pacientes__boton pacientes__boton--editar"
                                        to={`/pacientes/editar/${paciente.dni}`}
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        className="pacientes__boton pacientes__boton--eliminar"
                                        onClick={() => {
                                            setPacienteSeleccionado(paciente);
                                            setMostrarModal(true);
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {mensaje && (
                <p className="formulario__mensaje">
                    {mensaje}
                </p>
            )}

            {mostrarModal && pacienteSeleccionado && (
                <ConfirmModal
                    titulo="¿Eliminar paciente?"
                    textoCancelar="Cancelar"
                    textoConfirmar="Eliminar paciente"
                    onCancelar={() => {
                        setMostrarModal(false);
                        setPacienteSeleccionado(null);
                    }}
                    onConfirmar={confirmarEliminacion}
                >
                    <p>
                        ¿Estás seguro de que quieres eliminar a{' '}
                        <strong>
                            {pacienteSeleccionado.nombre}{' '}
                            {pacienteSeleccionado.apellidos}
                        </strong>?
                    </p>

                    <p>
                        <strong>DNI:</strong> {pacienteSeleccionado.dni}
                    </p>

                    <p>
                        Esta acción no se puede deshacer.
                    </p>
                </ConfirmModal>
            )}

        </main>
    );
}

export default ListaPacientes;