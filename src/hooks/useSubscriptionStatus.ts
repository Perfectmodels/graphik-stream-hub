
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Subscription } from "@/types/subscription";
import { useStatusUpdate } from "./subscription/useStatusUpdate";

export const useSubscriptionStatus = (
  subscriptions: Subscription[],
  onUpdate?: (updatedSubscriptions: Subscription[]) => void
) => {
  const [processingIds, setProcessingIds] = useState<number[]>([]);
  const { toast } = useToast();
  const { handleStatusUpdate } = useStatusUpdate();

  const updateSubscriptionStatus = async (id: number, status: 'approved' | 'rejected' | 'active' | 'suspended') => {
    try {
      setProcessingIds(prev => [...prev, id]);
      console.log(`Requesting status update for subscription ${id} to status: ${status}`);
      
      // Find the subscription in the array
      const subscription = subscriptions.find(sub => sub.id === id);
      
      if (!subscription) {
        console.error(`Subscription ${id} not found in local state`);
        toast({
          title: "Erreur",
          description: "Impossible de trouver l'abonnement spécifié",
          variant: "destructive",
        });
        return;
      }
      
      // Handle the status update
      const success = await handleStatusUpdate(id, status, subscription);
      
      if (success) {
        toast({
          title: status === 'approved' ? "Demande approuvée" : 
                status === 'rejected' ? "Demande rejetée" :
                status === 'active' ? "Abonnement activé" : "Abonnement suspendu",
          description: `La demande d'abonnement a été mise à jour avec succès.`,
          variant: status === 'rejected' || status === 'suspended' ? "destructive" : "default",
        });
        
        // Update local state
        const updatedSubscriptions = subscriptions.map(sub => 
          sub.id === id ? { ...sub, status } : sub
        );
        
        if (onUpdate) {
          onUpdate(updatedSubscriptions);
        }
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
