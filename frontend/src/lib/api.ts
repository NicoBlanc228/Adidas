// Base URL del backend FastAPI. Configurable vía .env -> VITE_API_URL
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

// Helper genérico para consumir endpoints REST de FastAPI.
// Descomentar cuando el backend esté disponible.
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}
