import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export const Route = createFileRoute("/mis-compras")({
  head: () => ({ meta: [{ title: "Mis compras — ADIBOLD" }] }),
  component: MisCompras,
});

// ============================================================
// HU8 — GET /clientes/{id}/compras?estado={estado}
//       Devuelve compras ordenadas por fecha desc, cada una con sus ítems y total.
// HU13 — POST /compras/{id}/devoluciones  -> { items: [{compra_item_id, cantidad}] }
// ============================================================

const ESTADOS = ["todas", "pendiente_pago", "pagada", "enviada", "entregada", "cancelada"] as const;

const compras = [
  { id: 1042, fecha: "2026-04-28", estado: "entregada", total: 509997, items: 3 },
  { id: 1031, fecha: "2026-04-15", estado: "enviada",   total: 189999, items: 1 },
  { id: 1018, fecha: "2026-03-30", estado: "pagada",    total: 249999, items: 1 },
  { id: 1005, fecha: "2026-03-12", estado: "cancelada", total: 139999, items: 1 },
];

function MisCompras() {
  const [filtro, setFiltro] = useState<string>("todas");
  const lista = filtro === "todas" ? compras : compras.filter(c => c.estado === filtro);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-display text-5xl mb-6">Mis compras</h1>
        <div className="mb-6 flex flex-wrap gap-2">
          {ESTADOS.map(e => (
            <button key={e} onClick={() => setFiltro(e)} className={`border-2 border-foreground px-3 py-1 text-xs font-bold uppercase transition ${filtro === e ? "bg-background text-foreground border-2 border-foreground" : "hover:bg-secondary"}`}>
              {e.replace("_", " ")}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {lista.map(c => (
            <Link key={c.id} to="/mis-compras/$id" params={{ id: String(c.id) }} className="flex items-center justify-between border-2 border-foreground bg-background p-5 hover:bg-secondary transition">
              <div>
                <div className="font-display text-xl">Orden #{c.id}</div>
                <div className="text-xs opacity-60">{c.fecha} · {c.items} ítem(s)</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="border-2 border-foreground px-2 py-0.5 text-xs font-bold uppercase">{c.estado.replace("_", " ")}</span>
                <span className="font-display text-lg">${c.total.toLocaleString("es-AR")}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
