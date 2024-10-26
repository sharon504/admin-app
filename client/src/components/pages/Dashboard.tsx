import DefaultDashboard from "@/components/pages/DefaultDashboard";
import AdminDashboard from "@/components/pages/AdminDashboard";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const role = user?.currentRole;
  return <>{role === "admin" ? <AdminDashboard /> : <DefaultDashboard />}</>;
};

export default Dashboard;
