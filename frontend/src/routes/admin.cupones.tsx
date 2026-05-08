import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/cupones")({
  component: Cup,
});

// ============================================================
// HU4 — Cupones
// GET    /cupones
// POST   /cupones    -> { codigo (único), porcentaje (1-100), fecha_vencimiento, usos_maximos }
// PATCH  /cupones/{id}
// Validaciones backend: no vencido, usos_actuales < usos_maximos.
// ============================================================
const cupones = [
  { id: 1, codigo: "VOLT15", pct: 15, vence: "2026-06-30", max: 500, usados: 184 },
  { id: 2, codigo: "RUNNER10", pct: 10, vence: "2026-07-15", max: 1000, usados: 622 },
  { id: 3, codigo: "EXPIRED", pct: 25, vence: "2025-12-01", max: 100, usados: 100 },
];

function Cup() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-4xl">Cupones</h2>
        <button className="border-2 border-foreground bg-background px-4 py-2 text-background font-bold uppercase text-sm flex items-center gap-2 brutal-shadow"><Plus className="h-4 w-4"/> Nuevo</button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cupones.map(c => {
          const vencido = new Date(c.vence) < new Date();
          const sinUsos = c.usados >= c.max;
          const inact = vencido || sinUsos;
          return (
            <div key={c.id} className={`border-2 border-foreground p-5 ${inact ? "bg-secondary opacity-60" : "bg-background"} brutal-shadow`}>
              <div className="font-display text-3xl">{c.codigo}</div>
              <div className="mt-1 text-sm font-bold">-{c.pct}% OFF</div>
              <div className="mt-3 text-xs">Vence: {c.vence}</div>
              <div className="text-xs">Usos: {c.usados} / {c.max}</div>
              <div className="mt-3 text-xs font-bold uppercase">{vencido ? "Vencido" : sinUsos ? "Sin usos" : "Activo"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
