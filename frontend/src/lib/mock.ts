// Datos mock SOLO para previsualización del frontend.
// Reemplazar por llamadas reales al backend FastAPI (ver comentarios en cada pantalla).

export type Categoria = { id: number; nombre: string; descripcion: string };
export type Variante = { id: number; producto_id: number; talle: string; color: string; stock: number; sku: string };
export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio_base: number;
  categoria_id: number;
  activo: boolean;
  imagen?: string;
  rating?: number;
  resenas_count?: number;
};

export const categorias: Categoria[] = [
  { id: 1, nombre: "Running", descripcion: "Calzado e indumentaria de carrera" },
  { id: 2, nombre: "Football", descripcion: "Botines, camisetas, accesorios" },
  { id: 3, nombre: "Originals", descripcion: "Streetwear y lifestyle" },
  { id: 4, nombre: "Training", descripcion: "Gym y alta intensidad" },
];

export const productos: Producto[] = [
  { id: 1, nombre: "Ultraboost 22", descripcion: "Running de alta performance", precio_base: 189999, categoria_id: 1, activo: true, rating: 4.7, resenas_count: 312 },
  { id: 2, nombre: "Predator Elite FG", descripcion: "Botín de control absoluto", precio_base: 249999, categoria_id: 2, activo: true, rating: 4.5, resenas_count: 128 },
  { id: 3, nombre: "Samba OG", descripcion: "Ícono atemporal", precio_base: 159999, categoria_id: 3, activo: true, rating: 4.9, resenas_count: 1204 },
  { id: 4, nombre: "Dropset Trainer", descripcion: "Entrenamiento estable", precio_base: 139999, categoria_id: 4, activo: true, rating: 4.4, resenas_count: 88 },
  { id: 5, nombre: "Forum Low", descripcion: "Court classic", precio_base: 129999, categoria_id: 3, activo: true, rating: 4.6, resenas_count: 540 },
  { id: 6, nombre: "Adizero SL", descripcion: "Velocidad pura", precio_base: 169999, categoria_id: 1, activo: true, rating: 4.3, resenas_count: 76 },
];

export const variantes: Variante[] = [
  { id: 1, producto_id: 1, talle: "42", color: "Negro", stock: 12, sku: "UB22-42-BK" },
  { id: 2, producto_id: 1, talle: "43", color: "Blanco", stock: 3, sku: "UB22-43-WH" },
  { id: 3, producto_id: 2, talle: "41", color: "Rojo", stock: 0, sku: "PRE-41-RD" },
  { id: 4, producto_id: 3, talle: "42", color: "Verde", stock: 25, sku: "SMB-42-GR" },
  { id: 5, producto_id: 4, talle: "44", color: "Negro", stock: 2, sku: "DST-44-BK" },
];
