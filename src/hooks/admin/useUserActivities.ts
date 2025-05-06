
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type UserActivity = {
  id: string;
  user_id: string;
  activity_type: string;
  activity_data?: any;
  ip_address?: string;
  device_info?: string;
  created_at: string;
};

export const useUserActivities = () => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const { toast } = useToast();

  const fetchActivities = async (userId?: string, limit = 50) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('user_activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (userId) {
        query = query.eq('user_id', userId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setActivities(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des activités:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les activités utilisateur",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logActivity = async (
    userId: string,
    activityType: string,
    activityData?: any,
    ipAddress?: string,
    deviceInfo?: string
  ) => {
    try {
      const { error } = await supabase
        .from('user_activities')
        .insert({
          user_id: userId,
          activity_type: activityType,
          activity_data: activityData,
          ip_address: ipAddress,
          device_info: deviceInfo
        });
      
      if (error) throw error;
      
      console.log(`Activité utilisateur enregistrée: ${activityType}`);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'activité:", error);
    }
  };

  return {
    loading,
    activities,
    fetchActivities,
    logActivity
  };
};
