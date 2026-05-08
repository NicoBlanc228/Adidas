import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — ADIBOLD" }] }),
  component: AdminLayout,
});

const NAV: { to: string; label: string; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", exact: true },
  { to: "/admin/categorias", label: "Categorías" },
  { to: "/admin/productos", label: "Productos" },
  { to: "/admin/cupones", label: "Cupones" },
  { to: "/admin/stock-bajo", label: "Stock bajo" },
  { to: "/admin/top-ventas", label: "Top ventas" },
  { to: "/admin/facturacion", label: "Facturación" },
];

function AdminLayout() {
  const loc = useLocation();
  const isRoot = loc.pathname === "/admin" || loc.pathname === "/admin/";
  return (
    <div className="min-h-screen">
      <Header />
      <div className="border-b-2 border-foreground bg-background text-foreground border-2 border-foreground">
        <div className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-between">
          <h1 className="font-display text-3xl text-volt">PANEL ADMIN</h1>
          <div className="text-xs opacity-70">FastAPI + PostgreSQL</div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-3 flex gap-2 overflow-x-auto">
          {NAV.map(n => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: !!n.exact }}
              className="border-2 border-background px-3 py-1 text-xs font-bold uppercase whitespace-nowrap hover:bg-secondary hover:text-foreground hover:border-foreground transition"
              activeProps={{ className: "border-2 border-foreground bg-background px-3 py-1 text-xs font-bold uppercase whitespace-nowrap text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        {isRoot ? <AdminHome /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
}

// ============================================================
// Dashboard admin — endpoints sugeridos:
// GET /reportes/facturacion?desde=...&hasta=...   -> KPI total/cantidad
// GET /productos/top                              -> top ventas
// GET /variantes/stock-bajo?umbral=5              -> alertas stock
// ============================================================
function AdminHome() {
  const stats = [
    { label: "Facturación 30d", value: "$12.480.500" },
    { label: "Compras pagadas", value: "284" },
    { label: "Stock crítico", value: "12 variantes" },
    { label: "Cupones activos", value: "5" },
  ];
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="border-2 border-foreground bg-background p-5 brutal-shadow">
            <div className="text-xs font-bold uppercase opacity-60">{s.label}</div>
            <div className="mt-2 font-display text-3xl">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {NAV.filter(n => !n.exact).map(n => (
          <Link key={n.to} to={n.to} className="border-2 border-foreground p-6 bg-background hover:bg-secondary transition">
            <div className="font-display text-2xl">{n.label}</div>
            <div className="text-sm opacity-60 mt-1">Ir a la sección →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
