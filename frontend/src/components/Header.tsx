import { Link } from "@tanstack/react-router";
import { ShoppingBag, User, ShieldCheck } from "lucide-react";

export function Header() {
  const linkCls = "text-sm font-bold uppercase tracking-wider hover:text-volt transition";
  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center bg-background text-foreground border-2 border-foreground font-display text-lg">A</div>
          <span className="font-display text-xl">ADIBOLD</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/productos" className={linkCls} activeProps={{ className: linkCls + " text-volt" }}>Catálogo</Link>
          <Link to="/mis-compras" className={linkCls} activeProps={{ className: linkCls + " text-volt" }}>Mis compras</Link>
          <Link to="/admin" className={linkCls + " flex items-center gap-1"} activeProps={{ className: linkCls + " text-volt flex items-center gap-1" }}>
            <ShieldCheck className="h-4 w-4" /> Admin
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/mis-compras" className="hidden p-2 hover:bg-secondary md:block"><User className="h-5 w-5" /></Link>
          <Link to="/carrito" className="relative border-2 border-foreground bg-background p-2 brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition">
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
