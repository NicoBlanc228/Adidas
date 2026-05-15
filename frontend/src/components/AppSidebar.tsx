import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Package,
  Tag,
  Ticket,
  ShoppingCart,
  History,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Undo2,
  Layers,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const tienda = [
  { title: "Inicio", url: "/", icon: Home },
  { title: "Productos", url: "/productos", icon: Package },
  { title: "Carrito", url: "/carrito", icon: ShoppingCart },
  { title: "Mis compras", url: "/mis-compras", icon: History },
];

const admin = [
  { title: "Categorías", url: "/admin/categorias", icon: Layers },
  { title: "Productos", url: "/admin/productos", icon: Package },
  { title: "Cupones", url: "/admin/cupones", icon: Ticket },
  { title: "Stock bajo", url: "/admin/stock-bajo", icon: AlertTriangle },
  { title: "Más vendidos", url: "/admin/top", icon: TrendingUp },
  { title: "Facturación", url: "/admin/reportes", icon: BarChart3 },
  { title: "Devoluciones", url: "/admin/devoluciones", icon: Undo2 },
];

export function AppSidebar() {
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <Tag className="h-5 w-5" />
          <span className="font-black tracking-tighter text-lg uppercase">Adidas Shop</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tienda</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tienda.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {admin.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
