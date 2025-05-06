
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionFormValues } from "../types/subscriptionFormTypes";
import { Subscription } from "@/types/subscription";
import { calculateEndDate } from "../utils/subscriptionFormUtils";

export const useSubscriptionFormHandlers = () => {
  const { toast } = useToast();
  
  const handleSubmit = async (
    data: SubscriptionFormValues, 
    subscription: Subscription, 
    onSuccess: () => void,
    onOpenChange: (open: boolean) => void
  ) => {
    if (!subscription) return;
    
    try {
      console.log("Starting manual validation process...");
      
      // Calculate the end date
      const endDate = calculateEndDate(data.startDate, data.durationMonths);
      
      // Debugging information
      console.log("Subscription data to update:", {
        service_type: data.serviceType,
        total_price: parseFloat(data.totalPrice),
        duration_months: parseInt(data.durationMonths),
        start_date: format(data.startDate, 'yyyy-MM-dd'),
        end_date: format(endDate, 'yyyy-MM-dd'),
        status: 'approved',
        updated_at: new Date().toISOString()
      });
      
      // Update the subscription - Make sure we're only updating the fields we need and using updated_at
      const { error } = await supabase
        .from('subscription_requests')
        .update({
          service_type: data.serviceType,
          total_price: parseFloat(data.totalPrice),
          duration_months: parseInt(data.durationMonths),
          start_date: format(data.startDate, 'yyyy-MM-dd'),
          end_date: format(endDate, 'yyyy-MM-dd'),
          status: 'approved',
          updated_at: new Date().toISOString() // This is the correct field name
        })
        .eq('id', subscription.id);
      
      if (error) {
        console.error("Error updating subscription:", error);
        throw error;
      }
      
      console.log("Subscription updated successfully, now creating payment record");
      
      // Create a payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          subscription_id: subscription.id,
          amount: parseFloat(data.totalPrice),
          payment_method: subscription.payment_method || 'Mobile Money',
          payment_status: 'pending'
        });
        
      if (paymentError) {
        console.error("Erreur lors de la création du paiement:", paymentError);
      } else {
        console.log("Payment record created successfully");
      }
      
      toast({
        title: "Abonnement validé",
        description: "Les informations d'abonnement ont été mises à jour avec succès",
      });
      
      onOpenChange(false);
      onSuccess();
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la validation manuelle:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'abonnement",
        variant: "destructive",
      });
      return false;
    }
  };
  
  return { handleSubmit };
};
