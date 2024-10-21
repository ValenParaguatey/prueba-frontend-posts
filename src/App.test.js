import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostList from './components/PostList'; 
import * as api from './api'; 

// Mock API 
jest.mock('./api');

describe('PostList Component', () => {
    beforeEach(() => {
        
        jest.clearAllMocks();
    });

    test('should render posts and handle pagination', async () => {
        // Mocking fetchPosts
        api.fetchPosts.mockResolvedValueOnce([
            { id: 1, title: 'Post 1', body: 'Content 1' },
            { id: 2, title: 'Post 2', body: 'Content 2' },
        ]);

        render(<PostList />);

        await waitFor(() => {
            expect(screen.getByText('Posts')).toBeInTheDocument();
            expect(screen.getByText('Post 1')).toBeInTheDocument();
            expect(screen.getByText('Post 2')).toBeInTheDocument();
        });

        expect(screen.getByText('Página 1')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Siguiente'));
        
    });

    test('should create a new post', async () => {
        api.fetchPosts.mockResolvedValueOnce([]); 
        api.createPost.mockResolvedValueOnce({ id: 3, title: 'New Post', body: 'New Content' });

        render(<PostList />);

        // Se simula la creación de un nuevo post
        fireEvent.click(screen.getByText('Crear Nuevo Post'));

        const input = screen.getByPlaceholderText('Post title');
        fireEvent.change(input, { target: { value: 'New Post' } });

        fireEvent.click(screen.getByText('Create Post'));

        // Se espera a que el nuevo post sea renderizado
        await waitFor(() => {
            expect(screen.getByText('New Post')).toBeInTheDocument();
            expect(screen.getByText('Post created successfully!')).toBeInTheDocument();
        });
    });

    test('should edit an existing post', async () => {
        api.fetchPosts.mockResolvedValueOnce([
            { id: 1, title: 'Post 1', body: 'Content 1' },
        ]);
        api.updatePost.mockResolvedValueOnce({ id: 1, title: 'Updated Post', body: 'Updated Content' });

        render(<PostList />);

        // Prueba para simular la edición de un post
        fireEvent.click(screen.getByText('Edit'));

        const input = screen.getByPlaceholderText('Post title');
        fireEvent.change(input, { target: { value: 'Updated Post' } });

        fireEvent.click(screen.getByText('Update Post'));

        // Esperar a que el post editado sea renderizado
        await waitFor(() => {
            expect(screen.getByText('Updated Post')).toBeInTheDocument();
            expect(screen.getByText('Post updated successfully!')).toBeInTheDocument();
        });
    });

    test('should delete a post', async () => {
        api.fetchPosts.mockResolvedValueOnce([
            { id: 1, title: 'Post 1', body: 'Content 1' },
        ]);
        api.deletePost.mockResolvedValueOnce({});

        render(<PostList />);

        // Prueba para simular la eliminación de un post
        fireEvent.click(screen.getByText('Delete'));

        // Confirmar  eliminación
        fireEvent.click(screen.getByText('Sí')); 

        // Esperar a que el post sea eliminado
        await waitFor(() => {
            expect(screen.queryByText('Post 1')).not.toBeInTheDocument();
            expect(screen.getByText('Post deleted successfully!')).toBeInTheDocument();
        });
    });

    test('should show notification', async () => {
        api.fetchPosts.mockResolvedValueOnce([]);
        render(<PostList />);

        // Prueba para simular creación de post para activar la notificación
        api.createPost.mockResolvedValueOnce({ id: 1, title: 'New Post', body: 'New Content' });
        fireEvent.click(screen.getByText('Crear Nuevo Post'));
        fireEvent.change(screen.getByPlaceholderText('Post title'), { target: { value: 'New Post' } });
        fireEvent.click(screen.getByText('Create Post'));

        await waitFor(() => {
            expect(screen.getByText('Post created successfully!')).toBeInTheDocument();
        });

        jest.useFakeTimers();
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            expect(screen.queryByText('Post created successfully!')).not.toBeInTheDocument();
        });
    });
});
