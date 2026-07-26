import React, { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, className = '', type = 'text', ...props }, ref) => {
    return (
      <div className="w-full mb-4 text-left">
        {label && (
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}
        <div className="relative rounded-lg shadow-sm">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={`w-full bg-dark-900 border ${
              error ? 'border-accent-red focus:ring-accent-red' : 'border-dark-700 focus:border-accent-purple'
            } text-gray-200 rounded-lg py-2 px-3 ${
              leftIcon ? 'pl-10' : ''
            } placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-accent-purple focus:ring-opacity-50 transition duration-150 ease-in-out ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-accent-red font-medium">{error}</p>}
        {!error && helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
