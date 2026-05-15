import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/top")({ component: TopPage });

type ProductoTop = {
  producto_id: number;
  nombre: string;
  unidades_vendidas: number;
  facturacion: number;
};

function TopPage() {
  // === HU9: Productos más vendidos ===
  // GET /productos/top
  // Top 10 productos por unidades vendidas. Solo cuenta compras pagada/enviada/entregada.
  // Devuelve cantidad total y facturación acumulada.
  //
  // const { data: top } = useQuery({ queryKey:["top"], queryFn:() => api<ProductoTop[]>("/productos/top") });

  const top: ProductoTop[] = [
    { producto_id: 2, nombre: "Stan Smith", unidades_vendidas: 540, facturacion: 59400 },
    { producto_id: 1, nombre: "Ultraboost 22", unidades_vendidas: 312, facturacion: 78000 },
    { producto_id: 3, nombre: "Predator Edge", unidades_vendidas: 189, facturacion: 34020 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black tracking-tighter uppercase">Más vendidos</h1>
      <Card>
        <CardHeader><CardTitle>Top 10 productos</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>#</TableHead><TableHead>Producto</TableHead>
              <TableHead>Unidades</TableHead><TableHead>Facturación</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {top.map((p, i) => (
                <TableRow key={p.producto_id}>
                  <TableCell><Badge>{i+1}</Badge></TableCell>
                  <TableCell className="font-bold">{p.nombre}</TableCell>
                  <TableCell>{p.unidades_vendidas}</TableCell>
                  <TableCell className="font-bold">${p.facturacion.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
