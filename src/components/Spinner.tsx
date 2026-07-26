import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-t-accent-purple border-r-transparent border-b-accent-blue border-l-transparent rounded-full animate-spin`}
        role="status"
        id="app-spinner"
      >
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
};

export default Spinner;
