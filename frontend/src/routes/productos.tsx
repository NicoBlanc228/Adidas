import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { categorias, productos, variantes } from "@/lib/mock";
import { Package } from "lucide-react";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/productos")({
  head: () => ({ meta: [{ title: "Catálogo — ADIBOLD" }] }),
  component: Catalogo,
});

// ============================================================
// HU3 — Buscar productos
// GET /productos?categoria={cat}&talle={t}&color={c}
//   - Solo activo=true y con al menos 1 variante con stock>0 que cumpla filtros
// GET /categorias                       -> filtro categorías
// ============================================================

function Catalogo() {
  const [cat, setCat] = useState<number | null>(null);
  const [talle, setTalle] = useState("");
  const [color, setColor] = useState("");

  const filtrados = useMemo(() => {
    return productos.filter(p => {
      if (!p.activo) return false;
      if (cat && p.categoria_id !== cat) return false;
      const vs = variantes.filter(v => v.producto_id === p.id);
      const ok = vs.some(v =>
        v.stock > 0 &&
        (!talle || v.talle === talle) &&
        (!color || v.color.toLowerCase() === color.toLowerCase())
      );
      return talle || color ? ok : true;
    });
  }, [cat, talle, color]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="border-b-2 border-foreground bg-background text-foreground border-2 border-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h1 className="font-display text-5xl md:text-6xl">Catálogo</h1>
          <p className="mt-2 text-sm opacity-70">{filtrados.length} productos disponibles</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[260px_1fr]">
        {/* FILTROS */}
        <aside className="space-y-6 border-2 border-foreground bg-background p-5 h-fit">
          <div>
            <div className="mb-2 font-display">Categoría</div>
            <div className="space-y-1">
              <button onClick={() => setCat(null)} className={`block w-full text-left text-sm py-1 ${!cat ? "font-bold text-volt" : ""}`}>Todas</button>
              {categorias.map(c => (
                <button key={c.id} onClick={() => setCat(c.id)} className={`block w-full text-left text-sm py-1 ${cat === c.id ? "font-bold text-volt" : ""}`}>{c.nombre}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 font-display">Talle</div>
            <input value={talle} onChange={e => setTalle(e.target.value)} placeholder="42" className="w-full border-2 border-foreground px-3 py-2 text-sm" />
          </div>
          <div>
            <div className="mb-2 font-display">Color</div>
            <input value={color} onChange={e => setColor(e.target.value)} placeholder="negro" className="w-full border-2 border-foreground px-3 py-2 text-sm" />
          </div>
          <button onClick={() => { setCat(null); setTalle(""); setColor(""); }} className="w-full border-2 border-foreground py-2 font-bold uppercase text-sm hover:bg-secondary">
            Limpiar
          </button>
        </aside>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map(p => (
            <Link key={p.id} to="/productos/$id" params={{ id: String(p.id) }} className="group block border-2 border-foreground bg-background brutal-shadow hover:-translate-x-[2px] hover:-translate-y-[2px] transition">
              <div className="aspect-square border-b-2 border-foreground bg-secondary grid place-items-center">
                <Package className="h-16 w-16 opacity-30" />
              </div>
              <div className="p-4">
                <div className="text-[10px] font-bold uppercase opacity-60">{categorias.find(c => c.id === p.categoria_id)?.nombre}</div>
                <div className="mt-1 font-display text-lg">{p.nombre}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-bold">${p.precio_base.toLocaleString("es-AR")}</div>
                  <div className="text-xs">★ {p.rating}</div>
                </div>
              </div>
            </Link>
          ))}
          {filtrados.length === 0 && (
            <div className="col-span-full border-2 border-dashed border-foreground p-12 text-center">
              <div className="font-display text-2xl">Sin resultados</div>
              <p className="mt-2 text-sm opacity-70">Probá ajustar los filtros.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
