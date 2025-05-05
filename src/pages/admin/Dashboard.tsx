
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import SubscriptionStats from "@/components/admin/SubscriptionStats";
import DashboardWelcomeCard from "@/components/admin/DashboardWelcomeCard";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Tableau de bord administrateur</h2>
        
        <SubscriptionStats />
        
        <DashboardWelcomeCard />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
