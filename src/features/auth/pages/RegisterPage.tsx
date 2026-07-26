import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-100 text-center mb-6">Criar nova conta</h2>
      <RegisterForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Já possui uma conta?{' '}
          <Link to="/login" className="text-accent-purple hover:underline font-semibold">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
