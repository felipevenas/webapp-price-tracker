import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import ThemeToggle from '../components/ThemeToggle';

const AuthLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <Spinner size="lg" />
      </div>
    );
  }

  // Redireciona para o dashboard se já estiver autenticado
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-dark-950 text-theme-base">
      {/* Botão de Toggle do Tema no canto superior direito */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue shadow-glow-purple mb-3">
            <span className="text-xl font-bold text-white">P</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-theme-highlight mb-1">PriceTracker</h1>
          <p className="text-sm text-theme-muted">Rastreamento de preços inteligente em tempo real</p>
        </div>

        {/* Content Box */}
        <div className="bg-dark-900 border border-dark-800 rounded-2xl shadow-glass p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
