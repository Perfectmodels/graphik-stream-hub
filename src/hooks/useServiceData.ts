
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/subscription";

export const useServiceData = () => {
  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, name, description, base_price, category_id, active, featured, image_url')
        .order('name');
        
      if (error) throw error;
      
      if (data) {
        setServices(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des services:", error);
    }
  };

  return {
    services,
    fetchServices
  };
};
