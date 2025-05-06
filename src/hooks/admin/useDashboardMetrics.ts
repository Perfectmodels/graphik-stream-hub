
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type DashboardMetric = {
  id: string;
  metric_name: string;
  metric_value: number;
  metric_period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
};

export const useDashboardMetrics = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const { toast } = useToast();

  const fetchMetrics = async (period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly') => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('dashboard_metrics')
        .select('*')
        .eq('metric_period', period)
        .order('end_date', { ascending: false });
      
      if (error) throw error;
      
      // Conversion explicite des données pour correspondre au type DashboardMetric
      const typedMetrics: DashboardMetric[] = data?.map(item => ({
        ...item,
        metric_period: item.metric_period as 'daily' | 'weekly' | 'monthly' | 'yearly'
      })) || [];
      
      setMetrics(typedMetrics);
    } catch (error) {
      console.error("Erreur lors du chargement des métriques:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les métriques du dashboard",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMetric = async (metric: Partial<DashboardMetric> & { id: string }) => {
    try {
      const { error } = await supabase
        .from('dashboard_metrics')
        .update({
          metric_value: metric.metric_value,
          updated_at: new Date().toISOString()
        })
        .eq('id', metric.id);
      
      if (error) throw error;
      
      // Mise à jour de l'état local
      setMetrics(prev => prev.map(m => 
        m.id === metric.id ? { ...m, ...metric } : m
      ));
      
      toast({
        title: "Métrique mise à jour",
        description: "La métrique a été mise à jour avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la métrique:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la métrique",
        variant: "destructive",
      });
    }
  };

  return {
    loading,
    metrics,
    fetchMetrics,
    updateMetric
  };
};
