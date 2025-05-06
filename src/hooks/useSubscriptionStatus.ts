
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
      console.log(`Attempting to update subscription ${id} to status: ${status}`);
      
      // Force refresh the session from Supabase
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour modifier le statut d'un abonnement.",
          variant: "destructive",
        });
        return;
      }
      
      // Vérification directe de l'accès administrateur
      const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin', {
        user_id: sessionData.session.user.id
      });
      
      console.log("Admin check result:", { isAdmin, adminError });
      
      if (adminError || !isAdmin) {
        toast({
          title: "Accès non autorisé",
          description: "Vous n'avez pas les droits nécessaires pour effectuer cette action.",
          variant: "destructive",
        });
        return;
      }
      
      // Enregistrer dans localStorage pour éviter des vérifications répétées
      localStorage.setItem('isAdminAuthenticated', 'true');
      
      console.log(`Updating subscription ${id} to status: ${status}`);
      
      // Update subscription status
      const { error } = await supabase
        .from('subscription_requests')
        .update({ status })
        .eq('id', id);
        
      if (error) {
        console.error("Error updating subscription status:", error);
        throw error;
      }
      
      console.log(`Successfully updated subscription ${id} to status: ${status}`);
      
      // Create a payment record if status is approved
      if (status === 'approved') {
        const subscription = subscriptions.find(sub => sub.id === id);
        
        if (subscription) {
          console.log(`Creating payment record for subscription ${id}`);
          
          const { error: paymentError } = await supabase
            .from('payments')
            .insert({
              subscription_id: id,
              amount: subscription.total_price,
              payment_method: subscription.payment_method || 'Mobile Money',
              payment_status: 'pending'
            });
            
          if (paymentError) {
            console.error("Error creating payment record:", paymentError);
            // Continue execution even if payment creation fails
          } else {
            console.log(`Payment record created successfully for subscription ${id}`);
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
      
      // Update local state
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
