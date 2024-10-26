import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <SidebarProvider>
        {isAuthenticated && <AppSidebar />}
        <div className="w-full mx-auto">
          <Navbar />
          <div className="container w-full mx-auto">
            <main>{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
