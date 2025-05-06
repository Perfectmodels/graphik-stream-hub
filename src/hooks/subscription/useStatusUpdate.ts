
import { supabase } from "@/integrations/supabase/client";
import { Subscription } from "@/types/subscription";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuthentication } from "./useAdminAuthentication";
import { usePaymentCreation } from "./usePaymentCreation";

export const useStatusUpdate = () => {
  const { toast } = useToast();
  const { verifyAdminStatus } = useAdminAuthentication();
  const { createPaymentRecord } = usePaymentCreation();

  const updateSubscriptionStatusInDb = async (
    id: number,
    status: 'approved' | 'rejected' | 'active' | 'suspended'
  ): Promise<boolean> => {
    try {
      console.log(`Updating subscription ${id} to status: ${status}`);
      
      const { error } = await supabase
        .from('subscription_requests')
        .update({ 
          status: status,
          updated_at: new Date().toISOString() // Corriger cette ligne, utilisez updated_at au lieu de modified_at
        })
        .eq('id', id);
        
      if (error) {
        console.error("Error updating subscription status:", error);
        return false;
      }
      
      console.log(`Successfully updated subscription ${id} to status: ${status}`);
      return true;
    } catch (error) {
      console.error("Error updating subscription status in database:", error);
      return false;
    }
  };

  const handleStatusUpdate = async (
    id: number,
    status: 'approved' | 'rejected' | 'active' | 'suspended',
    subscription: Subscription
  ): Promise<boolean> => {
    try {
      // Verify admin status first
      const isAdmin = await verifyAdminStatus();
      if (!isAdmin) {
        toast({
          title: "Accès non autorisé",
          description: "Vous n'avez pas les droits d'administrateur",
          variant: "destructive",
        });
        return false;
      }
      
      // Update subscription status in database
      const updated = await updateSubscriptionStatusInDb(id, status);
      if (!updated) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le statut de l'abonnement",
          variant: "destructive",
        });
        return false;
      }
      
      // Create a payment record if status is approved
      if (status === 'approved') {
        await createPaymentRecord(subscription);
      }
      
      return true;
    } catch (error) {
      console.error("Error in handleStatusUpdate:", error);
      return false;
    }
  };

  return {
    handleStatusUpdate,
  };
};
