import axios, { AxiosError } from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Tokens en memoria
// Memoria > localStorage: no sobrevive al cierre del navegador y no es accesible a extensiones.
let isRefreshing = false;
let accessToken = "";
let refreshToken = "";

export function setTokens(access: string, refresh: string) {
  accessToken = access;
  refreshToken = refresh;
}

export function clearTokens() {
  accessToken = "";
  refreshToken = "";
}

export function getAccessToken() {
  return accessToken;
}

// El logout del authService lo necesita para mandar el  refresh al back antes de limpiarlo.
export function getRefreshToken() {
  return refreshToken;
}

// Sliding-window refresh
// Si el access vence, el back nos da uno nuevo.
// Si esto falla (revocado, expirado) → /login directo.
async function slidingRefresh() {
  if (!refreshToken) return;
  if (isRefreshing) return; 
  isRefreshing = true; 
  try {
    const res = await axios.post("http://localhost:8080/api/auth/refresh", {
      refreshToken,
    });
    accessToken = res.data.accessToken;
    refreshToken = res.data.refreshToken;
  } catch {
    clearTokens();
    window.location.href = "/login";
  } finally {
    isRefreshing = false;
  }
}

// REQUEST: inyecta el Bearer si hay access vigente.
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// RESPONSE 2xx: dispara un refresh "preventivo".
// RESPONSE 4xx/5xx: si es 401, deslogueamos.
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (!response.config.url?.includes("/auth/refresh")) {
      slidingRefresh();
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearTokens();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
