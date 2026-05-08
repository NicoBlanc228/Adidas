import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Zap, Package, Tag } from "lucide-react";
import { categorias, productos } from "@/lib/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ADIBOLD — Tienda deportiva" },
      { name: "description", content: "Indumentaria deportiva con drop semanal. Variantes, cupones y entrega rápida." },
    ],
  }),
  component: Home,
});

// ============================================================
// HU INDEX (Landing)
// Endpoints sugeridos a consumir cuando el backend esté arriba:
// GET /productos?destacados=true            -> grilla destacados
// GET /productos/top                        -> HU9 (carrusel "más vendidos")
// GET /categorias                           -> chips de categorías
// ============================================================

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-foreground">
        <div className="stripe-bg absolute inset-0 opacity-30" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-20 md:grid-cols-12 md:py-32">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-3 py-1 text-xs font-bold uppercase">
              <Zap className="h-3 w-3" /> Drop · Semana 19
            </div>
            <h1 className="mt-6 font-display text-6xl leading-[0.85] md:text-8xl">
              MOVÉ<br/><span className="bg-background px-2 text-background">FUERTE.</span><br/>USA <span className="text-volt">VOLT.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg">
              Tienda online con stock real, variantes por talle/color, cupones y checkout en un click.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/productos" className="group inline-flex items-center gap-2 border-2 border-foreground bg-background px-6 py-3 font-bold uppercase text-background brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition">
                Ver catálogo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link to="/admin" className="inline-flex items-center gap-2 border-2 border-foreground px-6 py-3 font-bold uppercase hover:bg-secondary transition">
                Panel admin
              </Link>
            </div>
          </div>
          <div className="relative md:col-span-5">
            <div className="aspect-square border-2 border-foreground bg-background brutal-shadow grid place-items-center">
              <div className="font-display text-[10rem] leading-none text-foreground">A</div>
            </div>
            <div className="absolute -bottom-4 -left-4 border-2 border-foreground bg-background px-4 py-2 font-bold uppercase brutal-shadow">
              3 stripes / 0 BS
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-4xl md:text-5xl">Categorías</h2>
          <Link to="/productos" className="text-sm font-bold uppercase hover:text-volt">Ver todo →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {categorias.map((c, i) => (
            <Link key={c.id} to="/productos" className="group relative block overflow-hidden border-2 border-foreground p-6 hover:bg-secondary transition">
              <div className="text-xs font-bold uppercase opacity-60">0{i+1}</div>
              <div className="mt-8 font-display text-2xl">{c.nombre}</div>
              <div className="mt-1 text-sm opacity-70">{c.descripcion}</div>
              <ArrowRight className="mt-6 h-5 w-5 transition group-hover:translate-x-2" />
            </Link>
          ))}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 font-display text-4xl md:text-5xl">Top picks</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {productos.slice(0, 3).map((p) => (
            <Link key={p.id} to="/productos/$id" params={{ id: String(p.id) }} className="group block border-2 border-foreground bg-background brutal-shadow hover:-translate-x-[2px] hover:-translate-y-[2px] transition">
              <div className="aspect-square border-b-2 border-foreground bg-secondary grid place-items-center">
                <Package className="h-20 w-20 opacity-30" />
              </div>
              <div className="p-4">
                <div className="text-xs font-bold uppercase opacity-60">{categorias.find(c => c.id === p.categoria_id)?.nombre}</div>
                <div className="mt-1 font-display text-xl">{p.nombre}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-bold">${p.precio_base.toLocaleString("es-AR")}</div>
                  <div className="text-xs">★ {p.rating} ({p.resenas_count})</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CUPONES BANNER */}
      <section className="border-y-2 border-foreground bg-background text-foreground border-2 border-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 md:flex-row">
          <div className="flex items-center gap-4">
            <Tag className="h-10 w-10 text-volt" />
            <div>
              <div className="font-display text-3xl">USA <span className="text-volt">VOLT15</span></div>
              <div className="text-sm opacity-80">15% off en tu primera compra. Vence el 30/06.</div>
            </div>
          </div>
          <Link to="/productos" className="border-2 border-foreground bg-background px-6 py-3 font-bold uppercase text-foreground hover:bg-background hover:text-background hover:bg-secondary transition">
            Aprovechar
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
