import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function useAuthGuard(requireAuth: boolean = true) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      navigate("/login");
    } else if (!requireAuth && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, requireAuth]);
}
