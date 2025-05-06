
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard, Users, CreditCard, Settings, Target, Bell, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  handleLogout: () => Promise<void>;
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  handleLogout, 
  isMobileMenuOpen = false,
  onMobileMenuClose
}) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: "/admin/dashboard", label: "Tableau de bord", icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: "/admin/users", label: "Utilisateurs", icon: <Users className="h-5 w-5" /> },
    { path: "/admin/subscriptions", label: "Abonnements", icon: <CreditCard className="h-5 w-5" /> },
    { path: "/admin/targets", label: "Objectifs", icon: <Target className="h-5 w-5" /> },
    { path: "/admin/analytics", label: "Statistiques", icon: <BarChart className="h-5 w-5" /> },
    { path: "/admin/settings", label: "Paramètres", icon: <Settings className="h-5 w-5" /> }
  ];

  return (
    <nav className="flex flex-col flex-1 p-4">
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center px-4 py-3 mb-2 rounded-md transition-colors ${
            isActive(item.path)
              ? "bg-graphik-blue/20 text-graphik-blue"
              : "text-gray-300 hover:bg-graphik-light-grey/10 hover:text-white"
          }`}
          onClick={onMobileMenuClose}
        >
          {item.icon}
          <span className="ml-3">{item.label}</span>
        </Link>
      ))}
      
      <div className="mt-auto pt-4 border-t border-graphik-light-grey">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-gray-300 hover:bg-graphik-light-grey/10 hover:text-white"
        >
          <LogOut className="mr-2 h-5 w-5" /> Déconnexion
        </Button>
      </div>
    </nav>
  );
};

export default AdminSidebar;
