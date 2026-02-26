import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { User, UserRole } from "@/shared/types";
import api, { clearTokens, setTokensOnClient } from "@/react-app/api/axios";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  setUser: (user: User | null) => void;
  login: (tokens: { access: string; refresh: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<{ access: string; refresh: string } | null>(
    null
  );

  const role: UserRole | null = user?.role ?? null;

  const loadProfile = async () => {
    try {
      const response = await api.get<User>("accounts/profile/");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to load profile", error);
      setUser(null);
      setTokens(null);
      clearTokens();
    }
  };

  useEffect(() => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");
    if (access && refresh) {
      setTokens({ access, refresh });
      setTokensOnClient({ access, refresh });
      void loadProfile();
    }
  }, []);

  const login = async (newTokens: { access: string; refresh: string }) => {
    setTokens(newTokens);
    setTokensOnClient(newTokens);
    await loadProfile();
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    clearTokens();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setUser,
        isAuthenticated: !!user && !!tokens,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
