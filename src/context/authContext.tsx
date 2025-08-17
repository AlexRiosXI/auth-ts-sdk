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
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// Props del Provider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    data: currentUser,
    isLoading: currentUserLoading,
    error: currentUserError,
    query: getCurrentUser,
  } = useRequest<CurrentUser>(getCurrentUserMutation, null); // <- tipa la respuesta de la query

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getCurrentUser();
      if (res?.data?.access_token) {
        sessionStorage.setItem("sm-access-token", res.data.access_token);
      }
    };

    fetchUser();
  }, []);

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
