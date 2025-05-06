
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type StatData = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  active: number;
  suspended: number;
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
    active: 0,
    suspended: 0,
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
      const statsCopy: StatData = {
        total: subscriptions?.length || 0,
        pending: 0,
        approved: 0, 
        rejected: 0,
        active: 0,
        suspended: 0,
        byService: {},
        byDuration: {},
        monthlyRevenue: {},
      };
      
      // Process each subscription
      subscriptions?.forEach(sub => {
        // Status counts
        if (sub.status === 'pending') statsCopy.pending++;
        else if (sub.status === 'approved') statsCopy.approved++;
        else if (sub.status === 'rejected') statsCopy.rejected++;
        else if (sub.status === 'active') statsCopy.active++;
        else if (sub.status === 'suspended') statsCopy.suspended++;
        
        // Service type counts
        if (statsCopy.byService[sub.service_type]) {
          statsCopy.byService[sub.service_type]++;
        } else {
          statsCopy.byService[sub.service_type] = 1;
        }
        
        // Duration counts
        const duration = `${sub.duration_months} mois`;
        if (statsCopy.byDuration[duration]) {
          statsCopy.byDuration[duration]++;
        } else {
          statsCopy.byDuration[duration] = 1;
        }
        
        // Monthly revenue - group by month
        if (sub.created_at) {
          const date = new Date(sub.created_at);
          const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
          
          if (statsCopy.monthlyRevenue[monthYear]) {
            statsCopy.monthlyRevenue[monthYear] += Number(sub.total_price) || 0;
          } else {
            statsCopy.monthlyRevenue[monthYear] = Number(sub.total_price) || 0;
          }
        }
      });
      
      setStats(statsCopy);
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
