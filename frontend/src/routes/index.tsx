import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, ShoppingCart, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="space-y-10">
      <section className="border-2 border-foreground p-10 bg-primary text-primary-foreground">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
          Impossible<br />is nothing.
        </h1>
        <p className="mt-4 max-w-xl text-lg opacity-80">
          Indumentaria deportiva. Variantes de talle y color, cupones, carrito persistente y más.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-6">
          <Link to="/productos">Explorar productos <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Package className="h-6 w-6" />
            <CardTitle>Catálogo completo</CardTitle>
            <CardDescription>Filtrá por categoría, talle y color.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/productos">Ver productos</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <ShoppingCart className="h-6 w-6" />
            <CardTitle>Carrito persistente</CardTitle>
            <CardDescription>Sumá productos y aplicá cupones al pagar.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/carrito">Ir al carrito</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <BarChart3 className="h-6 w-6" />
            <CardTitle>Panel admin</CardTitle>
            <CardDescription>Stock, top ventas y facturación.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/reportes">Ver reportes</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
