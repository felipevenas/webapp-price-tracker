import React, { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  glow = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-dark-900 border border-dark-800 rounded-xl p-6 transition-all duration-300 ${
        hoverEffect ? 'hover:scale-[1.01] hover:border-dark-700 hover:shadow-glass' : ''
      } ${glow ? 'shadow-glow-purple border-accent-purple/20' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
