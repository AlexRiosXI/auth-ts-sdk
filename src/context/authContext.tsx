import { useRequest } from "@sierra-madre/core-ts-sdk";
import { createContext, useEffect, ReactNode } from "react";
import { getCurrentUserMutation } from "../generics/mutations";

// Define el tipo del usuario actual
type CurrentUser = {
  user_id: string;
  name: string;
};

// Define el tipo del contexto
export type AuthContextType = {
  currentUser: CurrentUser | null;
  currentUserLoading: boolean;
  currentUserError: unknown;
  getCurrentUser: () => void;
};

// Crea el contexto con tipo opcional (puede ser undefined si no está dentro del Provider)
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props del Provider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  console.log("AuthProvider")
  const {
    data: currentUser,
    isLoading: currentUserLoading,
    error: currentUserError,
    query: getCurrentUser,
  } = useRequest<CurrentUser>(getCurrentUserMutation); // <- tipa la respuesta de la query

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserLoading,
        currentUserError,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
