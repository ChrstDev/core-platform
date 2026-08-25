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
import { EnConstruccionPage } from "../shared/pages/EnConstruccionPage";
import { NoEncontradoPage } from "../shared/pages/NoEncontradoPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            {/* Módulos específicos cuando los tengas */}{" "}
            {/* <Route path="tickets" element={<TicketsPage />} /> */}
            {/* CATCH-ALL ADENTRO: cualquier /dashboard/* desconocido se queda en la app, no desloguea */}
            <Route path="*" element={<EnConstruccionPage />} />
          </Route>

          {/* raíz */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Catch-all EXTERIOR: rutas que NO están en /dashboard (URLs random que no existen) */}
          <Route path="*" element={<NoEncontradoPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
