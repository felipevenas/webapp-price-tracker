import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, ChevronDown, Sun, Moon } from 'lucide-react';
import Spinner from '../components/Spinner';
import { useTheme } from '../context/ThemeContext';

const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora do componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className="min-h-screen flex flex-col bg-dark-950 text-theme-base">
      {/* Top Navbar */}
      <header className="border-b border-dark-800 bg-dark-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-glow-purple group-hover:scale-105 transition-transform">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            <span className="font-bold text-theme-highlight tracking-wider text-lg hidden sm:block">
              PriceTracker
            </span>
          </Link>

          {/* User Profile & Actions Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2.5 p-1.5 md:p-2 rounded-xl hover:bg-dark-800/40 border border-transparent hover:border-dark-800 transition duration-200 text-left focus:outline-none"
              aria-label="Abrir menu de perfil"
            >
              <div className="w-8 h-8 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center shadow-sm">
                <UserIcon size={16} className="text-accent-purple" />
              </div>
              <div className="hidden sm:block text-left mr-1">
                <p className="text-sm text-theme-base font-semibold leading-tight max-w-[140px] truncate">{user?.full_name}</p>
              </div>
              <ChevronDown
                size={14}
                className={`text-theme-muted transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu Box */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-dark-800 bg-dark-900 shadow-glass z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
                {/* User Info Header (Mobile view) */}
                <div className="px-4 py-2 border-b border-dark-850 sm:hidden">
                  <p className="text-[9px] text-theme-muted font-semibold uppercase tracking-wider mb-0.5">Logado como</p>
                  <p className="text-sm text-theme-base font-semibold truncate">{user?.full_name}</p>
                </div>

                {/* Option: Theme Toggle */}
                <button
                  onClick={() => {
                    toggleTheme();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-theme-base hover:bg-dark-800/60 transition duration-150"
                >
                  <span className="flex items-center space-x-2.5">
                    {theme === 'dark' ? (
                      <>
                        <Sun size={16} className="text-amber-500" />
                        <span>Tema Claro</span>
                      </>
                    ) : (
                      <>
                        <Moon size={16} className="text-accent-purple" />
                        <span>Tema Escuro</span>
                      </>
                    )}
                  </span>
                  <span className="text-[10px] text-theme-muted bg-dark-800 px-1.5 py-0.5 rounded-md border border-dark-700">
                    Ativar
                  </span>
                </button>

                {/* Divisor */}
                <div className="border-t border-dark-850 my-1.5" />

                {/* Option: Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm text-accent-red hover:bg-accent-red/10 transition duration-150"
                >
                  <LogOut size={16} />
                  <span className="font-semibold">Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-900 py-6 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-theme-muted">
          PriceTracker &copy; {new Date().getFullYear()} - Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
