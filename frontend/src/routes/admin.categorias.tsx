import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import type { Categoria } from "@/lib/api";

export const Route = createFileRoute("/admin/categorias")({ component: CategoriasAdmin });

function CategoriasAdmin() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // === HU1: Listar categorías ===
  // GET /categorias
  // const { data: categorias } = useQuery({ queryKey:["categorias"], queryFn:() => api<Categoria[]>("/categorias") });

  const categorias: Categoria[] = [
    { id: 1, nombre: "Running", descripcion: "Calzado y ropa para correr" },
    { id: 2, nombre: "Lifestyle", descripcion: "Sneakers urbanos" },
    { id: 3, nombre: "Fútbol", descripcion: "Botines y equipamiento" },
  ];

  const crear = () => {
    // === HU1: Crear categoría ===
    // POST /categorias  body: { nombre, descripcion }
    // El nombre debe ser único.
    //
    // await api("/categorias", { method:"POST", body: JSON.stringify({ nombre, descripcion }) });
    toast.success(`Categoría "${nombre}" creada`);
    setNombre(""); setDescripcion("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black tracking-tighter uppercase">Categorías</h1>

      <Card>
        <CardHeader><CardTitle>Nueva categoría</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div><Label>Nombre</Label><Input value={nombre} onChange={(e)=>setNombre(e.target.value)} /></div>
          <div><Label>Descripción</Label><Textarea value={descripcion} onChange={(e)=>setDescripcion(e.target.value)} /></div>
          <div className="flex items-end"><Button onClick={crear} className="w-full">Crear</Button></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Categorías existentes</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Nombre</TableHead><TableHead>Descripción</TableHead></TableRow></TableHeader>
            <TableBody>
              {categorias.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell className="font-bold">{c.nombre}</TableCell>
                  <TableCell>{c.descripcion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
