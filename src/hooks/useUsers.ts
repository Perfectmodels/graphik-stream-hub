
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserProfile } from "@/types/user";

export const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        navigate("/login");
        return;
      }
      
      const { data: adminData, error: adminError } = await supabase.rpc('is_admin', {
        user_id: session.session.user.id
      });
      
      if (adminError || adminData !== true) {
        toast({
          title: "Accès non autorisé",
          description: "Vous n'avez pas les droits d'administrateur",
          variant: "destructive",
        });
        navigate("/");
        return;
      }
      
      // Récupérer les profils utilisateurs depuis les demandes d'abonnement
      const { data: subscriptions, error: subError } = await supabase
        .from('subscription_requests')
        .select('id, full_name, email, phone, address, created_at')
        .order('created_at', { ascending: false });
        
      if (subError) throw subError;
      
      if (subscriptions) {
        // Convertir les données des abonnements en profils d'utilisateurs uniques
        const uniqueUsers: Record<string, UserProfile> = {};
        
        subscriptions.forEach(sub => {
          // Utiliser l'email comme clé unique
          if (!uniqueUsers[sub.email]) {
            uniqueUsers[sub.email] = {
              id: sub.id.toString(),
              full_name: sub.full_name,
              email: sub.email,
              phone: sub.phone,
              address: sub.address || '',
              created_at: sub.created_at
            };
          }
        });
        
        setUsers(Object.values(uniqueUsers));
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des utilisateurs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, fetchUsers };
};
