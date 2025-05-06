
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import SubscriptionStats from "@/components/admin/SubscriptionStats";
import { useActiveSubscriptions } from "@/hooks/admin/useActiveSubscriptions";
import { useDashboardData } from "@/hooks/admin/useDashboardData";
import DashboardCardsSection from "@/components/admin/dashboard/DashboardCardsSection";
import ActiveSubscriptionsList from "@/components/admin/dashboard/ActiveSubscriptionsList";

const AdminDashboard = () => {
  const { activeSubscriptions, isLoading } = useActiveSubscriptions();
  const { activeTargets, targetsLoading, activities, activitiesLoading } = useDashboardData();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Tableau de bord administrateur</h2>
        
        <SubscriptionStats />
        
        <DashboardCardsSection 
          activeTargets={activeTargets}
          targetsLoading={targetsLoading}
          activities={activities}
          activitiesLoading={activitiesLoading}
        />

        <ActiveSubscriptionsList 
          activeSubscriptions={activeSubscriptions || []}
          isLoading={isLoading}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
