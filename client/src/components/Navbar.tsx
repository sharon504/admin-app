import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();

  return (
    <nav className="w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <SidebarTrigger className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
            )}
            <Link
              to="/"
              className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors"
            >
              Admin Management
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-base">
                    Sign in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="text-base">Sign up</Button>
                </Link>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="hover:bg-red-50 hover:text-red-500"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
