
import { useState, useEffect } from "react";
import { useSalesTargets } from "@/hooks/admin/useSalesTargets";
import { useUserActivities } from "@/hooks/admin/useUserActivities";

export const useDashboardData = () => {
  const { targets, loading: targetsLoading, fetchTargets } = useSalesTargets();
  const { activities, loading: activitiesLoading, fetchActivities } = useUserActivities();

  // Filtrer pour n'obtenir que les objectifs en cours et non complétés
  const activeTargets = targets
    .filter(target => {
      const now = new Date();
      const endDate = new Date(target.end_date);
      return endDate >= now && target.current_value < target.target_value;
    })
    .slice(0, 3); // Limiter à 3 objectifs pour le tableau de bord

  useEffect(() => {
    fetchTargets();
    fetchActivities();
  }, []);

  return {
    activeTargets,
    targetsLoading,
    activities,
    activitiesLoading
  };
};
