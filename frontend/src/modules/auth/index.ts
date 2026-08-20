// Barrel export del modulo auth
export { LoginPage } from './pages/LoginPage';
export { RegisterPage } from './pages/RegisterPage';
export { DashboardPage } from './pages/DashboardPage';
export { login, register, logout, getMe } from './authService';
export { useAuth, AuthProvider } from './AuthContext';
export { ProtectedRoute } from './ProtectedRoute';
export type { Usuario, AuthResponse, LoginRequest, RegisterRequest } from './types';