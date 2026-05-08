import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { CheckCircle2, Tag } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — ADIBOLD" }] }),
  component: Checkout,
});

// ============================================================
// HU5  — POST /compras                          -> { cliente_id, items:[{variante_id,cantidad}], cupon? }
//        Estado inicial: pendiente_pago. Validación de stock TODO O NADA.
// HU6  — POST /cupones/validar                  -> { codigo } -> { valido, porcentaje, vencimiento }
//        El usos_actuales se incrementa cuando la compra se confirma.
// HU7  — POST /compras/{id}/pagar               -> descuenta stock al pasar a "pagada"
// ============================================================

function Checkout() {
  const subtotal = 509997;
  const [cupon, setCupon] = useState("");
  const [aplicado, setAplicado] = useState<{ codigo: string; pct: number } | null>(null);
  const total = aplicado ? Math.round(subtotal * (1 - aplicado.pct / 100)) : subtotal;

  const aplicar = () => {
    if (cupon.trim().toUpperCase() === "VOLT15") setAplicado({ codigo: "VOLT15", pct: 15 });
    else setAplicado(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-display text-5xl mb-8">Checkout</h1>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <form className="space-y-6 border-2 border-foreground p-6 bg-background">
            <div>
              <div className="mb-2 font-display">Datos del cliente</div>
              <div className="grid gap-3 md:grid-cols-2">
                <input placeholder="Nombre" className="border-2 border-foreground px-3 py-2" />
                <input placeholder="Email" className="border-2 border-foreground px-3 py-2" />
                <input placeholder="Dirección" className="border-2 border-foreground px-3 py-2 md:col-span-2" />
              </div>
            </div>
            <div>
              <div className="mb-2 font-display">Pago</div>
              <div className="grid gap-3 md:grid-cols-2">
                <input placeholder="Tarjeta" className="border-2 border-foreground px-3 py-2 md:col-span-2" />
                <input placeholder="MM/AA" className="border-2 border-foreground px-3 py-2" />
                <input placeholder="CVV" className="border-2 border-foreground px-3 py-2" />
              </div>
            </div>
          </form>

          <aside className="border-2 border-foreground bg-background p-6 brutal-shadow h-fit">
            <div className="font-display text-2xl mb-4">Resumen</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Ultraboost 22 · 42 Negro × 1</span><span>$189.999</span></div>
              <div className="flex justify-between"><span>Samba OG · 42 Verde × 2</span><span>$319.998</span></div>
            </div>

            <div className="mt-5">
              <div className="flex gap-2">
                <input value={cupon} onChange={e => setCupon(e.target.value)} placeholder="Cupón" className="flex-1 border-2 border-foreground px-3 py-2 text-sm" />
                <button type="button" onClick={aplicar} className="border-2 border-foreground bg-background px-4 font-bold uppercase text-sm">Aplicar</button>
              </div>
              {aplicado && (
                <div className="mt-2 flex items-center gap-2 text-sm text-foreground">
                  <Tag className="h-4 w-4" /> {aplicado.codigo} · -{aplicado.pct}%
                </div>
              )}
            </div>

            <div className="mt-5 border-t-2 border-foreground pt-4">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toLocaleString("es-AR")}</span></div>
              {aplicado && <div className="flex justify-between text-sm"><span>Descuento</span><span>-${(subtotal - total).toLocaleString("es-AR")}</span></div>}
              <div className="mt-2 flex justify-between font-display text-2xl"><span>Total</span><span>${total.toLocaleString("es-AR")}</span></div>
            </div>

            <button className="mt-5 w-full border-2 border-foreground bg-background py-4 font-display text-background brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5" /> Pagar ${total.toLocaleString("es-AR")}
            </button>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
