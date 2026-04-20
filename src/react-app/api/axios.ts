import axios, { AxiosError, AxiosHeaders } from "axios";

// Reads from .env locally, or Vercel environment variables in production.
// No trailing slash on VITE_API_URL — the "/api/" part is added here.
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/`;

export function setTokensOnClient(tokens: { access: string; refresh: string }) {
  localStorage.setItem("access", tokens.access);
  localStorage.setItem("refresh", tokens.refresh);
}

export function clearTokens() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

function getJwtToken(): string | null {
  return localStorage.getItem("access");
}

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  // Prevents double slashes (//) if a caller accidentally passes "/endpoint"
  if (config.url?.startsWith("/")) {
    config.url = config.url.slice(1);
  }

  // Attach JWT Bearer token if present
  const token = getJwtToken();
  if (token) {
    const headers = AxiosHeaders.from(config.headers);
    headers.set("Authorization", `Bearer ${token}`);
    config.headers = headers;
  }

  return config;
});

export function isApiError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

export default api;
