import { useEffect, useState } from 'react';
import { obtenerCitas, eliminarCita } from '../services/citasService';
import { Link } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

function ListaCitas() {
    const [citas, setCitas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarCitas = async () => {
            const datos = await obtenerCitas();
            setCitas(datos);
        };

        cargarCitas();
    }, []);

    const confirmarEliminacion = async () => {
        try {
            await eliminarCita(citaSeleccionada.id);

            setCitas((prevCitas) =>
                prevCitas.filter(
                    (cita) => cita.id !== citaSeleccionada.id
                )
            );

            setMensaje('Cita eliminada correctamente');
            setError('');
            setMostrarModal(false);
            setCitaSeleccionada(null);

        } catch (error) {
            console.error('Error al eliminar la cita:', error);

            setError('No se ha podido eliminar la cita');
            setMensaje('');
            setMostrarModal(false);
            setCitaSeleccionada(null);
        }
    };

    return (
        <section className="citas">
            <h1 className="citas__titulo">Citas</h1>

            <Link to="/citas/crear" className="citas__boton citas__boton--crear">
                Crear cita
            </Link>

            <div className="citas__lista">
                {citas.map((cita) => (
                    <article className="citas__tarjeta" key={cita.id}>
                        <h2 className="citas__paciente">
                            {cita.nombre} {cita.apellidos}
                        </h2>

                        <p>
                            <strong>Fecha:</strong> {cita.fecha}
                        </p>

                        <p>
                            <strong>Hora:</strong> {cita.hora.slice(0, 5)}
                        </p>

                        <p>
                            <strong>Motivo:</strong> {cita.motivo}
                        </p>

                        <p>
                            <strong>Estado:</strong>{' '}
                            <span className={`citas__estado citas__estado--${cita.estado.toLowerCase()}`}>
                                {cita.estado}
                            </span>
                        </p>

                        <div className="citas__acciones">
                            <Link
                                to={`/citas/editar/${cita.id}`}
                                className="citas__boton citas__boton--editar"
                            >
                                Editar
                            </Link>

                            <button
                                className="citas__boton citas__boton--eliminar"
                                onClick={() => {
                                    setCitaSeleccionada(cita);
                                    setMostrarModal(true);
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </article>
                ))}
            </div>

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

            {mostrarModal && citaSeleccionada && (
                <ConfirmModal
                    titulo="¿Eliminar cita?"
                    textoCancelar="Cancelar"
                    textoConfirmar="Eliminar cita"
                    onCancelar={() => {
                        setMostrarModal(false);
                        setCitaSeleccionada(null);
                    }}
                    onConfirmar={confirmarEliminacion}
                >
                    <p>
                        ¿Estás seguro de que quieres eliminar esta cita?
                    </p>

                    <p>
                        <strong>Paciente:</strong>{' '}
                        {citaSeleccionada.nombre}{' '}
                        {citaSeleccionada.apellidos}
                    </p>

                    <p>
                        <strong>Fecha:</strong>{' '}
                        {citaSeleccionada.fecha}
                    </p>

                    <p>
                        <strong>Hora:</strong>{' '}
                        {citaSeleccionada.hora.slice(0, 5)}
                    </p>

                    <p>
                        <strong>Motivo:</strong>{' '}
                        {citaSeleccionada.motivo}
                    </p>

                    <p>
                        Esta acción no se puede deshacer.
                    </p>
                </ConfirmModal>
            )}
        </section>
    );
}

export default ListaCitas;