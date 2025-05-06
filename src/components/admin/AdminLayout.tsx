
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        // Hard-coded admin access for demo
        if (location.pathname.includes('/admin')) {
          setLoading(false);
          return;
        }
        
        if (!session.session) {
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Erreur lors de la vérification admin:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    
    checkAdmin();
  }, [navigate, toast, location]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: "/admin/dashboard", label: "Tableau de bord", icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: "/admin/users", label: "Utilisateurs", icon: <Users className="h-5 w-5" /> },
    { path: "/admin/subscriptions", label: "Abonnements", icon: <CreditCard className="h-5 w-5" /> },
    { path: "/admin/settings", label: "Paramètres", icon: <Settings className="h-5 w-5" /> }
  ];

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-graphik-dark">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-graphik-dark text-white flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-graphik-grey border-r border-graphik-light-grey">
        <div className="p-6">
          <Link to="/admin/dashboard" className="inline-block">
            <span className="text-xl font-bold bg-gradient-to-r from-graphik-blue via-graphik-purple to-graphik-lightblue bg-clip-text text-transparent">
              Graphik'Admin
            </span>
          </Link>
        </div>
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
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-graphik-light-grey">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-gray-300 hover:bg-graphik-light-grey/10 hover:text-white"
          >
            <LogOut className="mr-2 h-5 w-5" /> Déconnexion
          </Button>
        </div>
      </aside>

      {/* Content area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="md:hidden bg-graphik-grey border-b border-graphik-light-grey">
          <div className="px-4 py-3 flex justify-between items-center">
            <Link to="/admin/dashboard" className="inline-block">
              <span className="text-xl font-bold bg-gradient-to-r from-graphik-blue via-graphik-purple to-graphik-lightblue bg-clip-text text-transparent">
                Graphik'Admin
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <nav className="p-4 border-t border-graphik-light-grey bg-graphik-grey animate-fade-in">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 mb-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? "bg-graphik-blue/20 text-graphik-blue"
                      : "text-gray-300 hover:bg-graphik-light-grey/10 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-gray-300 hover:bg-graphik-light-grey/10 hover:text-white mt-4"
              >
                <LogOut className="mr-2 h-5 w-5" /> Déconnexion
              </Button>
            </nav>
          )}
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
