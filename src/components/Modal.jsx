import React from 'react';

const Modal = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onCancel}>&times;</span>
          <p>{message}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={onConfirm} className="create">Confirmar</button>
            <button onClick={onCancel} className="cancel">Cancelar</button>
          </div>
        </div>
      </div>
    );
  };
 

export default Modal;