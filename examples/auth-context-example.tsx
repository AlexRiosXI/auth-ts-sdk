import React from 'react';
import { AuthProvider, useAuth } from '../src/hooks/useAuth';

// Componente que usa el contexto de autenticación
const UserProfile = () => {
    const { currentUser, currentUserLoading, currentUserError, getCurrentUser } = useAuth();

    if (currentUserLoading) {
        return <div>Cargando usuario...</div>;
    }

    if (currentUserError) {
        return <div>Error: {currentUserError.message}</div>;
    }

    if (!currentUser) {
        return <div>No hay usuario autenticado</div>;
    }

    return (
        <div>
            <h2>Perfil de Usuario</h2>
            <p>ID: {currentUser.user_id}</p>
            <p>Nombre: {currentUser.name}</p>
            <button onClick={getCurrentUser}>Actualizar usuario</button>
        </div>
    );
};

// Componente principal que envuelve la aplicación con el AuthProvider
const App = () => {
    return (
        <AuthProvider>
            <div>
                <h1>Mi Aplicación</h1>
                <UserProfile />
            </div>
        </AuthProvider>
    );
};

export default App; 