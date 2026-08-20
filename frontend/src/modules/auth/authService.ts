// Único punto que habla con /api/auth.
// Las pages consumen esto vía useAuth (AuthContext.tsx).
// Si ya está acá, no se duplica en las pages (Ponytail rung 2).
import axios from "axios";
import api, { setTokens, clearTokens, getRefreshToken } from "../../shared/api/axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "./types";

const BASE_URL = "http://localhost:8080/api/auth";

// --- POST /api/auth/login ------------------------------
// login y register SON gemelos estructurales (POST +
// setTokens + return), pero representan dos flujos
// distintos (autenticar vs crear cuenta). Tu regla
// "duplicación > mala abstracción": se quedan como
// dos funciones separadas, sin helper tipo "authFlow".
export async function login(req: LoginRequest): Promise<AuthResponse> {
  const res = await axios.post<AuthResponse>(`${BASE_URL}/login`, req);
  setTokens(res.data.accessToken, res.data.refreshToken);
  return res.data;
}

// --- POST /api/auth/registro ---------------------------
export async function register(req: RegisterRequest): Promise<AuthResponse> {
  const res = await axios.post<AuthResponse>(`${BASE_URL}/registro`, req);
  setTokens(res.data.accessToken, res.data.refreshToken);
  return res.data;
}

// --- POST /api/auth/logout -----------------------------
// Leemos el refresh ANTES de limpiarlo, lo mandamos al
// back para que lo revoque, y recién entonces limpiamos
// memoria local.
//
// El try cubre SOLO la llamada HTTP. clearTokens() va
// siempre: si el back falla, igual deslogueamos al
// usuario localmente (mejor UX que quedar a medias).
export async function logout(): Promise<void> {
  try {
    await axios.post(`${BASE_URL}/logout`, { refreshToken: getRefreshToken() });
  } catch {
    // red caída / 500 / lo que sea — deslogueamos igual
  }
  clearTokens();
}

// --- GET /api/usuarios/me ------------------------------
// Usa `api` (instancia con interceptores), NO axios
// directo: así el request interceptor inyecta el Bearer.
// (Ponytail rung 4: el bearer ya está resuelto.)
export async function getMe() {
  const res = await api.get("/usuarios/me");
  return res.data;
}