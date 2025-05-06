
import { useState, useEffect } from "react";
import { useSubscriptionData } from "./useSubscriptionData";
import { useServiceData } from "./useServiceData";
import { useSubscriptionStatus } from "./useSubscriptionStatus";
import { useSubscriptionNotes } from "./useSubscriptionNotes";
import { Subscription } from "@/types/subscription";
import { useToast } from "@/hooks/use-toast";

export const useSubscriptions = () => {
  const { loading, subscriptions: fetchedSubscriptions, fetchSubscriptions } = useSubscriptionData();
  const { services, fetchServices } = useServiceData();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { toast } = useToast();
  
  const { processingIds, updateSubscriptionStatus } = useSubscriptionStatus(
    subscriptions,
    (updatedSubscriptions) => {
      try {
        console.log("Subscription status updated, refreshing data");
        setSubscriptions(updatedSubscriptions);
        // Refresh data from the server after updating
        setTimeout(() => {
          console.log("Fetching fresh subscription data");
          fetchSubscriptions()
            .then(() => console.log("Fresh data fetched successfully"))
            .catch(err => {
              console.error("Error fetching fresh data:", err);
              toast({
                title: "Erreur de rafraîchissement",
                description: "Impossible de rafraîchir les données des abonnements",
                variant: "destructive",
              });
            });
        }, 1000); // Small delay to ensure database update is complete
      } catch (error) {
        console.error("Error in subscription update callback:", error);
      }
    }
  );
  
  const { addNote } = useSubscriptionNotes(fetchSubscriptions);

  // Update local state when subscriptions are fetched
  useEffect(() => {
    if (fetchedSubscriptions.length > 0) {
      console.log(`Setting ${fetchedSubscriptions.length} subscriptions to local state`);
      setSubscriptions(fetchedSubscriptions);
    }
  }, [fetchedSubscriptions]);

  return {
    loading,
    subscriptions,
    services,
    processingIds,
    fetchSubscriptions,
    fetchServices,
    updateSubscriptionStatus,
    addNote
  };
};
