
import React from "react";
import { BarChart as BarChartIcon } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAnalyticsData } from "@/hooks/admin/useAnalyticsData";
import StatsCardSection from "@/components/admin/analytics/StatsCardSection";
import ActivityChart from "@/components/admin/analytics/ActivityChart";
import SubscriptionChart from "@/components/admin/analytics/SubscriptionChart";
import RevenueChart from "@/components/admin/analytics/RevenueChart";

const AdminAnalytics = () => {
  const {
    activitiesLoading,
    statsLoading,
    period,
    setPeriod,
    activityData,
    todayActivities,
    subscriptionData,
    revenueData,
    totalUsers,
    monthlyRevenue,
    activeSubscriptions
  } = useAnalyticsData();

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <BarChartIcon className="mr-2 h-6 w-6 text-graphik-purple" />
        Statistiques et Analytique
      </h2>
      
      <StatsCardSection
        totalUsers={totalUsers}
        monthlyRevenue={monthlyRevenue}
        activeSubscriptions={activeSubscriptions}
        todayActivities={todayActivities}
      />
      
      <Tabs defaultValue="activities" className="mb-6">
        <TabsList className="bg-graphik-light-grey/20">
          <TabsTrigger value="activities">Activités</TabsTrigger>
          <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities" className="mt-4">
          <ActivityChart
            activitiesLoading={activitiesLoading}
            activityData={activityData}
            period={period}
            setPeriod={setPeriod}
          />
        </TabsContent>
        
        <TabsContent value="subscriptions" className="mt-4">
          <SubscriptionChart
            loading={statsLoading}
            data={subscriptionData}
          />
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-4">
          <RevenueChart
            loading={statsLoading}
            data={revenueData}
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminAnalytics;
