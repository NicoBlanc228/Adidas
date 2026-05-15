import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Compra, EstadoCompra } from "@/lib/api";

export const Route = createFileRoute("/mis-compras")({ component: MisComprasPage });

const ESTADOS: EstadoCompra[] = ["pendiente_pago", "pagada", "enviada", "entregada", "cancelada"];

function MisComprasPage() {
  const [estado, setEstado] = useState<string>("todos");

  // === HU8: Historial del cliente ===
  // GET /clientes/{clienteId}/compras?estado={estado}
  // Compras ordenadas por fecha desc, con items y total. Filtro opcional por estado.
  //
  // const { data: compras } = useQuery({
  //   queryKey: ["mis-compras", clienteId, estado],
  //   queryFn: () => api<Compra[]>(`/clientes/${clienteId}/compras${estado!=="todos" ? `?estado=${estado}`:""}`),
  // });

  const compras: Compra[] = [
    { id: 1024, cliente_id: 1, fecha: "2025-05-10T10:30:00", total: 470, estado: "entregada", cupon_id: 2, items: [] },
    { id: 1019, cliente_id: 1, fecha: "2025-04-22T14:10:00", total: 250, estado: "enviada", cupon_id: null, items: [] },
    { id: 1010, cliente_id: 1, fecha: "2025-04-01T09:00:00", total: 110, estado: "cancelada", cupon_id: null, items: [] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end gap-4">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Mis compras</h1>
        <div className="w-48">
          <Select value={estado} onValueChange={setEstado}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {ESTADOS.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Historial</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compras.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono">#{c.id}</TableCell>
                  <TableCell>{new Date(c.fecha).toLocaleDateString()}</TableCell>
                  <TableCell className="font-bold">${c.total}</TableCell>
                  <TableCell><Badge variant="secondary">{c.estado}</Badge></TableCell>
                  <TableCell>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/compras/$id" params={{ id: String(c.id) }}>Ver</Link>
                    </Button>
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
