import { Link } from "@tanstack/react-router";

const sections = [
  { title: "Cliente", links: [
    { to: "/productos", label: "Catálogo" },
    { to: "/carrito", label: "Carrito" },
    { to: "/mis-compras", label: "Mis compras" },
  ]},
  { title: "Admin", links: [
    { to: "/admin/categorias", label: "Categorías" },
    { to: "/admin/productos", label: "Productos" },
    { to: "/admin/cupones", label: "Cupones" },
    { to: "/admin/stock-bajo", label: "Stock bajo" },
    { to: "/admin/top-ventas", label: "Top ventas" },
    { to: "/admin/facturacion", label: "Facturación" },
  ]},
];

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-foreground bg-background text-foreground border-2 border-foreground">
      <div className="stripe-bg h-3" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="font-display text-3xl">ADIBOLD</div>
          <p className="mt-3 text-sm opacity-70">Indumentaria deportiva — impossible is nothing.</p>
        </div>
        {sections.map(s => (
          <div key={s.title}>
            <div className="mb-3 font-display text-volt">{s.title}</div>
            <ul className="space-y-2 text-sm">
              {s.links.map(l => (
                <li key={l.to}><Link to={l.to} className="hover:text-volt">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="mb-3 font-display text-volt">API</div>
          <p className="text-xs opacity-70">FastAPI + PostgreSQL.<br/>Configurar VITE_API_URL en .env</p>
        </div>
      </div>
    </footer>
  );
}
