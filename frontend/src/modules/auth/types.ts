// Lo que el back devuelve cuando hacés login/register/refresh
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  usuario: Usuario;
}

// El usuario que viene adentro del AuthResponse
export interface Usuario {
  usuarioId: number;
  usuario: string;
  correo: string;
  rol: string;
  flgEstado: boolean;
}

// Lo que mandás al back en /api/auth/login
export interface LoginRequest {
  usuario: string;
  contrasena: string;
}

// Lo que mandás al back en /api/auth/registro
export interface RegisterRequest {
  usuario: string;
  contrasena: string;
  correo: string;
  nombres: string;
  apellidos: string;
  numDocumento: string;
  telefono?: string;
}