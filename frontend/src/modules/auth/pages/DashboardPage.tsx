// Pagina principal despues del login
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
      <h1>Bienvenido, {usuario.usuario}</h1>

      <div style={{ background: '#f5f5f5', padding: 20, borderRadius: 8, marginTop: 20 }}>
        <h3>Datos del usuario</h3>
        <p><b>ID:</b> {usuario.usuarioId}</p>
        <p><b>Usuario:</b> {usuario.usuario}</p>
        <p><b>Correo:</b> {usuario.correo}</p>
        <p><b>Rol:</b> {usuario.rol}</p>
        <p><b>Estado:</b> {usuario.flgEstado ? 'Activo' : 'Inactivo'}</p>
      </div>

      <button
        onClick={handleLogout}
        style={{ marginTop: 20, padding: 10, background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
      >
        Cerrar sesion
      </button>
    </div>
  );
}