import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin/facturacion")({
  component: Fact,
});

// ============================================================
// HU14 — GET /reportes/facturacion?desde=YYYY-MM-DD&hasta=YYYY-MM-DD
//   Devuelve total facturado y cantidad de compras (estados: pagada/enviada/entregada).
//   Descuenta montos de devoluciones reintegradas del período.
//   Incluye desglose por categoría.
// ============================================================
function Fact() {
  const [desde, setDesde] = useState("2026-04-01");
  const [hasta, setHasta] = useState("2026-04-30");
  const desglose = [
    { categoria: "Running",   total: 6_400_000, compras: 124 },
    { categoria: "Football",  total: 3_100_000, compras: 58  },
    { categoria: "Originals", total: 8_900_000, compras: 240 },
    { categoria: "Training",  total: 2_080_500, compras: 47  },
  ];
  const total = desglose.reduce((a, x) => a + x.total, 0);
  const compras = desglose.reduce((a, x) => a + x.compras, 0);

  return (
    <div>
      <h2 className="font-display text-4xl mb-6">Reporte de facturación</h2>
      <div className="border-2 border-foreground bg-background p-5 mb-6 flex flex-wrap items-end gap-4">
        <label className="text-xs font-bold uppercase">Desde<br/>
          <input type="date" value={desde} onChange={e => setDesde(e.target.value)} className="mt-1 border-2 border-foreground px-3 py-2 text-sm font-mono" />
        </label>
        <label className="text-xs font-bold uppercase">Hasta<br/>
          <input type="date" value={hasta} onChange={e => setHasta(e.target.value)} className="mt-1 border-2 border-foreground px-3 py-2 text-sm font-mono" />
        </label>
        <button className="border-2 border-foreground bg-background text-foreground border-2 border-foreground px-5 py-2 font-bold uppercase text-sm">Generar</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <div className="border-2 border-foreground bg-background p-6 brutal-shadow">
          <div className="text-xs font-bold uppercase">Total facturado (neto devoluciones)</div>
          <div className="font-display text-5xl mt-2">${total.toLocaleString("es-AR")}</div>
        </div>
        <div className="border-2 border-foreground bg-background text-foreground border-2 border-foreground p-6 brutal-shadow">
          <div className="text-xs font-bold uppercase opacity-70">Cantidad de compras</div>
          <div className="font-display text-5xl mt-2 text-volt">{compras}</div>
        </div>
      </div>

      <h3 className="font-display text-2xl mb-3">Desglose por categoría</h3>
      <div className="border-2 border-foreground overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background text-foreground border-2 border-foreground"><tr><th className="text-left p-3">Categoría</th><th className="text-right p-3">Compras</th><th className="text-right p-3">Total</th><th className="text-right p-3">% del total</th></tr></thead>
          <tbody>
            {desglose.map(d => (
              <tr key={d.categoria} className="border-t border-input bg-background">
                <td className="p-3 font-bold">{d.categoria}</td>
                <td className="p-3 text-right">{d.compras}</td>
                <td className="p-3 text-right font-bold">${d.total.toLocaleString("es-AR")}</td>
                <td className="p-3 text-right">{((d.total / total) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
