
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Subscription, PaymentStatus, SubscriptionStatus } from "@/types/subscription";

export const useSubscriptionData = () => {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchSubscriptions = async () => {
    try {
      // Vérifier si l'utilisateur est authentifié comme admin via localStorage
      const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
      
      if (isAuthenticated !== 'true') {
        // Vérifier la session Supabase seulement si pas déjà authentifié
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
        
        // Stocker l'authentification
        localStorage.setItem('isAdminAuthenticated', 'true');
      }
      
      const { data, error } = await supabase
        .from('subscription_requests')
        .select(`
          *,
          payments:payments(id, payment_status),
          admin_notes:admin_notes(id, note)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        // Convertit les données pour correspondre au type Subscription
        const typedData: Subscription[] = data.map(item => ({
          id: item.id,
          full_name: item.full_name,
          email: item.email,
          phone: item.phone,
          service_type: item.service_type,
          status: item.status as SubscriptionStatus,
          total_price: item.total_price,
          created_at: item.created_at || "",
          start_date: item.start_date || "",
          end_date: item.end_date || "",
          duration_months: item.duration_months,
          has_payment: item.payments && item.payments.length > 0,
          payment_status: (item.payments && item.payments.length > 0 ? 
            item.payments[0].payment_status as PaymentStatus : null),
          has_notes: item.admin_notes && item.admin_notes.length > 0,
          payment_method: item.payment_method,
          address: item.address || ""
        }));
        
        setSubscriptions(typedData);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des abonnements:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des abonnements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    subscriptions,
    fetchSubscriptions,
  };
};
