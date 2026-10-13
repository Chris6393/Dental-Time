import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerCitaPorId, actualizarCita } from '../services/citasService';
import ConfirmModal from './ConfirmModal';

function EditarCita() {
    const { id } = useParams();

    const [cita, setCita] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const [formulario, setFormulario] = useState({
        paciente_id: '',
        fecha: '',
        hora: '',
        motivo: '',
        observaciones: '',
        estado: ''
    });

    const convertirFechaParaInput = (fecha) => {
        const [dia, mes, anio] = fecha.split('-');

        return `${anio}-${mes}-${dia}`;
    };

    useEffect(() => {
        const cargarCita = async () => {
            const datos = await obtenerCitaPorId(id);

            setCita(datos);

            setFormulario({
                paciente_id: datos.paciente_id,
                fecha: convertirFechaParaInput(datos.fecha),
                hora: datos.hora.slice(0, 5),
                motivo: datos.motivo,
                observaciones: datos.observaciones,
                estado: datos.estado
            });
        };

        cargarCita();
    }, [id]);

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

    const confirmarActualizacion = async () => {
        try {
            await actualizarCita(id, formulario);

            setMensaje('Cita actualizada correctamente');
            setError('');
            setMostrarModal(false);

        } catch (error) {
            console.error('Error al actualizar la cita:', error);

            setError('No se ha podido actualizar la cita');
            setMensaje('');
            setMostrarModal(false);
        }
    };

    const formatearFecha = (fecha) => {
        const [anio, mes, dia] = fecha.split('-');

        return `${dia}-${mes}-${anio}`;
    };

    if (!cita) {
        return <p>Cargando cita...</p>;
    }

    return (
        <section className="formulario">
            <h1 className="formulario__titulo">Editar cita</h1>

            <form
                className="formulario__form"
                onSubmit={handleSubmit}
            >
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
                        <option value="Completada">Completada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>

                <div className="formulario__acciones">
                    <button
                        className="formulario__boton formulario__boton--principal"
                        type="submit"
                    >
                        Guardar cambios
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
                    titulo="Confirmar cambios"
                    textoCancelar="Cancelar"
                    textoConfirmar="Guardar cambios"
                    onCancelar={() => setMostrarModal(false)}
                    onConfirmar={confirmarActualizacion}
                >
                    <p>
                        <strong>Paciente:</strong>{' '}
                        {cita.nombre} {cita.apellidos}
                    </p>

                    <p>
                        <strong>Fecha:</strong> {formatearFecha(formulario.fecha)}
                    </p>

                    <p>
                        <strong>Hora:</strong> {formulario.hora}
                    </p>

                    <p>
                        <strong>Motivo:</strong> {formulario.motivo}
                    </p>

                    <p>
                        <strong>Observaciones:</strong>{' '}
                        {formulario.observaciones || 'Sin observaciones'}
                    </p>

                    <p>
                        <strong>Estado:</strong> {formulario.estado}
                    </p>
                </ConfirmModal>
            )}
        </section>
    );
}

export default EditarCita;