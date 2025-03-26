
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/common/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export function MainLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:pl-64 transition-all duration-300">
        <div className={cn("p-4 lg:p-8 min-h-screen")}>{<Outlet />}</div>
      </main>
    </div>
  );
}
