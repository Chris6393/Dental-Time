import { useEffect, useState } from 'react';
import { obtenerPacientes } from '../services/pacientesService';
import { crearCita } from '../services/citasService';
import ConfirmModal from './ConfirmModal';

function CrearCita() {
    const [pacientes, setPacientes] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);

    const [formulario, setFormulario] = useState({
        paciente_id: '',
        fecha: '',
        hora: '',
        motivo: '',
        observaciones: '',
        estado: 'Pendiente'
    });

    useEffect(() => {
        const cargarPacientes = async () => {
            const datos = await obtenerPacientes();
            setPacientes(datos);
        };

        cargarPacientes();
    }, []);

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setMostrarModal(true);
    };

    const formatearFecha = (fecha) => {
        const [anio, mes, dia] = fecha.split('-');
        return `${dia}-${mes}-${anio}`;
    };

    const confirmarCreacion = async () => {
        try {
            await crearCita(formulario);

            setMensaje('Cita creada correctamente');
            setError('');
            setMostrarModal(false);

            setFormulario({
                paciente_id: '',
                fecha: '',
                hora: '',
                motivo: '',
                observaciones: '',
                estado: 'Pendiente'
            });

        } catch (error) {
            console.error('Error al crear la cita:', error);

            setError('No se ha podido crear la cita');
            setMensaje('');
            setMostrarModal(false);
        }
    };

    const pacienteSeleccionado = pacientes.find(
        (paciente) => paciente.id === Number(formulario.paciente_id)
    );

    return (
        <section className="formulario">
            <h1 className="formulario__titulo">
                Crear cita
            </h1>

            <form className="formulario__form" onSubmit={handleSubmit}>
                <div className="formulario__grupo">
                    <label
                        className="formulario__label"
                        htmlFor="paciente_id"
                    >
                        Paciente
                    </label>

                    <select
                        className="formulario__input"
                        id="paciente_id"
                        name="paciente_id"
                        value={formulario.paciente_id}
                        onChange={handleChange}
                    >
                        <option value="">
                            Selecciona un paciente
                        </option>

                        {pacientes.map((paciente) => (
                            <option
                                key={paciente.id}
                                value={paciente.id}
                            >
                                {paciente.nombre} {paciente.apellidos}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="formulario__grupo">
                    <label
                        className="formulario__label"
                        htmlFor="fecha"
                    >
                        Fecha
                    </label>

                    <input
                        className="formulario__input"
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formulario.fecha}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario__grupo">
                    <label
                        className="formulario__label"
                        htmlFor="hora"
                    >
                        Hora
                    </label>

                    <input
                        className="formulario__input"
                        type="time"
                        id="hora"
                        name="hora"
                        value={formulario.hora}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario__grupo">
                    <label
                        className="formulario__label"
                        htmlFor="motivo"
                    >
                        Motivo
                    </label>

                    <input
                        className="formulario__input"
                        type="text"
                        id="motivo"
                        name="motivo"
                        value={formulario.motivo}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario__grupo">
                    <label
                        className="formulario__label"
                        htmlFor="observaciones"
                    >
                        Observaciones
                    </label>

                    <input
                        className="formulario__input"
                        type="text"
                        id="observaciones"
                        name="observaciones"
                        value={formulario.observaciones}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario__grupo">
                    <label
                        className="formulario__label"
                        htmlFor="estado"
                    >
                        Estado
                    </label>

                    <select
                        className="formulario__input"
                        id="estado"
                        name="estado"
                        value={formulario.estado}
                        onChange={handleChange}
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Confirmada">Confirmada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>

                <div className="formulario__acciones">
                    <button
                        className="formulario__boton formulario__boton--principal"
                        type="submit"
                    >
                        Crear cita
                    </button>
                </div>
            </form>

            {mensaje && (
                <p className="formulario__mensaje">
                    {mensaje}
                </p>
            )}

            {error && (
                <p className="formulario__error">
                    {error}
                </p>
            )}

            {mostrarModal && (
                <ConfirmModal
                    titulo="Confirmar creación"
                    textoCancelar="Cancelar"
                    textoConfirmar="Crear cita"
                    onCancelar={() => setMostrarModal(false)}
                    onConfirmar={confirmarCreacion}
                >
                    <p>
                        <strong>Paciente:</strong>{' '}
                        {pacienteSeleccionado?.nombre}{' '}
                        {pacienteSeleccionado?.apellidos}
                    </p>

                    <p>
                        <strong>Fecha:</strong>{' '}
                        {formatearFecha(formulario.fecha)}
                    </p>

                    <p>
                        <strong>Hora:</strong>{' '}
                        {formulario.hora}
                    </p>

                    <p>
                        <strong>Motivo:</strong>{' '}
                        {formulario.motivo}
                    </p>

                    <p>
                        <strong>Observaciones:</strong>{' '}
                        {formulario.observaciones || 'Sin observaciones'}
                    </p>

                    <p>
                        <strong>Estado:</strong>{' '}
                        {formulario.estado}
                    </p>
                </ConfirmModal>
            )}
        </section>
    );
}

export default CrearCita;