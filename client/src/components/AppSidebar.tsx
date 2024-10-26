import { Home, UserRoundCog, ListCheck, Scroll } from "lucide-react";
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
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import DropdownMenu from "@/components/DropdownMenu";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const items: MenuItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "User Management",
    url: "/users",
    icon: UserRoundCog,
  },
  {
    title: "Role Management",
    url: "/roles",
    icon: ListCheck,
  },
  {
    title: "Permission Management",
    url: "/permissions",
    icon: Scroll,
  },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader>
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Admin Portal</h2>
          <p className="text-sm text-gray-500">Management Console</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        "hover:bg-gray-100",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        isActive &&
                          "bg-primary/10 text-primary hover:bg-primary/20",
                        !isActive && "text-gray-700 hover:text-gray-900",
                      )}
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-3 w-full"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <DropdownMenu />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
