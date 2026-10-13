import { useState } from 'react';
import { crearPaciente } from '../services/pacientesService';
import ConfirmModal from './ConfirmModal';

function CrearPaciente() {
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

    const confirmarCreacion = async () => {
        try {
            await crearPaciente(formulario);

            setMensaje('Paciente creado correctamente');
            setError('');
            setMostrarModal(false);

            setFormulario({
                dni: '',
                nombre: '',
                apellidos: '',
                edad: '',
                telefono: '',
                email: ''
            });
        } catch (error) {
            setError('No se ha podido crear el paciente');
            setMensaje('');
            setMostrarModal(false);
        }
    };

    return (
        <main className="formulario">
            <h1 className="formulario__titulo">Crear paciente</h1>

            <form onSubmit={handleSubmit}>
                <div className="formulario__grupo">
                    <label className="formulario__label">DNI</label>
                    <input
                        className="formulario__input"
                        type="text"
                        name="dni"
                        value={formulario.dni}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario__grupo">
                    <label className="formulario__label">Nombre</label>
                    <input
                        className="formulario__input"
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario__grupo">
                    <label className="formulario__label">Apellidos</label>
                    <input
                        className="formulario__input"
                        type="text"
                        name="apellidos"
                        value={formulario.apellidos}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario__grupo">
                    <label className="formulario__label">Edad</label>
                    <input
                        className="formulario__input"
                        type="number"
                        name="edad"
                        value={formulario.edad}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario__grupo">
                    <label className="formulario__label">Teléfono</label>
                    <input
                        className="formulario__input"
                        type="text"
                        name="telefono"
                        value={formulario.telefono}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario__grupo">
                    <label className="formulario__label">Email</label>
                    <input
                        className="formulario__input"
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
                        Crear paciente
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
                    textoConfirmar="Confirmar"
                    onCancelar={() => setMostrarModal(false)}
                    onConfirmar={confirmarCreacion}
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

export default CrearPaciente;