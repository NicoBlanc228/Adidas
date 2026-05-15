import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { Cupon } from "@/lib/api";

export const Route = createFileRoute("/admin/cupones")({ component: CuponesAdmin });

function CuponesAdmin() {
  const [form, setForm] = useState({ codigo: "", porcentaje_descuento: "", fecha_vencimiento: "", usos_maximos: "" });

  // === HU4: Listar cupones ===
  // GET /cupones
  const cupones: Cupon[] = [
    { id: 1, codigo: "VERANO15", porcentaje_descuento: 15, fecha_vencimiento: "2025-12-31", usos_maximos: 100, usos_actuales: 23 },
    { id: 2, codigo: "BIENVENIDO", porcentaje_descuento: 10, fecha_vencimiento: "2025-06-01", usos_maximos: 500, usos_actuales: 480 },
  ];

  const crear = () => {
    // === HU4: Crear cupón ===
    // POST /cupones  body: { codigo, porcentaje_descuento, fecha_vencimiento, usos_maximos }
    // codigo único; porcentaje 1..100.
    //
    // await api("/cupones", { method:"POST", body: JSON.stringify({...form, porcentaje_descuento: Number(form.porcentaje_descuento), usos_maximos: Number(form.usos_maximos)}) });
    toast.success("Cupón creado");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black tracking-tighter uppercase">Cupones</h1>

      <Card>
        <CardHeader><CardTitle>Nuevo cupón</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-5">
          <div><Label>Código</Label><Input value={form.codigo} onChange={(e)=>setForm({...form, codigo:e.target.value})} /></div>
          <div><Label>% Descuento</Label><Input type="number" value={form.porcentaje_descuento} onChange={(e)=>setForm({...form, porcentaje_descuento:e.target.value})} /></div>
          <div><Label>Vencimiento</Label><Input type="date" value={form.fecha_vencimiento} onChange={(e)=>setForm({...form, fecha_vencimiento:e.target.value})} /></div>
          <div><Label>Usos máximos</Label><Input type="number" value={form.usos_maximos} onChange={(e)=>setForm({...form, usos_maximos:e.target.value})} /></div>
          <div className="flex items-end"><Button onClick={crear} className="w-full">Crear</Button></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Cupones existentes</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Código</TableHead><TableHead>%</TableHead><TableHead>Vence</TableHead>
              <TableHead>Usos</TableHead><TableHead>Estado</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {cupones.map(c => {
                const vencido = new Date(c.fecha_vencimiento) < new Date();
                const agotado = c.usos_actuales >= c.usos_maximos;
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono font-bold">{c.codigo}</TableCell>
                    <TableCell>{c.porcentaje_descuento}%</TableCell>
                    <TableCell>{c.fecha_vencimiento}</TableCell>
                    <TableCell>{c.usos_actuales}/{c.usos_maximos}</TableCell>
                    <TableCell>
                      {vencido ? <Badge variant="destructive">Vencido</Badge>
                        : agotado ? <Badge variant="destructive">Agotado</Badge>
                        : <Badge variant="secondary">Activo</Badge>}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
