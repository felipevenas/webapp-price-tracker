import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl border border-dark-800 bg-dark-900 hover:bg-dark-850 hover:border-accent-purple text-gray-400 hover:text-accent-purple transition-all duration-300 shadow-sm overflow-hidden group flex items-center justify-center w-10 h-10"
      aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
    >
      
      {/* Ícone do Sol (Tema Claro) */}
      <Sun
        size={18}
        className={`absolute text-amber-500 transition-all duration-500 transform ${
          theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        }`}
      />

      {/* Ícone da Lua (Tema Escuro) */}
      <Moon
        size={18}
        className={`absolute text-accent-purple transition-all duration-500 transform ${
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
