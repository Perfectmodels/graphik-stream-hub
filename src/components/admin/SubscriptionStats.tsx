
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useSubscriptionStats } from "./stats/useSubscriptionStats";
import StatCards from "./stats/StatCards";
import ChartSection from "./stats/ChartSection";

const SubscriptionStats: React.FC = () => {
  const { loading, stats } = useSubscriptionStats();
  
  // Format data for charts
  const serviceData = Object.entries(stats.byService).map(([name, value]) => ({ name, value }));
  const durationData = Object.entries(stats.byDuration).map(([name, value]) => ({ name, value }));
  
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
    .slice(-6); // Last 6 months
  
  if (loading) {
    return (
      <div className="grid gap-6">
        <Card className="bg-graphik-grey border-graphik-light-grey">
          <CardHeader>
            <CardTitle className="text-white">Chargement des statistiques...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {/* Status cards */}
      <StatCards
        total={stats.total}
        pending={stats.pending}
        approved={stats.approved}
        rejected={stats.rejected}
        active={stats.active}
        suspended={stats.suspended}
        expired={stats.expired}
      />
      
      {/* Charts */}
      <ChartSection 
        serviceData={serviceData}
        durationData={durationData}
        revenueData={revenueData}
      />
    </div>
  );
};

export default SubscriptionStats;
