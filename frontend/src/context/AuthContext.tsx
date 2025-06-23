"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface AuthData {
  token?: string;
  _id?: string;
  businessName?: string;
  businessEmail?: string;
  businessPhone?: string;
  website?: string;
  description?: string;
  address?: string;
  adminFirstName?: string;
  adminLastName?: string;
  adminEmail?: string;
  adminPhone?: string;
  business?: string;
}

interface AuthContextType {
  auth: AuthData | null;
  authLoading: boolean;
  setAuth: (data: AuthData | ((prev: AuthData | null) => AuthData)) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuthState] = useState<AuthData | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("naijaescrow-auth");
    if (stored) {
      setAuthState(JSON.parse(stored));
    }
    setAuthLoading(false);
  }, []);

  const setAuth = (data: AuthData | ((prev: AuthData | null) => AuthData)) => {
    setAuthState((prev) => {
      const updated = typeof data === "function" ? data(prev) : data;
      localStorage.setItem("naijaescrow-auth", JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    localStorage.removeItem("naijaescrow-auth");
    setAuthState(null);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
