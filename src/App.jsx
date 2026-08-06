import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { DecisionProvider } from './contexts/DecisionContext';
import { CommandProvider } from './contexts/CommandContext';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DecisionProvider>
            <CommandProvider>
              <AppRoutes />
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: '#161c40',
                    color: '#f8fafc',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    borderRadius: '1rem',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10B981',
                      secondary: '#0b0f29',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#F43F5E',
                      secondary: '#0b0f29',
                    },
                  },
                }}
              />
            </CommandProvider>
          </DecisionProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
