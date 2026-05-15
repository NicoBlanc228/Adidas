import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Producto, Variante } from "@/lib/api";

export const Route = createFileRoute("/admin/productos")({ component: ProductosAdmin });

function ProductosAdmin() {
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio_base: "", categoria_id: "", activo: true });
  const [varProducto, setVarProducto] = useState<number | null>(null);
  const [variante, setVariante] = useState({ talle: "", color: "", stock: "", sku: "" });

  // === HU1: Listar productos ===
  // GET /productos
  const productos: Producto[] = [
    { id: 1, nombre: "Ultraboost 22", descripcion: "Running premium", precio_base: 250, categoria_id: 1, activo: true },
    { id: 2, nombre: "Stan Smith", descripcion: "Clásico", precio_base: 110, categoria_id: 2, activo: true },
    { id: 3, nombre: "Predator Edge", descripcion: "Botines", precio_base: 180, categoria_id: 3, activo: false },
  ];
  const variantes: Variante[] = [
    { id: 11, producto_id: 1, talle: "41", color: "negro", stock: 5, sku: "UB22-41-N" },
    { id: 12, producto_id: 1, talle: "42", color: "blanco", stock: 8, sku: "UB22-42-B" },
  ];

  const crearProducto = () => {
    // === HU1: Crear producto ===
    // POST /productos  body: { nombre, descripcion, precio_base, categoria_id, activo }
    // precio_base > 0; categoria_id requerido.
    //
    // await api("/productos", { method:"POST", body: JSON.stringify({...form, precio_base: Number(form.precio_base), categoria_id: Number(form.categoria_id)}) });
    toast.success("Producto creado");
  };

  const toggleActivo = (_id: number, _activo: boolean) => {
    // PATCH /productos/{id}  body: { activo }
    toast.success("Estado actualizado");
  };

  const crearVariante = () => {
    // === HU2: Crear variante ===
    // POST /productos/{producto_id}/variantes  body: { talle, color, stock, sku }
    // No puede repetirse (talle,color) por producto. SKU único global. Stock >= 0.
    //
    // await api(`/productos/${varProducto}/variantes`, { method:"POST", body: JSON.stringify({...variante, stock: Number(variante.stock)}) });
    toast.success("Variante creada");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black tracking-tighter uppercase">Productos</h1>

      <Card>
        <CardHeader><CardTitle>Nuevo producto</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <div><Label>Nombre</Label><Input value={form.nombre} onChange={(e)=>setForm({...form, nombre:e.target.value})} /></div>
          <div><Label>Categoría</Label>
            <Select value={form.categoria_id} onValueChange={(v)=>setForm({...form, categoria_id:v})}>
              <SelectTrigger><SelectValue placeholder="Elegir..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Running</SelectItem>
                <SelectItem value="2">Lifestyle</SelectItem>
                <SelectItem value="3">Fútbol</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2"><Label>Descripción</Label><Textarea value={form.descripcion} onChange={(e)=>setForm({...form, descripcion:e.target.value})} /></div>
          <div><Label>Precio base</Label><Input type="number" value={form.precio_base} onChange={(e)=>setForm({...form, precio_base:e.target.value})} /></div>
          <div className="flex items-center gap-2"><Switch checked={form.activo} onCheckedChange={(v)=>setForm({...form, activo:v})} /><Label>Activo</Label></div>
          <div className="md:col-span-2"><Button onClick={crearProducto}>Crear producto</Button></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Productos existentes</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>ID</TableHead><TableHead>Nombre</TableHead><TableHead>Precio</TableHead>
              <TableHead>Categoría</TableHead><TableHead>Activo</TableHead><TableHead>Variantes</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {productos.map(p => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell className="font-bold">{p.nombre}</TableCell>
                  <TableCell>${p.precio_base}</TableCell>
                  <TableCell>{p.categoria_id}</TableCell>
                  <TableCell>
                    <Switch checked={p.activo} onCheckedChange={(v)=>toggleActivo(p.id, v)} />
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={()=>setVarProducto(p.id)}>Gestionar</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader><DialogTitle>Variantes de {p.nombre}</DialogTitle></DialogHeader>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            {variantes.filter(v => v.producto_id === p.id).map(v => (
                              <div key={v.id} className="border p-2">
                                <div className="font-bold">{v.talle} · {v.color}</div>
                                <div className="text-xs text-muted-foreground">{v.sku}</div>
                                <Badge variant={v.stock > 0 ? "secondary" : "destructive"}>Stock: {v.stock}</Badge>
                              </div>
                            ))}
                          </div>
                          <div className="border-t pt-3 grid grid-cols-2 gap-2">
                            <Input placeholder="Talle" value={variante.talle} onChange={(e)=>setVariante({...variante, talle:e.target.value})} />
                            <Input placeholder="Color" value={variante.color} onChange={(e)=>setVariante({...variante, color:e.target.value})} />
                            <Input placeholder="Stock" type="number" value={variante.stock} onChange={(e)=>setVariante({...variante, stock:e.target.value})} />
                            <Input placeholder="SKU" value={variante.sku} onChange={(e)=>setVariante({...variante, sku:e.target.value})} />
                            <Button className="col-span-2" onClick={crearVariante}>Agregar variante</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
