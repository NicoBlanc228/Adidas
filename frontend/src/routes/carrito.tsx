import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/carrito")({ component: CarritoPage });

type ItemCarrito = {
  variante_id: number;
  producto_nombre: string;
  talle: string;
  color: string;
  cantidad: number;
  precio_unitario: number;
};

function CarritoPage() {
  const [cupon, setCupon] = useState("");
  const [descuento, setDescuento] = useState(0);

  // === HU11: Carrito persistente ===
  // GET /clientes/{clienteId}/carrito -> items con subtotal y total al precio actual
  //
  // const { data: items } = useQuery({
  //   queryKey: ["carrito", clienteId],
  //   queryFn: () => api<ItemCarrito[]>(`/clientes/${clienteId}/carrito`),
  // });

  const items: ItemCarrito[] = [
    { variante_id: 13, producto_nombre: "Ultraboost 22", talle: "42", color: "blanco", cantidad: 1, precio_unitario: 250 },
    { variante_id: 21, producto_nombre: "Stan Smith", talle: "41", color: "blanco", cantidad: 2, precio_unitario: 110 },
  ];

  const subtotal = items.reduce((s, i) => s + i.cantidad * i.precio_unitario, 0);
  const total = subtotal * (1 - descuento / 100);

  const aplicarCupon = () => {
    // === HU6: Validar cupón ===
    // GET /cupones/{codigo} -> verifica existencia, vencimiento y usos disponibles
    //
    // const cuponData = await api<Cupon>(`/cupones/${cupon}`);
    // setDescuento(cuponData.porcentaje_descuento);
    setDescuento(15);
    toast.success("Cupón aplicado: 15% off");
  };

  const eliminarItem = (_varianteId: number) => {
    // DELETE /clientes/{clienteId}/carrito/items/{varianteId}
    toast.success("Item eliminado");
  };

  const confirmarCompra = () => {
    // === HU5 + HU6: Confirmar compra desde el carrito ===
    // POST /clientes/{clienteId}/compras
    // body: { items: [{variante_id, cantidad}], cupon_codigo?: string }
    //
    // Backend valida stock de TODOS los items (todo o nada),
    // guarda precio_unitario actual, crea compra en estado pendiente_pago,
    // valida y reserva uso de cupón, vacía el carrito.
    //
    // const compra = await api<Compra>(`/clientes/${clienteId}/compras`, {
    //   method: "POST",
    //   body: JSON.stringify({ items: items.map(i => ({ variante_id: i.variante_id, cantidad: i.cantidad })), cupon_codigo: cupon || undefined }),
    // });
    toast.success("Compra creada en estado pendiente_pago");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black tracking-tighter uppercase">Carrito</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {items.map((i) => (
            <Card key={i.variante_id}>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="w-20 h-20 bg-muted shrink-0" />
                <div className="flex-1">
                  <p className="font-bold">{i.producto_nombre}</p>
                  <p className="text-sm text-muted-foreground">Talle {i.talle} · {i.color}</p>
                  <p className="text-sm">Cantidad: {i.cantidad}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${i.cantidad * i.precio_unitario}</p>
                  <Button size="sm" variant="ghost" onClick={() => eliminarItem(i.variante_id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit sticky top-20">
          <CardHeader><CardTitle>Resumen</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Cupón de descuento</Label>
              <div className="flex gap-2">
                <Input value={cupon} onChange={(e) => setCupon(e.target.value)} placeholder="VERANO15" />
                <Button variant="outline" onClick={aplicarCupon}>Aplicar</Button>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            {descuento > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Descuento ({descuento}%)</span>
                <span>-${(subtotal * descuento / 100).toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-xl font-black">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full" size="lg" onClick={confirmarCompra}>
              Confirmar compra
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
