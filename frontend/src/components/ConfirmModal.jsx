function ConfirmModal({
    titulo,
    textoCancelar,
    textoConfirmar,
    onCancelar,
    onConfirmar,
    children
}) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="modal__titulo">{titulo}</h2>

                <div className="modal__contenido">
                    {children}
                </div>

                <div className="modal__acciones">
                    <button
                        className="modal__boton modal__boton--cancelar"
                        onClick={onCancelar}
                    >
                        {textoCancelar}
                    </button>

                    <button
                        className="modal__boton modal__boton--confirmar"
                        onClick={onConfirmar}
                    >
                        {textoConfirmar}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;