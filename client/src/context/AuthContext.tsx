import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { User, AuthState, LoginResponse } from "@/types/auth";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "auth_state";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedState
      ? JSON.parse(storedState)
      : {
          user: null,
          token: null,
          isAuthenticated: false,
        };
  });

  // Update localStorage whenever auth state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authState));

    // Update axios default headers when token changes
    if (authState.token) {
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${authState.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [authState]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3000/api/v1/user/login",
        { email, password },
      );

      const { user, token } = response.data.data;
      user.currentRole = user.roles[0].name;

      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  const updateUser = (user: User) => {
    setAuthState((prev) => ({
      ...prev,
      user,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
