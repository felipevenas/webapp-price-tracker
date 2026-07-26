import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../features/auth/types/authTypes';
import { authService } from '../features/auth/services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, full_name: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem('webapp_price_tracker_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.getMe();
      if (response.status === 'success') {
        setUser(response.data);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('webapp_price_tracker_token', data.access_token);
      
      const userProfile = await authService.getMe();
      if (userProfile.status === 'success') {
        setUser(userProfile.data);
      } else {
        throw new Error(userProfile.message || 'Falha ao buscar perfil.');
      }
    } catch (error) {
      localStorage.removeItem('webapp_price_tracker_token');
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, full_name: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.register(email, full_name, password);
      if (response.status !== 'success') {
        throw new Error(response.message || 'Falha ao registrar usuário.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('webapp_price_tracker_token');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
