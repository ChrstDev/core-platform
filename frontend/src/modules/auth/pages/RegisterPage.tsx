// Formulario de registro
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export function RegisterPage() {
  const [form, setForm] = useState({
    usuario: '',
    contrasena: '',
    correo: '',
    nombres: '',
    apellidos: '',
    numDocumento: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(key: string, value: string) {
    setForm({ ...form, [key]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
      <h1>Registro</h1>

      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, value]) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <input
              type={key === 'contrasena' ? 'password' : 'text'}
              placeholder={key}
              value={value}
              onChange={e => handleChange(key, e.target.value)}
              required
              style={{ width: '100%', padding: 8 }}
            />
          </div>
        ))}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>

      <p style={{ marginTop: 20 }}>
        Ya tenes cuenta? <Link to="/login">Inicia sesion</Link>
      </p>
    </div>
  );
}