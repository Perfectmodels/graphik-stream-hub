
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type StatData = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  byService: Record<string, number>;
  byDuration: Record<string, number>;
  monthlyRevenue: Record<string, number>;
};

export const useSubscriptionStats = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatData>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    byService: {},
    byDuration: {},
    monthlyRevenue: {},
  });
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all subscriptions
      const { data: subscriptions, error } = await supabase
        .from("subscription_requests")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Process data for stats
      const stats: StatData = {
        total: subscriptions?.length || 0,
        pending: 0,
        approved: 0, 
        rejected: 0,
        byService: {},
        byDuration: {},
        monthlyRevenue: {},
      };
      
      // Process each subscription
      subscriptions?.forEach(sub => {
        // Status counts
        if (sub.status === 'pending') stats.pending++;
        else if (sub.status === 'approved') stats.approved++;
        else if (sub.status === 'rejected') stats.rejected++;
        
        // Service type counts
        if (stats.byService[sub.service_type]) {
          stats.byService[sub.service_type]++;
        } else {
          stats.byService[sub.service_type] = 1;
        }
        
        // Duration counts
        const duration = `${sub.duration_months} mois`;
        if (stats.byDuration[duration]) {
          stats.byDuration[duration]++;
        } else {
          stats.byDuration[duration] = 1;
        }
        
        // Monthly revenue - group by month
        if (sub.created_at) {
          const date = new Date(sub.created_at);
          const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
          
          if (stats.monthlyRevenue[monthYear]) {
            stats.monthlyRevenue[monthYear] += Number(sub.total_price) || 0;
          } else {
            stats.monthlyRevenue[monthYear] = Number(sub.total_price) || 0;
          }
        }
      });
      
      setStats(stats);
    } catch (error) {
      console.error("Error fetching subscription stats:", error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les statistiques d'abonnement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchStats();
  }, []);

  return {
    loading,
    stats,
    fetchStats
  };
};
