import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/devoluciones")({ component: DevolucionesPage });

type EstadoDev = "solicitada" | "aprobada" | "rechazada" | "reintegrada";
type Devolucion = {
  id: number;
  compra_id: number;
  cliente: string;
  fecha: string;
  monto: number;
  estado: EstadoDev;
};

function DevolucionesPage() {
  // === HU13: Listar devoluciones ===
  // GET /devoluciones
  // const { data: devoluciones } = useQuery({ queryKey:["devoluciones"], queryFn:() => api<Devolucion[]>("/devoluciones") });

  const devoluciones: Devolucion[] = [
    { id: 1, compra_id: 1024, cliente: "Juan P.", fecha: "2025-05-12", monto: 250, estado: "solicitada" },
    { id: 2, compra_id: 1019, cliente: "Ana M.", fecha: "2025-05-08", monto: 110, estado: "aprobada" },
    { id: 3, compra_id: 1001, cliente: "Luis R.", fecha: "2025-04-30", monto: 180, estado: "reintegrada" },
  ];

  const cambiar = (_id: number, _estado: EstadoDev) => {
    // === HU13: Cambiar estado de devolución ===
    // PATCH /devoluciones/{id}  body: { estado }
    // Estados: solicitada -> aprobada/rechazada -> reintegrada
    // Al pasar a `reintegrada` se repone el stock de las variantes devueltas.
    //
    // await api(`/devoluciones/${id}`, { method:"PATCH", body: JSON.stringify({ estado }) });
    toast.success("Estado actualizado");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black tracking-tighter uppercase">Devoluciones</h1>
      <Card>
        <CardHeader><CardTitle>Solicitudes</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>#</TableHead><TableHead>Compra</TableHead><TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead><TableHead>Monto</TableHead><TableHead>Estado</TableHead><TableHead>Acciones</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {devoluciones.map(d => (
                <TableRow key={d.id}>
                  <TableCell className="font-mono">#{d.id}</TableCell>
                  <TableCell className="font-mono">#{d.compra_id}</TableCell>
                  <TableCell>{d.cliente}</TableCell>
                  <TableCell>{d.fecha}</TableCell>
                  <TableCell className="font-bold">${d.monto}</TableCell>
                  <TableCell><Badge variant="secondary">{d.estado}</Badge></TableCell>
                  <TableCell className="flex gap-1">
                    {d.estado === "solicitada" && (
                      <>
                        <Button size="sm" onClick={()=>cambiar(d.id, "aprobada")}>Aprobar</Button>
                        <Button size="sm" variant="outline" onClick={()=>cambiar(d.id, "rechazada")}>Rechazar</Button>
                      </>
                    )}
                    {d.estado === "aprobada" && (
                      <Button size="sm" onClick={()=>cambiar(d.id, "reintegrada")}>Reintegrar</Button>
                    )}
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
