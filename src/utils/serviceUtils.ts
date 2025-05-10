
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
    // Use the rpc method to call the stored function
    const { data, error } = await supabase.rpc('get_service_prices');
      
    if (error) throw error;
    return data as ServicePrice[] || [];
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
    // Call the stored function with parameters
    const { data, error } = await supabase.rpc('get_service_price', {
      p_service_type: serviceType,
      p_duration_months: durationMonths
    });
      
    if (error) {
      console.error("Prix non trouvé, utilisation du calcul par défaut");
      return null;
    }
    
    // Ensure we handle the returned data correctly
    return data && typeof data === 'object' && 'price' in data ? data.price : null;
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
    // Call the stored function with parameters
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
