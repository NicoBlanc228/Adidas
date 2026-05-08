import { createFileRoute } from "@tanstack/react-router";
import { categorias } from "@/lib/mock";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/categorias")({
  component: Cats,
});

// ============================================================
// HU1 — Categorías
// GET    /categorias
// POST   /categorias        -> { nombre (único), descripcion }
// PATCH  /categorias/{id}
// DELETE /categorias/{id}
// ============================================================
function Cats() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-4xl">Categorías</h2>
        <button className="border-2 border-foreground bg-background px-4 py-2 text-background font-bold uppercase text-sm flex items-center gap-2 brutal-shadow"><Plus className="h-4 w-4"/> Nueva</button>
      </div>
      <div className="border-2 border-foreground overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background text-foreground border-2 border-foreground"><tr><th className="text-left p-3">ID</th><th className="text-left p-3">Nombre</th><th className="text-left p-3">Descripción</th><th></th></tr></thead>
          <tbody>
            {categorias.map(c => (
              <tr key={c.id} className="border-t border-input bg-background">
                <td className="p-3 font-mono">{c.id}</td>
                <td className="p-3 font-bold">{c.nombre}</td>
                <td className="p-3">{c.descripcion}</td>
                <td className="p-3 text-right"><button className="text-xs font-bold uppercase hover:text-volt">Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
