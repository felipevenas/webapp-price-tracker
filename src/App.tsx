import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Renderiza a árvore de rotas da aplicação */}
        <AppRoutes />

        {/* Gerenciador global de notificações (Toast) com visual premium escuro */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937', // dark-800
              color: '#f3f4f6', // gray-200
              border: '1px solid #374151', // dark-700
              borderRadius: '0.75rem', // rounded-xl
              fontSize: '0.875rem',
            },
            success: {
              iconTheme: {
                primary: '#10b981', // accent-green
                secondary: '#1f2937',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444', // accent-red
                secondary: '#1f2937',
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
