import React, { createContext, useContext, ReactNode } from 'react';

// Tipos básicos para el contexto
interface AuthContextType {
  // Aquí irán las propiedades del contexto
}

// Crear el contexto vacío
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Props para el provider
interface AuthProviderProps {
  children: ReactNode;
}

// Componente Provider vacío
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Valor del contexto vacío
  const contextValue: AuthContextType = {
    // Aquí irán los valores del contexto
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
