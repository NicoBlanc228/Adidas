import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/admin/reportes")({ component: ReportesPage });

type Reporte = {
  total_facturado: number;
  cantidad_compras: number;
  desglose: { categoria: string; total: number; compras: number }[];
};

function ReportesPage() {
  const [desde, setDesde] = useState("2025-01-01");
  const [hasta, setHasta] = useState("2025-05-15");

  // === HU14: Reporte de facturación ===
  // GET /reportes/facturacion?desde={desde}&hasta={hasta}
  // Total facturado y cantidad de compras (pagada/enviada/entregada),
  // descontando montos de devoluciones reintegradas del período.
  // Incluye desglose por categoría.
  //
  // const { data: reporte } = useQuery({
  //   queryKey: ["reporte", desde, hasta],
  //   queryFn: () => api<Reporte>(`/reportes/facturacion?desde=${desde}&hasta=${hasta}`),
  // });

  const reporte: Reporte = {
    total_facturado: 184320,
    cantidad_compras: 412,
    desglose: [
      { categoria: "Running", total: 92000, compras: 180 },
      { categoria: "Lifestyle", total: 58320, compras: 156 },
      { categoria: "Fútbol", total: 34000, compras: 76 },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black tracking-tighter uppercase">Facturación</h1>

      <Card>
        <CardContent className="pt-6 grid gap-3 md:grid-cols-3">
          <div><Label>Desde</Label><Input type="date" value={desde} onChange={(e)=>setDesde(e.target.value)} /></div>
          <div><Label>Hasta</Label><Input type="date" value={hasta} onChange={(e)=>setHasta(e.target.value)} /></div>
          <div className="flex items-end"><Button className="w-full">Consultar</Button></div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Total facturado</CardTitle></CardHeader>
          <CardContent>
            <p className="text-5xl font-black tracking-tighter">${reporte.total_facturado.toLocaleString()}</p>
            <p className="text-muted-foreground mt-2">Neto de devoluciones reintegradas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Cantidad de compras</CardTitle></CardHeader>
          <CardContent>
            <p className="text-5xl font-black tracking-tighter">{reporte.cantidad_compras}</p>
            <p className="text-muted-foreground mt-2">Estados pagada / enviada / entregada</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Desglose por categoría</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Categoría</TableHead><TableHead>Compras</TableHead><TableHead>Total</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {reporte.desglose.map(d => (
                <TableRow key={d.categoria}>
                  <TableCell className="font-bold">{d.categoria}</TableCell>
                  <TableCell>{d.compras}</TableCell>
                  <TableCell className="font-bold">${d.total.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
