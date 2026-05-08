import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { variantes, productos } from "@/lib/mock";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/admin/stock-bajo")({
  component: SB,
});

// ============================================================
// HU10 — GET /variantes/stock-bajo?umbral={n}
//   Devuelve variantes con stock <= umbral, datos del producto, ordenado asc por stock.
// ============================================================
function SB() {
  const [umbral, setUmbral] = useState(5);
  const lista = variantes.filter(v => v.stock <= umbral).sort((a, b) => a.stock - b.stock);
  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="font-display text-4xl flex items-center gap-3"><AlertTriangle className="h-8 w-8 text-hot"/> Stock bajo</h2>
        <label className="flex items-center gap-2 text-sm font-bold uppercase">Umbral
          <input type="number" value={umbral} onChange={e => setUmbral(+e.target.value)} className="w-20 border-2 border-foreground px-2 py-1" />
        </label>
      </div>
      <div className="border-2 border-foreground overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background text-foreground border-2 border-foreground"><tr><th className="text-left p-3">SKU</th><th className="text-left p-3">Producto</th><th className="text-left p-3">Talle/Color</th><th className="text-right p-3">Stock</th></tr></thead>
          <tbody>
            {lista.map(v => (
              <tr key={v.id} className="border-t border-input bg-background">
                <td className="p-3 font-mono text-xs">{v.sku}</td>
                <td className="p-3 font-bold">{productos.find(p => p.id === v.producto_id)?.nombre}</td>
                <td className="p-3">{v.talle} · {v.color}</td>
                <td className="p-3 text-right"><span className={`px-2 py-0.5 border-2 border-foreground font-bold ${v.stock === 0 ? "bg-destructive text-destructive-foreground" : "bg-background"}`}>{v.stock}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
