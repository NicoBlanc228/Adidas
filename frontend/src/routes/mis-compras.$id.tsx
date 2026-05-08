import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/mis-compras/$id")({
  head: () => ({ meta: [{ title: "Detalle compra — ADIBOLD" }] }),
  component: DetalleCompra,
});

// ============================================================
// GET /compras/{id}                              -> detalle + items
// HU13 POST /compras/{id}/devoluciones           -> { items:[{compra_item_id,cantidad}] }
//      GET  /compras/{id}/devoluciones           -> lista estados (solicitada/aprobada/rechazada/reintegrada)
// ============================================================

function DetalleCompra() {
  const { id } = Route.useParams();
  const [solicitando, setSolicitando] = useState(false);
  const items = [
    { id: 1, nombre: "Ultraboost 22", talle: "42", color: "Negro", cantidad: 1, precio: 189999 },
    { id: 2, nombre: "Samba OG",      talle: "42", color: "Verde", cantidad: 2, precio: 159999 },
  ];
  const total = items.reduce((a, i) => a + i.cantidad * i.precio, 0);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link to="/mis-compras" className="inline-flex items-center gap-1 text-sm font-bold uppercase hover:text-volt"><ArrowLeft className="h-4 w-4"/> Volver</Link>
        <h1 className="mt-4 font-display text-5xl">Orden #{id}</h1>
        <div className="mt-2 flex items-center gap-3">
          <span className="border-2 border-foreground bg-background px-2 py-0.5 text-xs font-bold uppercase">Entregada</span>
          <span className="text-sm opacity-70">28/04/2026</span>
        </div>

        <div className="mt-8 border-2 border-foreground bg-background">
          <div className="border-b-2 border-foreground p-4 font-display">Ítems</div>
          {items.map(i => (
            <div key={i.id} className="flex items-center justify-between border-b border-input p-4 last:border-b-0">
              <div>
                <div className="font-bold">{i.nombre}</div>
                <div className="text-xs opacity-60">{i.talle} · {i.color} × {i.cantidad}</div>
              </div>
              <div className="font-bold">${(i.precio * i.cantidad).toLocaleString("es-AR")}</div>
            </div>
          ))}
          <div className="flex items-center justify-between bg-secondary p-4">
            <span className="font-display text-lg">Total</span>
            <span className="font-display text-2xl">${total.toLocaleString("es-AR")}</span>
          </div>
        </div>

        <div className="mt-8 border-2 border-foreground p-6 bg-background brutal-shadow">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="font-display text-2xl">¿Algo no anduvo?</div>
              <p className="text-sm">Solicitá la devolución dentro de los 30 días de entregada.</p>
            </div>
            <button onClick={() => setSolicitando(s => !s)} className="border-2 border-foreground bg-background px-5 py-3 font-bold uppercase brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition flex items-center gap-2">
              <RotateCcw className="h-4 w-4" /> Solicitar devolución
            </button>
          </div>
          {solicitando && (
            <div className="mt-4 border-2 border-foreground bg-background p-4 space-y-2">
              {items.map(i => (
                <label key={i.id} className="flex items-center gap-3 text-sm">
                  <input type="checkbox" className="h-4 w-4 accent-foreground" />
                  {i.nombre} — {i.talle}/{i.color} (máx {i.cantidad})
                </label>
              ))}
              <button className="mt-2 border-2 border-foreground bg-background px-4 py-2 text-sm font-bold uppercase text-background">Enviar solicitud</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
