import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/stock-bajo")({ component: StockBajoPage });

type VarianteStockBajo = {
  id: number;
  producto_id: number;
  producto_nombre: string;
  talle: string;
  color: string;
  stock: number;
  sku: string;
};

function StockBajoPage() {
  const [umbral, setUmbral] = useState(5);

  // === HU10: Stock bajo ===
  // GET /variantes/stock-bajo?umbral={umbral}
  // Variantes con stock <= umbral, ordenadas asc, con datos del producto.
  //
  // const { data: variantes } = useQuery({
  //   queryKey: ["stock-bajo", umbral],
  //   queryFn: () => api<VarianteStockBajo[]>(`/variantes/stock-bajo?umbral=${umbral}`),
  // });

  const variantes: VarianteStockBajo[] = [
    { id: 12, producto_id: 1, producto_nombre: "Ultraboost 22", talle: "42", color: "negro", stock: 0, sku: "UB22-42-N" },
    { id: 14, producto_id: 1, producto_nombre: "Ultraboost 22", talle: "43", color: "blanco", stock: 2, sku: "UB22-43-B" },
    { id: 31, producto_id: 3, producto_nombre: "Predator Edge", talle: "40", color: "rojo", stock: 4, sku: "PE-40-R" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black tracking-tighter uppercase">Stock bajo</h1>

      <Card>
        <CardContent className="pt-6 flex items-end gap-3 max-w-sm">
          <div className="flex-1">
            <Label>Umbral</Label>
            <Input type="number" value={umbral} onChange={(e)=>setUmbral(Number(e.target.value))} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Variantes con stock ≤ {umbral}</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Producto</TableHead><TableHead>Talle</TableHead><TableHead>Color</TableHead>
              <TableHead>SKU</TableHead><TableHead>Stock</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {variantes.map(v => (
                <TableRow key={v.id}>
                  <TableCell className="font-bold">{v.producto_nombre}</TableCell>
                  <TableCell>{v.talle}</TableCell>
                  <TableCell>{v.color}</TableCell>
                  <TableCell className="font-mono text-xs">{v.sku}</TableCell>
                  <TableCell>
                    <Badge variant={v.stock === 0 ? "destructive" : "secondary"}>{v.stock}</Badge>
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
