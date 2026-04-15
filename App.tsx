import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { router } from './routes';
import { initializeMockData } from './utils/mockData';
import { Toaster } from './components/ui/sonner';
import { DecorativePattern } from './components/DecorativePattern';

export default function App() {
  useEffect(() => {
    // Initialize mock data on app load
    initializeMockData();
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <DecorativePattern />
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </AuthProvider>
    </LanguageProvider>
  );
}