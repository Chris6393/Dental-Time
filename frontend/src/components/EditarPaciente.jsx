import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerPacientePorDni, actualizarPaciente } from '../services/pacientesService';
import ConfirmModal from './ConfirmModal';

function EditarPaciente() {
    const { dni } = useParams();
    const [paciente, setPaciente] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);

    const [formulario, setFormulario] = useState({
        dni: '',
        nombre: '',
        apellidos: '',
        edad: '',
        telefono: '',
        email: ''
    });

    useEffect(() => {
        const cargarPaciente = async () => {
            const datos = await obtenerPacientePorDni(dni);
            setPaciente(datos);
            setFormulario(datos);
        };

        cargarPaciente();
    }, [dni]);

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
            await actualizarPaciente(dni, formulario);

            setMensaje('Paciente actualizado correctamente');
            setError('');
            setMostrarModal(false);
        } catch (error) {
            setError('No se ha podido actualizar el paciente');
            setMensaje('');
            setMostrarModal(false);
        }
    };

    return (
        <main className="formulario">
            <h1 className="formulario__titulo">Editar paciente</h1>

            {paciente && (
                <form className="formulario__form" onSubmit={handleSubmit}>
                    <div className="formulario__grupo">
                        <label className="formulario__label" htmlFor="dni">
                            DNI
                        </label>
                        <input
                            className="formulario__input"
                            id="dni"
                            type="text"
                            name="dni"
                            value={formulario.dni}
                            readOnly
                        />
                    </div>

                    <div className="formulario__grupo">
                        <label className="formulario__label" htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            className="formulario__input"
                            id="nombre"
                            type="text"
                            name="nombre"
                            value={formulario.nombre}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="formulario__grupo">
                        <label className="formulario__label" htmlFor="apellidos">
                            Apellidos
                        </label>
                        <input
                            className="formulario__input"
                            id="apellidos"
                            type="text"
                            name="apellidos"
                            value={formulario.apellidos}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="formulario__grupo">
                        <label className="formulario__label" htmlFor="edad">
                            Edad
                        </label>
                        <input
                            className="formulario__input"
                            id="edad"
                            type="number"
                            name="edad"
                            value={formulario.edad}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="formulario__grupo">
                        <label className="formulario__label" htmlFor="telefono">
                            Teléfono
                        </label>
                        <input
                            className="formulario__input"
                            id="telefono"
                            type="text"
                            name="telefono"
                            value={formulario.telefono}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="formulario__grupo">
                        <label className="formulario__label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="formulario__input"
                            id="email"
                            type="email"
                            name="email"
                            value={formulario.email}
                            onChange={handleChange}
                        />
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
            )}

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
                    <p><strong>DNI:</strong> {formulario.dni}</p>
                    <p><strong>Nombre:</strong> {formulario.nombre}</p>
                    <p><strong>Apellidos:</strong> {formulario.apellidos}</p>
                    <p><strong>Edad:</strong> {formulario.edad}</p>
                    <p><strong>Teléfono:</strong> {formulario.telefono}</p>
                    <p><strong>Email:</strong> {formulario.email}</p>
                </ConfirmModal>
            )}

        </main>
    );
}

export default EditarPaciente;