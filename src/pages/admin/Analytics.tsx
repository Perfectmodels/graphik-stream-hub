
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAnalyticsData } from "@/hooks/admin/useAnalyticsData";

// Import our new components
import AnalyticsHeader from "@/components/admin/analytics/AnalyticsHeader";
import StatsCardSection from "@/components/admin/analytics/StatsCardSection";
import AnalyticsTabs from "@/components/admin/analytics/AnalyticsTabs";
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
      <AnalyticsHeader />
      
      <StatsCardSection
        totalUsers={totalUsers}
        monthlyRevenue={monthlyRevenue}
        activeSubscriptions={activeSubscriptions}
        todayActivities={todayActivities}
      />
      
      <AnalyticsTabs
        activitiesContent={
          <ActivityChart
            activitiesLoading={activitiesLoading}
            activityData={activityData}
            period={period}
            setPeriod={setPeriod}
          />
        }
        subscriptionsContent={
          <SubscriptionChart
            loading={statsLoading}
            data={subscriptionData}
          />
        }
        revenueContent={
          <RevenueChart
            loading={statsLoading}
            data={revenueData}
          />
        }
      />
    </AdminLayout>
  );
};

export default AdminAnalytics;
