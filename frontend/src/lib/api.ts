// Base URL de tu backend. Configurá esto según tu API.
export const API_BASE_URL = "http://localhost:8080";

// Helper que podés usar desde los componentes:
// const data = await api<MiTipo>("/productos");
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

// Tipos compartidos
export type Categoria = { id: number; nombre: string; descripcion: string };
export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio_base: number;
  categoria_id: number;
  activo: boolean;
  promedio_resenas?: number;
  cantidad_resenas?: number;
};
export type Variante = {
  id: number;
  producto_id: number;
  talle: string;
  color: string;
  stock: number;
  sku: string;
};
export type Cupon = {
  id: number;
  codigo: string;
  porcentaje_descuento: number;
  fecha_vencimiento: string;
  usos_maximos: number;
  usos_actuales: number;
};
export type EstadoCompra =
  | "pendiente_pago"
  | "pagada"
  | "enviada"
  | "entregada"
  | "cancelada";
export type CompraItem = {
  variante_id: number;
  cantidad: number;
  precio_unitario: number;
  producto_nombre?: string;
  talle?: string;
  color?: string;
};
export type Compra = {
  id: number;
  cliente_id: number;
  fecha: string;
  total: number;
  estado: EstadoCompra;
  cupon_id: number | null;
  items: CompraItem[];
};
