import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/carrito")({
  head: () => ({ meta: [{ title: "Carrito — ADIBOLD" }] }),
  component: Carrito,
});

// ============================================================
// HU11 — Carrito persistente
// GET    /clientes/{id}/carrito                 -> ítems + subtotal/total al precio actual
// POST   /clientes/{id}/carrito/items           -> { variante_id, cantidad } (suma si existe)
// PATCH  /clientes/{id}/carrito/items/{itemId}  -> { cantidad }
// DELETE /clientes/{id}/carrito/items/{itemId}
// POST   /clientes/{id}/carrito/confirmar       -> crea Compra (HU5) y vacía carrito
// ============================================================

type Item = { id: number; nombre: string; talle: string; color: string; precio: number; cantidad: number; stock: number };

function Carrito() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, nombre: "Ultraboost 22", talle: "42", color: "Negro", precio: 189999, cantidad: 1, stock: 12 },
    { id: 4, nombre: "Samba OG",     talle: "42", color: "Verde", precio: 159999, cantidad: 2, stock: 25 },
  ]);
  const subtotal = items.reduce((a, i) => a + i.precio * i.cantidad, 0);

  const upd = (id: number, d: number) => setItems(s => s.map(i => i.id === id ? { ...i, cantidad: Math.max(1, Math.min(i.stock, i.cantidad + d)) } : i));
  const del = (id: number) => setItems(s => s.filter(i => i.id !== id));

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="font-display text-5xl mb-8">Tu carrito</h1>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {items.map(i => (
              <div key={i.id} className="flex items-center gap-4 border-2 border-foreground bg-background p-4">
                <div className="h-20 w-20 border-2 border-foreground bg-secondary" />
                <div className="flex-1">
                  <div className="font-display text-lg">{i.nombre}</div>
                  <div className="text-xs opacity-60">{i.talle} · {i.color}</div>
                  <div className="mt-1 font-bold">${i.precio.toLocaleString("es-AR")}</div>
                </div>
                <div className="flex items-center border-2 border-foreground">
                  <button onClick={() => upd(i.id, -1)} className="px-2 py-1 hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                  <span className="px-3 font-bold">{i.cantidad}</span>
                  <button onClick={() => upd(i.id, 1)} className="px-2 py-1 hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                </div>
                <button onClick={() => del(i.id)} className="border-2 border-foreground p-2 hover:bg-destructive hover:text-destructive-foreground"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            {items.length === 0 && <div className="border-2 border-dashed border-foreground p-12 text-center"><div className="font-display text-2xl">Carrito vacío</div></div>}
          </div>

          <aside className="border-2 border-foreground bg-background p-6 brutal-shadow h-fit">
            <div className="font-display text-2xl mb-4">Resumen</div>
            <div className="flex justify-between py-2 border-b border-input"><span>Subtotal</span><span className="font-bold">${subtotal.toLocaleString("es-AR")}</span></div>
            <div className="flex justify-between py-2 text-sm opacity-70"><span>Envío</span><span>A calcular</span></div>
            <div className="flex justify-between py-3 mt-2 border-t-2 border-foreground"><span className="font-display">Total</span><span className="font-display text-xl">${subtotal.toLocaleString("es-AR")}</span></div>
            <Link to="/checkout" className="mt-5 block w-full border-2 border-foreground bg-background py-4 text-center font-display text-background brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition">
              Confirmar compra
            </Link>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
