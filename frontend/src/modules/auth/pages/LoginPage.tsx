import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import indexLogo from '@/assets/index_logo.svg';

export function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ usuario, contrasena });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesion');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full p-2 md:p-4 gap-4">

      {/*  COLUMNA IZQUIERDA: hero con imagen  */}
      <section
        className="hidden md:flex md:w-1/2 relative flex-col rounded-xl overflow-hidden
                   h-[calc(100vh-2rem)] sticky top-4 bg-[#f4fbfb]"
      >
        {/*
        <div className="absolute top-0 left-0 z-20 p-6 flex items-center gap-2">
          <div className="bg-white rounded p-1 flex items-center justify-center">
            <span className="material-symbols-outlined text-black text-sm">bolt</span>
          </div>
          <span className="text-white font-bold tracking-tight">clever</span>
        </div>
        */}

        <div className="absolute bottom-0 left-0 z-20 p-8 md:p-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Crea algo increíble hoy.
          </h2>
          <p className="text-white/80 text-lg">
            Un espacio para que tus ideas cobren vida.
          </p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 mix-blend-multiply" />

        <img
          alt="Fondo de login"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          src={indexLogo}
        />
      </section>

      {/*  COLUMNA DERECHA: formulario  */}

      <section
        className="w-full md:w-1/2 flex flex-col bg-white rounded-xl
                   min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-2rem)]"
      >
        <div className="flex-grow flex items-center justify-center p-6 md:p-16">
          <div className="w-full max-w-[400px] mx-auto">

            <header className="mb-8 text-left">
              <h1 className="text-[32px] leading-10 font-bold tracking-tight text-[#161d1e] mb-2">
                Iniciar sesion
              </h1>
              <p className="text-sm text-[#5a5f60]">
                Bienvenido de nuevo. Ingresa tus datos a continuacion.
              </p>
            </header>

            <form className="flex flex-col" onSubmit={handleSubmit}>

              {/* Campo Usuario */}
              <div className="flex flex-col gap-1 mb-6">
                <Label htmlFor="usuario" className="text-sm font-semibold text-[#161d1e]">
                  Usuario
                </Label>
                <Input
                  id="usuario"
                  type="text"
                  placeholder="ada"
                  value={usuario}
                  onChange={e => setUsuario(e.target.value)}
                  required
                />
              </div>

              {/* Campo Contrasena */}
              <div className="flex flex-col gap-1 mb-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="contrasena" className="text-sm font-semibold text-[#161d1e]">
                    Contrasena
                  </Label>
                  <a
                    href="#"
                    className="text-sm text-[#5a5f60] hover:text-[#2d6469] transition-colors"
                  >
                    Olvidaste tu contrasena?
                  </a>
                </div>
                <Input
                  id="contrasena"
                  type="password"
                  placeholder="********"
                  value={contrasena}
                  onChange={e => setContrasena(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-sm text-[#ba1a1a] mb-4">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Ingresando...' : 'Iniciar sesion'}
              </Button>
            </form>

            {/*<p className="mt-8 text-left text-sm text-[#5a5f60]">
              No tenes cuenta?{' '}
              <Link to="/register" className="text-blue-700 hover:underline">
                Registrate
              </Link>
            </p>*/}
          </div>
        </div>
      </section>
    </main>
  );
}