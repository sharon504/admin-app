import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const Logout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  });
  return (
    <div>
      <h1>You have been logged out</h1>
    </div>
  );
};

export default Logout;
