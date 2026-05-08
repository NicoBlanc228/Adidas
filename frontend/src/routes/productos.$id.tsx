import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { categorias, productos, variantes } from "@/lib/mock";
import { Package, Star } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/productos/$id")({
  head: () => ({ meta: [{ title: "Producto — ADIBOLD" }] }),
  component: Detalle,
});

// ============================================================
// HU2 — GET /productos/{id}/variantes
// HU12 — GET /productos/{id}             -> incluye promedio + cantidad reseñas
//        GET /productos/{id}/resenas     -> lista (más recientes primero)
//        POST /productos/{id}/resenas    -> { puntaje, comentario } (solo si compró+entregada)
// HU11 — POST /clientes/{id}/carrito/items -> { variante_id, cantidad }
// ============================================================

function Detalle() {
  const { id } = Route.useParams();
  const p = productos.find(p => p.id === Number(id));
  const vs = variantes.filter(v => v.producto_id === Number(id));
  const [sel, setSel] = useState<number | null>(vs[0]?.id ?? null);

  if (!p) return <div className="p-10">Producto no encontrado. <Link to="/productos" className="underline">Volver</Link></div>;
  const cat = categorias.find(c => c.id === p.categoria_id);
  const variante = vs.find(v => v.id === sel);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-2">
        <div className="border-2 border-foreground bg-secondary aspect-square grid place-items-center brutal-shadow">
          <Package className="h-40 w-40 opacity-30" />
        </div>
        <div>
          <div className="text-xs font-bold uppercase opacity-60">{cat?.nombre}</div>
          <h1 className="mt-2 font-display text-5xl">{p.nombre}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-foreground" /> {p.rating} · {p.resenas_count} reseñas
          </div>
          <p className="mt-4 max-w-prose">{p.descripcion}</p>
          <div className="mt-6 font-display text-4xl">${p.precio_base.toLocaleString("es-AR")}</div>

          <div className="mt-6">
            <div className="mb-2 text-xs font-bold uppercase">Variante</div>
            <div className="flex flex-wrap gap-2">
              {vs.map(v => (
                <button key={v.id} disabled={v.stock === 0} onClick={() => setSel(v.id)}
                  className={`border-2 border-foreground px-4 py-2 text-sm font-bold uppercase transition
                    ${sel === v.id ? "bg-background" : "bg-background hover:bg-secondary"}
                    ${v.stock === 0 ? "opacity-40 line-through cursor-not-allowed" : ""}`}>
                  {v.talle} · {v.color} <span className="ml-2 opacity-60">({v.stock})</span>
                </button>
              ))}
              {vs.length === 0 && <div className="text-sm opacity-60">Sin variantes cargadas</div>}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button disabled={!variante || variante.stock === 0}
              className="flex-1 border-2 border-foreground bg-background px-6 py-4 font-display text-background brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition disabled:opacity-50">
              Agregar al carrito
            </button>
            <Link to="/carrito" className="border-2 border-foreground px-6 py-4 font-display hover:bg-secondary transition">
              Ir al carrito
            </Link>
          </div>
          <div className="mt-3 text-xs opacity-60">SKU: {variante?.sku ?? "—"}</div>
        </div>
      </div>

      {/* RESEÑAS */}
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="font-display text-3xl mb-6">Reseñas</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { autor: "Mariana G.", puntaje: 5, fecha: "2026-04-12", texto: "La comodidad es brutal, las uso todos los días." },
            { autor: "Lucas P.", puntaje: 4, fecha: "2026-03-30", texto: "Muy buenas, calzan medio justas." },
          ].map((r, i) => (
            <div key={i} className="border-2 border-foreground p-5 bg-background">
              <div className="flex items-center justify-between">
                <div className="font-bold">{r.autor}</div>
                <div className="flex">{Array.from({ length: r.puntaje }).map((_, j) => <Star key={j} className="h-4 w-4 fill-volt stroke-foreground" />)}</div>
              </div>
              <div className="mt-1 text-xs opacity-60">{r.fecha}</div>
              <p className="mt-2 text-sm">{r.texto}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
