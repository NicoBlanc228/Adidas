import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { Producto } from "@/lib/api";

export const Route = createFileRoute("/productos/")({ component: ProductosPage });

function ProductosPage() {
  const [categoria, setCategoria] = useState("");
  const [talle, setTalle] = useState("");
  const [color, setColor] = useState("");

  // === HU3: Buscar productos ===
  // GET /productos?categoria={categoria}&talle={talle}&color={color}
  // Devuelve solo productos activos con al menos una variante con stock > 0 que cumpla los filtros.
  //
  // const { data: productos } = useQuery({
  //   queryKey: ["productos", categoria, talle, color],
  //   queryFn: () => api<Producto[]>(
  //     `/productos?categoria=${categoria}&talle=${talle}&color=${color}`
  //   ),
  // });

  const productos: Producto[] = [
    { id: 1, nombre: "Ultraboost 22", descripcion: "Running premium", precio_base: 250, categoria_id: 1, activo: true, promedio_resenas: 4.6, cantidad_resenas: 124 },
    { id: 2, nombre: "Stan Smith", descripcion: "Clásico atemporal", precio_base: 110, categoria_id: 2, activo: true, promedio_resenas: 4.8, cantidad_resenas: 980 },
    { id: 3, nombre: "Predator Edge", descripcion: "Botines de fútbol", precio_base: 180, categoria_id: 3, activo: true, promedio_resenas: 4.4, cantidad_resenas: 56 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-black tracking-tighter uppercase">Productos</h1>
        <p className="text-muted-foreground">Filtrá por categoría, talle y color.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Filtros</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div>
            <Label>Categoría</Label>
            <Input placeholder="running" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          </div>
          <div>
            <Label>Talle</Label>
            <Input placeholder="42" value={talle} onChange={(e) => setTalle(e.target.value)} />
          </div>
          <div>
            <Label>Color</Label>
            <Input placeholder="negro" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <div className="flex items-end">
            <Button className="w-full">Aplicar</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {productos.map((p) => (
          <Card key={p.id} className="flex flex-col">
            <CardHeader>
              <div className="aspect-square bg-muted mb-3 flex items-center justify-center text-muted-foreground text-sm">
                Imagen producto
              </div>
              <CardTitle className="flex justify-between items-start">
                <span>{p.nombre}</span>
                <Badge variant="secondary">★ {p.promedio_resenas}</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{p.descripcion}</p>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-2xl font-black">${p.precio_base}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/productos/$id" params={{ id: String(p.id) }}>Ver detalle</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
