
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
      console.log(`Requesting status update for subscription ${id} to status: ${status}`);
      
      // Check if admin status is cached in localStorage first
      const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated');
      
      // If not cached, verify with Supabase
      if (isAdminAuthenticated !== 'true') {
        console.log("No cached admin status found, checking with Supabase");
        
        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          toast({
            title: "Erreur d'authentification",
            description: "Une erreur s'est produite lors de la vérification de votre session.",
            variant: "destructive",
          });
          return;
        }
        
        if (!sessionData.session) {
          console.log("No active session found");
          toast({
            title: "Erreur d'authentification",
            description: "Vous devez être connecté pour vérifier le statut d'abonnement.",
            variant: "destructive",
          });
          return;
        }
        
        console.log("Active session found, checking admin status");
        
        // Verify admin status
        const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin', {
          user_id: sessionData.session.user.id
        });
        
        console.log("Admin check result:", { isAdmin, adminError });
        
        if (adminError) {
          console.error("Admin check error:", adminError);
          toast({
            title: "Erreur de vérification",
            description: "Impossible de vérifier vos droits d'administration.",
            variant: "destructive",
          });
          return;
        }
        
        if (!isAdmin) {
          console.log("User is not an admin");
          toast({
            title: "Accès non autorisé",
            description: "Vous n'avez pas les droits nécessaires pour effectuer cette action.",
            variant: "destructive",
          });
          return;
        }
        
        // Cache admin status
        console.log("Admin status confirmed, caching");
        localStorage.setItem('isAdminAuthenticated', 'true');
      } else {
        console.log("Using cached admin authentication");
      }
      
      console.log(`Updating subscription ${id} to status: ${status}`);
      
      // Here's the important change: explicitly specifying only the fields we want to update
      // and using 'updated_at' instead of 'modified_at'
      const { error } = await supabase
        .from('subscription_requests')
        .update({ 
          status: status,
          updated_at: new Date().toISOString() 
        })
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
