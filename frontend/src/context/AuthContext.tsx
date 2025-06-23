
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthData {
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
}

interface AuthContextType {
  auth: AuthData | null;
  setAuth: (data: AuthData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuthState] = useState<AuthData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('naijaescrow-auth');
    if (stored) setAuthState(JSON.parse(stored));
  }, []);

  const setAuth = (data: AuthData) => {
    setAuthState(data);
    localStorage.setItem('naijaescrow-auth', JSON.stringify(data));
  };

  const logout = () => {
    localStorage.removeItem('naijaescrow-auth');
    setAuthState(null);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
