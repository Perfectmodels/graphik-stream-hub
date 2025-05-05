
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionFormValues, getServicePrice } from "@/utils/subscriptionUtils";

export const sendSubscriptionDocuments = async (subscriptionId: number): Promise<boolean> => {
  try {
    const { error } = await supabase.functions.invoke('send-subscription', {
      body: { subscriptionId },
    });
    
    if (error) {
      console.error("Erreur lors de l'envoi des documents:", error);
      toast.error("Erreur", {
        description: "Les documents n'ont pas pu être envoyés. Notre équipe vous contactera sous peu."
      });
      return false;
    }
    
    toast.success("Documents envoyés", {
      description: "Les détails de votre demande ont été envoyés à votre email et WhatsApp."
    });
    return true;
  } catch (error) {
    console.error("Erreur lors de l'appel à la fonction:", error);
    toast.error("Erreur", {
      description: "Les documents n'ont pas pu être envoyés. Notre équipe vous contactera sous peu."
    });
    return false;
  }
};

export const submitSubscriptionForm = async (values: SubscriptionFormValues) => {
  // Calcul du prix total
  const totalPrice = getServicePrice(values.serviceType, values.durationMonths);
  
  // Calcul des dates
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + parseInt(values.durationMonths));
  
  // Préparation des données
  const subscriptionData = {
    full_name: values.fullName,
    email: values.email,
    phone: values.phone,
    address: values.address,
    service_type: values.serviceType,
    duration_months: parseInt(values.durationMonths),
    payment_method: values.paymentMethod,
    additional_info: values.additionalInfo,
    total_price: totalPrice,
    start_date: startDate.toISOString().split('T')[0],
    end_date: endDate.toISOString().split('T')[0],
    status: "pending"
  };
  
  // Envoi à Supabase
  const { data, error } = await supabase
    .from('subscription_requests')
    .insert(subscriptionData)
    .select()
    .single();
    
  if (error) throw error;

  return data;
};
