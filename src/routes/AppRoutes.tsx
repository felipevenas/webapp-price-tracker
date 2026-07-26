import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';

import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import ProductsPage from '../features/products/pages/ProductsPage';
import ProductDetailPage from '../features/products/pages/ProductDetailPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rota inicial redireciona para o Dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Rotas Públicas de Autenticação */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Rotas Privadas do Painel de Controle */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Route>
      </Route>

      {/* Rota Fallback (Redirecionamento para segurança) */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
// export default AppRoutes;
