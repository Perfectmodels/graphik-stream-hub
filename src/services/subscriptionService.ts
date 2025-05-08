
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionFormValues, getServicePrice } from "@/utils/subscriptionUtils";
import { format } from "date-fns";

export const sendSubscriptionDocuments = async (subscriptionId: number, subscriptionData: any): Promise<boolean> => {
  try {
    // Attempt to invoke the edge function if available
    try {
      const { error } = await supabase.functions.invoke('send-subscription', {
        body: { subscriptionId },
      });
      
      if (error) {
        console.error("Error sending notification:", error);
        toast.error("Error", {
          description: "WhatsApp notification couldn't be sent. Our team will contact you shortly."
        });
      }
    } catch (functionError) {
      console.log("Edge function not available or errored:", functionError);
      // Continue with WhatsApp message creation even if the function fails
    }
    
    // Build WhatsApp message with detailed information
    const message = encodeURIComponent(`🎮 *NOUVELLE DEMANDE D'ABONNEMENT* 🎮\n\n` +
      `*Client:* ${subscriptionData.full_name}\n` +
      `*Téléphone:* ${subscriptionData.phone}\n` +
      `*Email:* ${subscriptionData.email}\n` +
      `*Service:* ${subscriptionData.service_type}\n` +
      `*Durée:* ${subscriptionData.duration_months} mois\n` +
      `*Prix total:* ${subscriptionData.total_price} FCFA\n` +
      `*Paiement:* ${subscriptionData.payment_method}\n\n` +
      `*Date de début:* ${subscriptionData.start_date}\n` +
      `*Date de fin:* ${subscriptionData.end_date}\n` +
      (subscriptionData.address ? `*Adresse:* ${subscriptionData.address}\n` : "") +
      (subscriptionData.additional_info ? `\n*Informations supplémentaires:*\n${subscriptionData.additional_info}\n` : "") +
      `\n*ID de la demande:* ${subscriptionId}`);
    
    // Open WhatsApp in a new window
    const whatsappNumber = "+24174066461";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success("Demande envoyée", {
      description: "Les détails de votre demande ont été envoyés. Vous serez redirigé vers WhatsApp."
    });
    return true;
  } catch (error) {
    console.error("Error calling function:", error);
    toast.error("Erreur", {
      description: "La notification WhatsApp n'a pas pu être envoyée. Notre équipe vous contactera sous peu."
    });
    return false;
  }
};

export const submitSubscriptionForm = async (values: SubscriptionFormValues) => {
  // Calculate total price
  const totalPrice = getServicePrice(values.serviceType, values.durationMonths);
  
  // Use the start date provided by the user
  const startDate = values.startDate;
  
  // Calculate end date based on chosen duration
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + parseInt(values.durationMonths));
  
  // Prepare data
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
    status: "approved" // Changed from "pending" to "approved" for auto-approval
  };
  
  try {
    // Send to Supabase
    const { data, error } = await supabase
      .from('subscription_requests')
      .insert(subscriptionData)
      .select()
      .single();
      
    if (error) throw error;

    console.log("Subscription created:", data);

    // Create an approval record directly in the same transaction
    // This is now done in a separate step to avoid RLS issues
    const now = new Date().toISOString();
    const approvalData = {
      subscription_id: data.id,
      status: 'approved' as const,
      approval_date: now
    };

    console.log("Creating approval with data:", approvalData);
    
    // Insert the approval record
    const { error: approvalError } = await supabase
      .from('subscription_approvals')
      .insert(approvalData);
    
    if (approvalError) {
      console.error("Error creating approval:", approvalError);
      // We'll continue anyway since the subscription was created successfully
      // The approval can be created later by an admin
    } else {
      console.log("Approval created successfully");
    }

    // Send details via WhatsApp
    await sendSubscriptionDocuments(data.id, subscriptionData);

    return data;
  } catch (error) {
    console.error("Error submitting subscription form:", error);
    throw error;
  }
};
