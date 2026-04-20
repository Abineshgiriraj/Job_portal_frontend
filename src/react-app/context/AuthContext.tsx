import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { User, UserRole } from "@/shared/types";
import api, { clearTokens, setTokensOnClient, isApiError } from "@/react-app/api/axios";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  setUser: (user: User | null) => void;
  login: (tokens: { access: string; refresh: string }) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<{ access: string; refresh: string } | null>(
    null
  );

  const role: UserRole | null = user?.role ?? null;

  const loadProfile = async () => {
    const access = localStorage.getItem("access");
    if (!access) {
      logout();
      return;
    }

    try {
      const response = await api.get<User>("accounts/profile/");
      setUser(response.data);
    } catch (error) {
      if (isApiError(error) && error.response?.status === 401) {
        await refreshToken();
      } else {
        console.error("Failed to load profile", error);
        logout();
      }
    }
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      logout();
      return;
    }

    try {
      const response = await api.post<{ access: string }>("token/refresh/", {
        refresh,
      });
      const newTokens = { access: response.data.access, refresh };
      setTokens(newTokens);
      setTokensOnClient(newTokens);
      await loadProfile(); // Retry loading profile with new token
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
    }
  };

  const refreshProfile = async () => {
    await loadProfile();
  };

  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
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
        refreshProfile,
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
