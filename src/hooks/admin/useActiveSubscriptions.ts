
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useActiveSubscriptions = () => {
  const { data: activeSubscriptions, isLoading } = useQuery({
    queryKey: ['activeSubscriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_requests')
        .select('*')
        .in('status', ['active', 'approved'])
        .order('end_date', { ascending: true });
        
      if (error) throw error;
      return data || [];
    }
  });

  return {
    activeSubscriptions,
    isLoading
  };
};
