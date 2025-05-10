
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
    // Use the RPC function to get service prices
    const { data, error } = await supabase.rpc('get_service_prices');
      
    if (error) throw error;
    return (data as ServicePrice[]) || [];
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
    // Use the RPC function to get a specific service price
    const { data, error } = await supabase.rpc('get_service_price', {
      p_service_type: serviceType,
      p_duration_months: durationMonths
    });
      
    if (error) {
      console.error("Prix non trouvé, utilisation du calcul par défaut");
      return null;
    }
    
    // The RPC function returns an array with a single object that has a 'price' property
    return data && data.length > 0 ? (data[0].price as number) : null;
  } catch (error) {
    console.error("Erreur lors de la récupération du prix:", error);
    return null;
  }
};

/**
 * Met à jour le prix d'un service
 */
export const updateServicePrice = async (id: number, newPrice: number): Promise<boolean> => {
  try {
    // Use the RPC function to update a service price
    const { error } = await supabase.rpc('update_service_price', {
      p_id: id,
      p_price: newPrice
    });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du prix:", error);
    return false;
  }
};
