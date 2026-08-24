import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Ticket,
  Search,
  Bell,
  Moon,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../AuthContext";

const NAV = [
  { title: "Inicio", url: "/dashboard", icon: Home },
  { title: "Tickets", url: "/dashboard/tickets", icon: Ticket },
];

export function DashboardLayout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function isItemActive(itemUrl: string): boolean {
    if (itemUrl === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === itemUrl || pathname.startsWith(itemUrl + "/");
  }

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="bg-black rounded p-1">
              <Sparkles className="text-white size-4" />
            </div>
            <span className="font-bold tracking-tight">clever</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isItemActive(item.url)}
                      render={<Link to={item.url} />}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-2 px-2 py-1.5">
                <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold">
                  {usuario?.usuario?.charAt(0).toUpperCase() ?? "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {usuario?.usuario}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {usuario?.correo}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex items-center gap-2 border-b bg-background px-4 py-2 sticky top-0 z-10">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />

          <div className="ml-auto flex items-center gap-2">
            <button className="size-8 flex items-center justify-center rounded hover:bg-muted relative">
              <Bell className="size-4" />
              <span className="absolute top-1 right-1 size-1.5 bg-pink-500 rounded-full" />
            </button>
            <button className="size-8 flex items-center justify-center rounded hover:bg-muted">
              <Moon className="size-4" />
            </button>
            <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold">
              {usuario?.usuario?.charAt(0).toUpperCase() ?? "?"}
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
