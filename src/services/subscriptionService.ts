
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionFormValues, getServicePrice } from "@/utils/subscriptionUtils";
import { format } from "date-fns";

export const sendSubscriptionDocuments = async (subscriptionId: number, subscriptionData: any): Promise<boolean> => {
  try {
    const { error } = await supabase.functions.invoke('send-subscription', {
      body: { subscriptionId },
    });
    
    if (error) {
      console.error("Erreur lors de l'envoi de la notification:", error);
      toast.error("Erreur", {
        description: "La notification WhatsApp n'a pas pu être envoyée. Notre équipe vous contactera sous peu."
      });
      return false;
    }
    
    // Construction du message WhatsApp
    const message = encodeURIComponent(`🎮 *NOUVELLE DEMANDE D'ABONNEMENT* 🎮\n\n` +
      `*Client:* ${subscriptionData.full_name}\n` +
      `*Téléphone:* ${subscriptionData.phone}\n` +
      `*Email:* ${subscriptionData.email}\n` +
      `*Service:* ${subscriptionData.service_type}\n` +
      `*Durée:* ${subscriptionData.duration_months} mois\n` +
      `*Prix total:* ${subscriptionData.total_price} FCFA\n` +
      `*Paiement:* ${subscriptionData.payment_method}\n\n` +
      `Date de début: ${subscriptionData.start_date}\n` +
      `Date de fin: ${subscriptionData.end_date}\n` +
      (subscriptionData.address ? `Adresse: ${subscriptionData.address}\n` : "") +
      (subscriptionData.additional_info ? `\n*Informations supplémentaires:*\n${subscriptionData.additional_info}\n` : "") +
      `\n*ID de la demande:* ${subscriptionId}`);
    
    // Ouverture de WhatsApp dans une nouvelle fenêtre
    const whatsappNumber = "+24174066461";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success("Demande envoyée", {
      description: "Les détails de votre demande ont été envoyés. Vous allez être redirigé vers WhatsApp."
    });
    return true;
  } catch (error) {
    console.error("Erreur lors de l'appel à la fonction:", error);
    toast.error("Erreur", {
      description: "La notification WhatsApp n'a pas pu être envoyée. Notre équipe vous contactera sous peu."
    });
    return false;
  }
};

export const submitSubscriptionForm = async (values: SubscriptionFormValues) => {
  // Calcul du prix total
  const totalPrice = getServicePrice(values.serviceType, values.durationMonths);
  
  // Utiliser la date de début fournie par l'utilisateur
  const startDate = values.startDate;
  
  // Calcul de la date de fin basée sur la durée choisie
  const endDate = new Date(startDate);
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
    start_date: format(startDate, 'yyyy-MM-dd'),
    end_date: format(endDate, 'yyyy-MM-dd'),
    status: "approved" // Changé de "pending" à "approved" pour approbation automatique
  };
  
  // Envoi à Supabase
  const { data, error } = await supabase
    .from('subscription_requests')
    .insert(subscriptionData)
    .select()
    .single();
    
  if (error) throw error;

  // Envoi des détails par WhatsApp
  await sendSubscriptionDocuments(data.id, subscriptionData);

  return data;
};
