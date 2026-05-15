import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { Producto, Variante } from "@/lib/api";

export const Route = createFileRoute("/productos/$id")({ component: ProductoDetalle });

type Resena = { id: number; cliente: string; puntaje: number; comentario: string; fecha: string };

function ProductoDetalle() {
  const { id } = Route.useParams();
  const [varianteSel, setVarianteSel] = useState<number | null>(null);
  const [puntaje, setPuntaje] = useState(5);
  const [comentario, setComentario] = useState("");

  // === HU2/HU12: Detalle del producto + reseñas ===
  // GET /productos/{id} -> incluye promedio y cantidad de reseñas
  // GET /productos/{id}/variantes
  // GET /productos/{id}/resenas (más recientes primero)
  //
  // const { data: producto } = useQuery({ queryKey:["prod",id], queryFn:() => api<Producto>(`/productos/${id}`) });
  // const { data: variantes } = useQuery({ queryKey:["var",id], queryFn:() => api<Variante[]>(`/productos/${id}/variantes`) });
  // const { data: resenas } = useQuery({ queryKey:["res",id], queryFn:() => api<Resena[]>(`/productos/${id}/resenas`) });

  const producto: Producto = { id: Number(id), nombre: "Ultraboost 22", descripcion: "Running premium con tecnología Boost", precio_base: 250, categoria_id: 1, activo: true, promedio_resenas: 4.6, cantidad_resenas: 124 };
  const variantes: Variante[] = [
    { id: 11, producto_id: Number(id), talle: "41", color: "negro", stock: 5, sku: "UB22-41-N" },
    { id: 12, producto_id: Number(id), talle: "42", color: "negro", stock: 0, sku: "UB22-42-N" },
    { id: 13, producto_id: Number(id), talle: "42", color: "blanco", stock: 8, sku: "UB22-42-B" },
    { id: 14, producto_id: Number(id), talle: "43", color: "blanco", stock: 2, sku: "UB22-43-B" },
  ];
  const resenas: Resena[] = [
    { id: 1, cliente: "Juan P.", puntaje: 5, comentario: "Excelentes para correr largas distancias.", fecha: "2025-04-12" },
    { id: 2, cliente: "Ana M.", puntaje: 4, comentario: "Cómodas pero un poco ajustadas.", fecha: "2025-03-30" },
  ];

  const handleAgregarCarrito = () => {
    if (!varianteSel) return toast.error("Elegí una variante");
    // === HU11: Agregar al carrito ===
    // POST /clientes/{clienteId}/carrito/items
    // body: { variante_id, cantidad: 1 }
    // Si la variante ya estaba en el carrito, suma cantidades. Falla si no hay stock.
    //
    // await api(`/clientes/${clienteId}/carrito/items`, {
    //   method: "POST",
    //   body: JSON.stringify({ variante_id: varianteSel, cantidad: 1 }),
    // });
    toast.success("Agregado al carrito");
  };

  const handleResena = () => {
    // === HU12: Crear/actualizar reseña ===
    // POST /productos/{id}/resenas  body: { puntaje, comentario }
    // Solo permitido si el cliente tiene una compra entregada de ese producto.
    // Si ya existe reseña del cliente, se actualiza.
    //
    // await api(`/productos/${id}/resenas`, {
    //   method: "POST", body: JSON.stringify({ puntaje, comentario }),
    // });
    toast.success("Reseña enviada");
    setComentario("");
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square bg-muted flex items-center justify-center text-muted-foreground">
          Imagen producto
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">{producto.nombre}</h1>
            <p className="text-muted-foreground mt-2">{producto.descripcion}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge>★ {producto.promedio_resenas}</Badge>
            <span className="text-sm text-muted-foreground">({producto.cantidad_resenas} reseñas)</span>
          </div>
          <p className="text-3xl font-black">${producto.precio_base}</p>

          <Separator />

          <div>
            <Label className="mb-2 block">Variante</Label>
            <div className="grid grid-cols-2 gap-2">
              {variantes.map((v) => (
                <Button
                  key={v.id}
                  variant={varianteSel === v.id ? "default" : "outline"}
                  disabled={v.stock === 0}
                  onClick={() => setVarianteSel(v.id)}
                  className="justify-start flex-col h-auto py-3 items-start"
                >
                  <span className="font-bold">{v.talle} · {v.color}</span>
                  <span className="text-xs opacity-70">
                    {v.stock === 0 ? "Sin stock" : `${v.stock} disponibles`}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={handleAgregarCarrito}>
            Agregar al carrito
          </Button>
        </div>
      </div>

      <Separator />

      <section>
        <h2 className="text-2xl font-black tracking-tighter uppercase mb-4">Reseñas</h2>
        <Card className="mb-4">
          <CardHeader><CardTitle className="text-base">Dejá tu reseña</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Puntaje (1-5)</Label>
              <div className="flex gap-1 mt-1">
                {[1,2,3,4,5].map(n => (
                  <Button key={n} size="sm" variant={puntaje>=n ? "default" : "outline"} onClick={() => setPuntaje(n)}>★</Button>
                ))}
              </div>
            </div>
            <div>
              <Label>Comentario</Label>
              <Textarea value={comentario} onChange={(e)=>setComentario(e.target.value)} />
            </div>
            <Button onClick={handleResena}>Enviar reseña</Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {resenas.map(r => (
            <Card key={r.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between mb-1">
                  <span className="font-bold">{r.cliente}</span>
                  <Badge variant="secondary">★ {r.puntaje}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{r.comentario}</p>
                <p className="text-xs text-muted-foreground mt-2">{r.fecha}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
