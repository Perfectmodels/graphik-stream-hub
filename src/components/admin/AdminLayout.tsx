
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminSidebar from "./AdminSidebar";
import AdminMobileHeader from "./AdminMobileHeader";
import AdminContent from "./AdminContent";

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
    // Utiliser localStorage pour éviter des redirections à répétition
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    
    const checkAdmin = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session) {
          // Si aucune session active et pas déjà authentifié dans localStorage
          if (!isAuthenticated) {
            navigate("/login");
            return;
          }
        } else {
          // Si une session est active, marquer comme authentifié
          localStorage.setItem('isAdminAuthenticated', 'true');
        }
      } catch (error) {
        console.error("Erreur lors de la vérification admin:", error);
        // On gère l'erreur mais on ne redirige pas forcément
      } finally {
        setLoading(false);
      }
    };
    
    checkAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('isAdminAuthenticated');
      navigate("/login");
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      toast({
        title: "Erreur",
        description: "Impossible de vous déconnecter",
        variant: "destructive",
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
        <AdminSidebar handleLogout={handleLogout} />
      </aside>

      {/* Content area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <AdminMobileHeader 
          isMobileMenuOpen={isMobileMenuOpen} 
          toggleMobileMenu={toggleMobileMenu} 
        />
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden p-4 border-t border-graphik-light-grey bg-graphik-grey animate-fade-in">
            <AdminSidebar 
              handleLogout={handleLogout} 
              isMobileMenuOpen={isMobileMenuOpen}
              onMobileMenuClose={() => setIsMobileMenuOpen(false)}
            />
          </div>
        )}

        {/* Main content */}
        <AdminContent>
          {children}
        </AdminContent>
      </div>
    </div>
  );
};

export default AdminLayout;
