import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/top-ventas")({
  component: Top,
});

// ============================================================
// HU9 — GET /productos/top
//   Top 10 productos por unidades vendidas.
//   Solo cuentan compras en estado pagada/enviada/entregada.
//   Incluye cantidad total vendida y facturación acumulada.
// ============================================================
const top = [
  { rank: 1, nombre: "Samba OG",      unidades: 1240, fact: 198_400_000 },
  { rank: 2, nombre: "Ultraboost 22", unidades: 870,  fact: 165_300_000 },
  { rank: 3, nombre: "Forum Low",     unidades: 612,  fact: 79_500_000 },
  { rank: 4, nombre: "Predator Elite",unidades: 410,  fact: 102_400_000 },
  { rank: 5, nombre: "Adizero SL",    unidades: 380,  fact: 64_200_000 },
];

function Top() {
  return (
    <div>
      <h2 className="font-display text-4xl mb-6">Top ventas</h2>
      <div className="space-y-3">
        {top.map(t => (
          <div key={t.rank} className="flex items-center gap-5 border-2 border-foreground bg-background p-4 brutal-shadow">
            <div className="font-display text-5xl text-volt w-16 text-center">#{t.rank}</div>
            <div className="flex-1">
              <div className="font-display text-xl">{t.nombre}</div>
              <div className="text-xs opacity-60">{t.unidades} unidades vendidas</div>
            </div>
            <div className="text-right">
              <div className="font-display text-xl">${t.fact.toLocaleString("es-AR")}</div>
              <div className="text-xs opacity-60">facturado</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
