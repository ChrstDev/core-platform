// Guard de rutas privadas
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import type { ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { usuario, loading } = useAuth();

  // Mientras carga, mostrar un mensaje
  if (loading) return <p>Cargando...</p>;

  // Si no hay usuario, mandar a login
  if (!usuario) return <Navigate to="/login" />;

  // Si hay usuario, mostrar el children
  return <>{children}</>;
}