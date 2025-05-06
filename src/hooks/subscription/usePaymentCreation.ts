
import { supabase } from "@/integrations/supabase/client";
import { Subscription } from "@/types/subscription";
import { useToast } from "@/hooks/use-toast";

export const usePaymentCreation = () => {
  const { toast } = useToast();

  const createPaymentRecord = async (subscription: Subscription): Promise<boolean> => {
    try {
      console.log(`Creating payment record for subscription ${subscription.id}`);
      
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          subscription_id: subscription.id,
          amount: subscription.total_price,
          payment_method: subscription.payment_method || 'Mobile Money',
          payment_status: 'pending',
          created_at: new Date().toISOString()
        });
        
      if (paymentError) {
        console.error("Error creating payment record:", paymentError);
        toast({
          title: "Erreur",
          description: "Impossible de créer l'enregistrement de paiement",
          variant: "destructive",
        });
        return false;
      }
      
      console.log(`Payment record created successfully for subscription ${subscription.id}`);
      return true;
    } catch (error) {
      console.error("Error in payment creation:", error);
      return false;
    }
  };

  return {
    createPaymentRecord,
  };
};
