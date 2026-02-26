import axios, { AxiosError, AxiosHeaders } from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

export function setTokensOnClient(tokens: { access: string; refresh: string }) {
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

function getJwtToken(): string | null {
  return localStorage.getItem("access_token");
}

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  // Keep baseURL exactly as configured (with trailing slash) while preventing `//` in requests.
  if (config.url?.startsWith("/")) {
    config.url = config.url.slice(1);
  }

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
