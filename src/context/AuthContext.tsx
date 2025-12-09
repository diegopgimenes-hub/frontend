// 📄 src/context/AuthContext.tsx
import {
  CurrentUser,
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
} from "@/api/authService";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: CurrentUser | null;
  loading: boolean;
  login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  // inicializa com o usuário logado (se houver token válido)
  useEffect(() => {
    (async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (_err) {
        console.warn("Nenhum usuário autenticado.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (username: string, password: string, rememberMe: boolean) => {
    try {
      await loginApi({ username: username, password: password });

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
};
