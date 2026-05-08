import { createFileRoute } from "@tanstack/react-router";
import { categorias, productos, variantes } from "@/lib/mock";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/productos")({
  component: Prods,
});

// ============================================================
// HU1/HU2 — Productos y variantes
// GET    /productos                          -> listado completo (incluye inactivos)
// POST   /productos                          -> { nombre, descripcion, precio_base>0, categoria_id }
// PATCH  /productos/{id}                     -> activar/desactivar (activo=false sin borrar)
// GET    /productos/{id}/variantes
// POST   /productos/{id}/variantes           -> { talle, color, stock>=0, sku (único) }
//   Restricción: (producto_id, talle, color) único.
// ============================================================
function Prods() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-4xl">Productos</h2>
        <button className="border-2 border-foreground bg-background px-4 py-2 text-background font-bold uppercase text-sm flex items-center gap-2 brutal-shadow"><Plus className="h-4 w-4"/> Nuevo</button>
      </div>
      <div className="space-y-4">
        {productos.map(p => {
          const vs = variantes.filter(v => v.producto_id === p.id);
          return (
            <div key={p.id} className="border-2 border-foreground bg-background p-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="text-xs font-bold uppercase opacity-60">{categorias.find(c => c.id === p.categoria_id)?.nombre}</div>
                  <div className="font-display text-xl">{p.nombre}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">${p.precio_base.toLocaleString("es-AR")}</span>
                  <span className={`border-2 border-foreground px-2 py-0.5 text-xs font-bold uppercase ${p.activo ? "bg-background" : "bg-secondary"}`}>{p.activo ? "Activo" : "Inactivo"}</span>
                  <button className="border-2 border-foreground px-3 py-1 text-xs font-bold uppercase hover:bg-secondary">Editar</button>
                </div>
              </div>
              <div className="mt-4 border-t border-input pt-3">
                <div className="text-xs font-bold uppercase opacity-60 mb-2">Variantes ({vs.length})</div>
                <div className="flex flex-wrap gap-2">
                  {vs.map(v => (
                    <div key={v.id} className="border border-foreground px-3 py-1 text-xs">
                      {v.talle}/{v.color} · stock {v.stock} · <span className="font-mono opacity-60">{v.sku}</span>
                    </div>
                  ))}
                  <button className="border-2 border-dashed border-foreground px-3 py-1 text-xs font-bold uppercase hover:bg-secondary">+ Variante</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
