import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-100 text-center mb-6">Acessar sua conta</h2>
      <LoginForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-accent-purple hover:underline font-semibold">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
