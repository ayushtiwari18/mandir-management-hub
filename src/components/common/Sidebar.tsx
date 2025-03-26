
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  HelpCircle,
  Building,
  PanelLeft,
  CreditCard,
} from "lucide-react";

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  role?: "admin" | "user" | "all";
}

const navItems: NavItem[] = [
  { title: "Dashboard", icon: Home, href: "/dashboard", role: "all" },
  { title: "Accommodations", icon: Building, href: "/accommodations", role: "all" },
  { title: "Bookings", icon: Calendar, href: "/bookings", role: "all" },
  { title: "Donors", icon: Users, href: "/donors", role: "admin" },
  { title: "Donations", icon: CreditCard, href: "/donations", role: "admin" },
  { title: "Reports", icon: FileText, href: "/reports", role: "admin" },
  { title: "Settings", icon: Settings, href: "/settings", role: "all" },
  { title: "Help", icon: HelpCircle, href: "/help", role: "all" },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Filter items based on user role
  const filteredNavItems = navItems.filter(
    (item) => item.role === "all" || (user && item.role === user.role)
  );

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className={cn(
          "fixed top-4 left-4 z-50 lg:hidden transition-all duration-300",
          isOpen && "left-[240px]"
        )}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0",
          !isMobile && "translate-x-0",
          "border-r bg-sidebar w-64 py-4 px-3 flex flex-col",
          className
        )}
      >
        <div className="flex items-center px-3 h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-temple-orange flex items-center justify-center">
              <span className="text-white font-bold">DM</span>
            </div>
            <span className="font-semibold text-lg">Dutt Mandir</span>
          </Link>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="ml-auto"
            >
              <X size={18} />
            </Button>
          )}
        </div>

        <Separator className="my-4" />

        {/* User info */}
        {user && (
          <div className="px-3 mb-6">
            <div className="flex items-center space-x-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="overflow-hidden">
                <h4 className="font-medium text-sm truncate">{user.name}</h4>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                {user.role === "admin" ? "Admin" : "User"}
              </span>
              <ThemeToggle />
            </div>
          </div>
        )}

        <nav className="space-y-1 flex-grow">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={isMobile ? toggleSidebar : undefined}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-all",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-sidebar-accent text-sidebar-foreground"
              )}
            >
              <item.icon size={16} />
              <span>{item.title}</span>
              {location.pathname === item.href && (
                <span className="w-1.5 h-1.5 rounded-full bg-sidebar-accent-foreground ml-auto" />
              )}
            </Link>
          ))}
        </nav>

        <Separator className="my-4" />

        <div className="px-3">
          <Button
            variant="outline"
            className="w-full justify-start space-x-2"
            onClick={logout}
          >
            <LogOut size={16} />
            <span>Log out</span>
          </Button>
        </div>

        <div className="mt-4 px-3 pt-4 text-xs text-muted-foreground text-center">
          <p>Dutt Mandir Management</p>
          <p>Version 1.0.0</p>
        </div>
      </aside>

      {/* Collapsed sidebar button (desktop) */}
      {!isMobile && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed bottom-4 left-4 z-50 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <PanelLeft size={18} />
        </Button>
      )}
    </>
  );
}
