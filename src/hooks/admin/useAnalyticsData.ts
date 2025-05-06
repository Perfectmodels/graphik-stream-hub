
import { useState, useEffect } from "react";
import { useUserActivities } from "@/hooks/admin/useUserActivities";
import { useSubscriptionStats } from "@/components/admin/stats/useSubscriptionStats";

export const useAnalyticsData = () => {
  const { loading: activitiesLoading, activities, fetchActivities } = useUserActivities();
  const { loading: statsLoading, stats } = useSubscriptionStats();
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('month');
  const [activityData, setActivityData] = useState<any[]>([]);

  // Fetch activities on component mount
  useEffect(() => {
    fetchActivities();
  }, []);

  // Process activity data for charts
  useEffect(() => {
    if (!activities.length) return;
    
    const groupedData: Record<string, { date: string; count: number; }> = {};
    
    activities.forEach(activity => {
      const date = new Date(activity.created_at);
      let dateKey: string;
      
      if (period === 'day') {
        dateKey = `${date.getHours()}:00`;
      } else if (period === 'week') {
        const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        dateKey = days[date.getDay()];
      } else {
        dateKey = `${date.getDate()}/${date.getMonth() + 1}`;
      }
      
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = { date: dateKey, count: 0 };
      }
      
      groupedData[dateKey].count += 1;
    });
    
    const sortedData = Object.values(groupedData);
    if (period === 'day') {
      sortedData.sort((a, b) => {
        return parseInt(a.date.split(':')[0]) - parseInt(b.date.split(':')[0]);
      });
    }
    
    setActivityData(sortedData);
  }, [activities, period]);

  // Calculate today's activities
  const todayActivities = activities.filter(a => {
    const today = new Date();
    const activityDate = new Date(a.created_at);
    return activityDate.getDate() === today.getDate() &&
           activityDate.getMonth() === today.getMonth() &&
           activityDate.getFullYear() === today.getFullYear();
  }).length;

  // Process subscription data
  const subscriptionData = Object.entries(stats.byService).map(([name, value]) => ({ name, value }));

  // Process revenue data - last 6 months
  const revenueData = Object.entries(stats.monthlyRevenue)
    .map(([month, revenue]) => ({ 
      month, 
      revenue: Math.round(revenue * 100) / 100
    }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split('/').map(Number);
      const [bMonth, bYear] = b.month.split('/').map(Number);
      
      if (aYear !== bYear) return aYear - bYear;
      return aMonth - bMonth;
    })
    .slice(-6);

  return {
    activitiesLoading,
    statsLoading,
    period,
    setPeriod,
    activityData,
    todayActivities,
    subscriptionData,
    revenueData,
    totalUsers: stats.total,
    monthlyRevenue: Object.values(stats.monthlyRevenue).reduce((sum, val) => sum + val, 0),
    activeSubscriptions: stats.approved + stats.active
  };
};
