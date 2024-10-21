import React, { useEffect, useState } from 'react';
import { createPost, updatePost} from '../api';

const PostForm = ({ setPosts, setNotification, setModalOpen, currentPost, setCurrentPost }) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if(currentPost) {
            setTitle(currentPost.title);
        } else {
            setTitle('');
        }
    }, [currentPost]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentPost) {
            const updatedPost = await updatePost(currentPost.id, { title });
            setPosts((prev) => prev.map(post => (post.id === updatePost.id ? updatedPost : post)));
            setNotification('Post updated successfully');
        } else {
            const newPost = await createPost({ title });
            setPosts((prev) => [newPost,...prev]);
            setNotification('Post created successfully');
        }
        setModalOpen(true);
        setCurrentPost(null);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
             type="text" 
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             placeholder="Post title"
             required
             />
             <button className='create' type='submit'>{currentPost ? 'Update Post' : 'Create Post'}</button>
        </form>
    );
};

export default PostForm; 
