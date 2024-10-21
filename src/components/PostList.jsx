import React, { useState, useEffect } from 'react';
import Modal from './Modal'; 
import ModalForm from './ModalForm'; 
import { fetchPosts, deletePost } from '../api'; 


const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [notification, setNotification] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts(currentPage, postsPerPage);
      setPosts(data);
    };

    loadPosts();
  }, [currentPage]);

  const handleDelete = async () => {
    if (currentPost) {
      await deletePost(currentPost.id);
      setPosts(posts.filter(post => post.id !== currentPost.id));
      setNotification('Post deleted successfully!');
      setNotificationOpen(true);
      setDeleteModalOpen(false);
      setCurrentPost(null);
      setTimeout(() => setNotificationOpen(false), 3000);
    }
  };

  const handleEditClick = (post) => {
    setCurrentPost(post);
    setFormModalOpen(true);
  };

  const handleCreatePost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setNotification('Post created successfully!');
    setNotificationOpen(true);
    setFormModalOpen(false);
    setTimeout(() => setNotificationOpen(false), 3000);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts((prev) => prev.map(post => (post.id === updatedPost.id ? updatedPost : post)));
    setNotification('Post updated successfully!');
    setNotificationOpen(true);
    setFormModalOpen(false);
    setCurrentPost(null);
    setTimeout(() => setNotificationOpen(false), 3000);
  };

  return (
    <div className="post-list-container">
      <h1>Posts del día</h1>
      <button className="create-post-btn" onClick={() => { setCurrentPost(null); setFormModalOpen(true); }}>
        Crear Nuevo Post
      </button>
      <table className="posts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td className="action-buttons">
                <button className="edit" onClick={() => handleEditClick(post)}>Edit</button>
                <button className="delete" onClick={() => { setCurrentPost(post); setDeleteModalOpen(true); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage}</span>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>Siguiente</button>
      </div>

      {/* Modales */}
      {isNotificationOpen && <Modal message={notification} setModalOpen={setNotificationOpen} />}
      {isDeleteModalOpen && (
        <Modal
          message={`¿Está seguro de que desea eliminar el post "${currentPost?.title}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteModalOpen(false)}
        />
      )}
      {isFormModalOpen && (
        <ModalForm
          post={currentPost}
          onCreate={handleCreatePost}
          onUpdate={handleUpdatePost}
          onClose={() => setFormModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PostList;
