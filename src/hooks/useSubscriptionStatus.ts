
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Subscription } from "@/types/subscription";

export const useSubscriptionStatus = (
  subscriptions: Subscription[],
  onUpdate?: (updatedSubscriptions: Subscription[]) => void
) => {
  const [processingIds, setProcessingIds] = useState<number[]>([]);
  const { toast } = useToast();

  const updateSubscriptionStatus = async (id: number, status: 'approved' | 'rejected' | 'active' | 'suspended') => {
    try {
      setProcessingIds(prev => [...prev, id]);
      
      const { error } = await supabase
        .from('subscription_requests')
        .update({ 
          status, 
          updated_at: new Date().toISOString() // Using updated_at instead of modified_at
        })
        .eq('id', id);
        
      if (error) throw error;
      
      // Si le statut est approuvé, créer automatiquement un enregistrement de paiement en attente
      if (status === 'approved') {
        const subscription = subscriptions.find(sub => sub.id === id);
        
        if (subscription) {
          const { error: paymentError } = await supabase
            .from('payments')
            .insert({
              subscription_id: id,
              amount: subscription.total_price,
              payment_method: subscription.payment_method || 'Mobile Money',
              payment_status: 'pending'
            });
            
          if (paymentError) {
            console.error("Erreur lors de la création du paiement:", paymentError);
            // Continue execution even if payment creation fails
          }
        }
      }
      
      toast({
        title: status === 'approved' ? "Demande approuvée" : 
               status === 'rejected' ? "Demande rejetée" :
               status === 'active' ? "Abonnement activé" : "Abonnement suspendu",
        description: `La demande d'abonnement a été mise à jour avec succès.`,
        variant: status === 'rejected' || status === 'suspended' ? "destructive" : "default",
      });
      
      // Mettre à jour l'état local
      const updatedSubscriptions = subscriptions.map(sub => 
        sub.id === id ? { ...sub, status } : sub
      );
      
      if (onUpdate) {
        onUpdate(updatedSubscriptions);
      }
      
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du statut:`, error);
      toast({
        title: "Erreur",
        description: `Impossible de mettre à jour le statut de la demande`,
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => prev.filter(id_ => id_ !== id));
    }
  };

  return {
    processingIds,
    updateSubscriptionStatus
  };
};
