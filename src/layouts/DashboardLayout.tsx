import React from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import Spinner from '../components/Spinner';

const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <Spinner size="lg" />
      </div>
    );
  }

  // Redireciona para o login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-950 text-gray-200">
      {/* Top Navbar */}
      <header className="border-b border-dark-800 bg-dark-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-glow-purple group-hover:scale-105 transition-transform">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            <span className="font-bold text-white tracking-wider text-lg hidden sm:block">
              PriceTracker
            </span>
          </Link>

          {/* User profile & Action */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center">
                <UserIcon size={16} className="text-accent-purple" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs text-gray-500 font-medium">Logado como</p>
                <p className="text-sm text-gray-200 font-semibold">{user?.full_name}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-400 hover:text-accent-red hover:bg-accent-red/10 px-3 py-1.5 rounded-lg transition duration-200 text-sm font-medium"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-900 py-6 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-600">
          PriceTracker &copy; {new Date().getFullYear()} - Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
