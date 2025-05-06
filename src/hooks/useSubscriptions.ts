
import { useState, useEffect } from "react";
import { useSubscriptionData } from "./useSubscriptionData";
import { useServiceData } from "./useServiceData";
import { useSubscriptionStatus } from "./useSubscriptionStatus";
import { useSubscriptionNotes } from "./useSubscriptionNotes";
import { Subscription } from "@/types/subscription";

export const useSubscriptions = () => {
  const { loading, subscriptions: fetchedSubscriptions, fetchSubscriptions } = useSubscriptionData();
  const { services, fetchServices } = useServiceData();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  
  const { processingIds, updateSubscriptionStatus } = useSubscriptionStatus(
    subscriptions,
    (updatedSubscriptions) => {
      setSubscriptions(updatedSubscriptions);
      // Refresh data from the server after updating
      setTimeout(() => {
        fetchSubscriptions();
      }, 1000); // Small delay to ensure database update is complete
    }
  );
  
  const { addNote } = useSubscriptionNotes(fetchSubscriptions);

  // Update local state when subscriptions are fetched
  useEffect(() => {
    setSubscriptions(fetchedSubscriptions);
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
