// Rutas principales
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  AuthProvider,
  ProtectedRoute,
  LoginPage,
  RegisterPage,
  DashboardPage,
} from "../modules/auth";
import { DashboardLayout } from "../modules/auth/pages/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            {/* Futuras páginas se agregan acá como rutas hijas */}
          </Route>

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
