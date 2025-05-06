
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type SalesTarget = {
  id: string;
  target_name: string;
  target_description?: string;
  target_value: number;
  current_value: number;
  target_period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
};

export const useSalesTargets = () => {
  const [loading, setLoading] = useState(true);
  const [targets, setTargets] = useState<SalesTarget[]>([]);
  const { toast } = useToast();

  const fetchTargets = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('sales_targets')
        .select('*')
        .order('end_date', { ascending: false });
      
      if (error) throw error;
      
      setTargets(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des objectifs:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les objectifs de vente",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTargetProgress = async (targetId: string, newValue: number) => {
    try {
      const { error } = await supabase
        .from('sales_targets')
        .update({
          current_value: newValue,
          updated_at: new Date().toISOString()
        })
        .eq('id', targetId);
      
      if (error) throw error;
      
      // Mise à jour de l'état local
      setTargets(prev => prev.map(target => 
        target.id === targetId ? { ...target, current_value: newValue } : target
      ));
      
      toast({
        title: "Objectif mis à jour",
        description: "La progression de l'objectif a été mise à jour",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'objectif:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'objectif",
        variant: "destructive",
      });
    }
  };

  const createTarget = async (target: Omit<SalesTarget, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('sales_targets')
        .insert({
          ...target,
        })
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Mise à jour de l'état local
        setTargets(prev => [...prev, data[0]]);
        
        toast({
          title: "Objectif créé",
          description: "Un nouvel objectif a été créé avec succès",
        });
        
        return data[0];
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'objectif:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'objectif",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  return {
    loading,
    targets,
    fetchTargets,
    updateTargetProgress,
    createTarget
  };
};
