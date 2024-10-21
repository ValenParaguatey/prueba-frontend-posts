import React, { useState, useEffect } from 'react';

const ModalForm = ({ post, onCreate, onUpdate, onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, body };
    if (post) {
      const updatedPost = { ...post, title, body }; 
      onUpdate(updatedPost);
    } else {
      const createdPost = { id: Date.now(), title, body }; 
      onCreate(createdPost);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{post ? 'Editar Post' : 'Crear Nuevo Post'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contenido:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" className="create">{post ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={onClose} className="cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
