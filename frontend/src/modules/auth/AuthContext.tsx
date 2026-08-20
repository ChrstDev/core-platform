import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import type { Usuario, LoginRequest, RegisterRequest } from './types';
import { login as loginSvc, register as registerSvc, logout as logoutSvc, getMe } from './authService';

interface AuthContextType {
  usuario: Usuario | null;
  loading: boolean;
  login: (req: LoginRequest) => Promise<void>;
  register: (req: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const PUBLIC_ROUTES = ['/login', '/register'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // No llamar a getMe() si estamos en una ruta publica
    if (PUBLIC_ROUTES.includes(location.pathname)) {
      setLoading(false);
      return;
    }

    getMe()
      .then(setUsuario)
      .catch(() => setUsuario(null))
      .finally(() => setLoading(false));
  }, [location.pathname]);

  async function login(req: LoginRequest) {
    const res = await loginSvc(req);
    setUsuario(res.usuario);
  }

  async function register(req: RegisterRequest) {
    const res = await registerSvc(req);
    setUsuario(res.usuario);
  }

  async function logout() {
    await logoutSvc();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe estar dentro de AuthProvider');
  return ctx;
}