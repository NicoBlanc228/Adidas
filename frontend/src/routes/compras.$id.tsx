import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import type { Compra, EstadoCompra } from "@/lib/api";

export const Route = createFileRoute("/compras/$id")({ component: CompraDetalle });

const ESTADOS: EstadoCompra[] = ["pendiente_pago", "pagada", "enviada", "entregada", "cancelada"];

function CompraDetalle() {
  const { id } = Route.useParams();
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [nuevoEstado, setNuevoEstado] = useState<EstadoCompra>("pagada");

  // === HU8: Detalle de compra ===
  // GET /compras/{id}
  // const { data: compra } = useQuery({ queryKey:["compra",id], queryFn:() => api<Compra>(`/compras/${id}`) });

  const compra: Compra = {
    id: Number(id),
    cliente_id: 1,
    fecha: "2025-05-10T10:30:00",
    total: 470,
    estado: "entregada",
    cupon_id: 2,
    items: [
      { variante_id: 13, cantidad: 1, precio_unitario: 250, producto_nombre: "Ultraboost 22", talle: "42", color: "blanco" },
      { variante_id: 21, cantidad: 2, precio_unitario: 110, producto_nombre: "Stan Smith", talle: "41", color: "blanco" },
    ],
  };

  const cambiarEstado = () => {
    // === HU7: Transición de estado ===
    // PATCH /compras/{id}/estado  body: { estado }
    // Backend valida transiciones (pendiente_pago -> pagada -> enviada -> entregada, o -> cancelada).
    // Al pasar a `pagada` se descuenta stock; si se cancela después de pagar, se repone.
    //
    // await api(`/compras/${id}/estado`, { method:"PATCH", body: JSON.stringify({ estado: nuevoEstado }) });
    toast.success(`Compra → ${nuevoEstado}`);
  };

  const solicitarDevolucion = () => {
    if (seleccionados.length === 0) return toast.error("Elegí items a devolver");
    // === HU13: Solicitar devolución ===
    // POST /compras/{id}/devoluciones  body: { items: [variante_id...] }
    // Solo permitido si la compra está entregada y dentro de los 30 días.
    // No se puede pedir devolución por items ya reintegrados.
    //
    // await api(`/compras/${id}/devoluciones`, { method:"POST", body: JSON.stringify({ items: seleccionados }) });
    toast.success("Devolución solicitada");
    setSeleccionados([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">Compra #{compra.id}</h1>
          <p className="text-muted-foreground">{new Date(compra.fecha).toLocaleString()}</p>
        </div>
        <Badge className="text-base">{compra.estado}</Badge>
      </div>

      <Card>
        <CardHeader><CardTitle>Items</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Variante</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compra.items.map(it => (
                <TableRow key={it.variante_id}>
                  <TableCell>
                    <Checkbox
                      checked={seleccionados.includes(it.variante_id)}
                      onCheckedChange={(v) => setSeleccionados(s => v ? [...s, it.variante_id] : s.filter(x => x !== it.variante_id))}
                    />
                  </TableCell>
                  <TableCell className="font-bold">{it.producto_nombre}</TableCell>
                  <TableCell>{it.talle} · {it.color}</TableCell>
                  <TableCell>{it.cantidad}</TableCell>
                  <TableCell>${it.precio_unitario}</TableCell>
                  <TableCell className="font-bold">${it.cantidad * it.precio_unitario}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="my-4" />
          <div className="text-right text-2xl font-black">Total: ${compra.total}</div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Cambiar estado (admin)</CardTitle></CardHeader>
          <CardContent className="flex gap-2">
            <Select value={nuevoEstado} onValueChange={(v) => setNuevoEstado(v as EstadoCompra)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {ESTADOS.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={cambiarEstado}>Aplicar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Devolución</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Seleccioná los items a devolver. Solo dentro de 30 días desde la entrega.
            </p>
            <Button onClick={solicitarDevolucion} variant="outline" className="w-full">
              Solicitar devolución
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
