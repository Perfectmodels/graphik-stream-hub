
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type DashboardNotification = {
  id: string;
  title: string;
  message: string;
  notification_type: 'info' | 'warning' | 'alert' | 'success';
  is_read: boolean;
  created_at: string;
};

export const useDashboardNotifications = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<DashboardNotification[]>([]);
  const { toast } = useToast();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('dashboard_notifications')
        .select('*')
        .eq('is_read', false)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setNotifications(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des notifications:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les notifications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('dashboard_notifications')
        .update({ is_read: true })
        .eq('id', notificationId);
      
      if (error) throw error;
      
      // Mise à jour de l'état local
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      
      toast({
        title: "Notification marquée comme lue",
        description: "La notification a été archivée",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la notification:", error);
      toast({
        title: "Erreur",
        description: "Impossible de marquer la notification comme lue",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    loading,
    notifications,
    fetchNotifications,
    markAsRead
  };
};
