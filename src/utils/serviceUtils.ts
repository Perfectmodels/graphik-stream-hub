
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
    // Call the database function through a PostgreSQL query instead of RPC
    const { data, error } = await supabase
      .from('service_pricing')
      .select('id, service_type, duration_months, price, is_promo')
      .order('service_type', { ascending: true })
      .order('duration_months', { ascending: true });
      
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
    // Query directly instead of using RPC
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
    
    // Safely access the price property
    return data && 'price' in data ? (data.price as number) : null;
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
    // Update directly instead of using RPC
    const { error } = await supabase
      .from('service_pricing')
      .update({ 
        price: newPrice,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du prix:", error);
    return false;
  }
};
