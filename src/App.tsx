import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          {/* Renderiza a árvore de rotas da aplicação */}
          <AppRoutes />

          {/* Gerenciador global de notificações (Toast) com visual adaptativo */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--bg-900)',
                color: 'var(--text-primary)',
                border: '1px solid var(--bg-800)',
                borderRadius: '0.75rem', // rounded-xl
                fontSize: '0.875rem',
              },
              success: {
                iconTheme: {
                  primary: '#10b981', // accent-green
                  secondary: 'var(--bg-900)',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444', // accent-red
                  secondary: 'var(--bg-900)',
                },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
