
import { supabase } from "@/integrations/supabase/client";

export interface ServicePrice {
  id: number;
  service_type: string;
  duration_months: number;
  price: number;
  is_promo: boolean;
}

/**
 * Récupère les prix des services depuis la base de données
 */
export const fetchServicePrices = async (): Promise<ServicePrice[]> => {
  try {
    const { data, error } = await supabase
      .from('service_pricing')
      .select('*')
      .order('service_type')
      .order('duration_months');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des prix:", error);
    return [];
  }
};

/**
 * Obtient le prix d'un service pour une durée spécifique
 */
export const getServicePriceFromDB = async (serviceType: string, durationMonths: number): Promise<number | null> => {
  try {
    const { data, error } = await supabase
      .from('service_pricing')
      .select('price')
      .eq('service_type', serviceType)
      .eq('duration_months', durationMonths)
      .single();
      
    if (error) {
      console.error("Prix non trouvé, utilisation du calcul par défaut");
      return null;
    }
    
    return data.price;
  } catch (error) {
    console.error("Erreur lors de la récupération du prix:", error);
    return null;
  }
};
