
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAdminAuthentication = () => {
  const { toast } = useToast();

  const verifyAdminStatus = async (): Promise<boolean> => {
    try {
      // Check if admin status is cached in localStorage first
      const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated');
      
      // If cached, use that result
      if (isAdminAuthenticated === 'true') {
        console.log("Using cached admin authentication");
        return true;
      }
      
      console.log("No cached admin status found, checking with Supabase");
      
      // Get current session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        toast({
          title: "Erreur d'authentification",
          description: "Une erreur s'est produite lors de la vérification de votre session.",
          variant: "destructive",
        });
        return false;
      }
      
      if (!sessionData.session) {
        console.log("No active session found");
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour vérifier le statut d'abonnement.",
          variant: "destructive",
        });
        return false;
      }
      
      console.log("Active session found, checking admin status");
      
      // Verify admin status
      const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin', {
        user_id: sessionData.session.user.id
      });
      
      console.log("Admin check result:", { isAdmin, adminError });
      
      if (adminError) {
        console.error("Admin check error:", adminError);
        toast({
          title: "Erreur de vérification",
          description: "Impossible de vérifier vos droits d'administration.",
          variant: "destructive",
        });
        return false;
      }
      
      if (!isAdmin) {
        console.log("User is not an admin");
        toast({
          title: "Accès non autorisé",
          description: "Vous n'avez pas les droits nécessaires pour effectuer cette action.",
          variant: "destructive",
        });
        return false;
      }
      
      // Cache admin status
      console.log("Admin status confirmed, caching");
      localStorage.setItem('isAdminAuthenticated', 'true');
      return true;
    } catch (error) {
      console.error("Error verifying admin status:", error);
      return false;
    }
  };

  return {
    verifyAdminStatus,
  };
};
