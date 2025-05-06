
import React from "react";
import { BarChart as BarChartIcon, Calendar, Users, CreditCard } from "lucide-react";
import AnalyticsStatsCard from "./AnalyticsStatsCard";

interface StatsCardSectionProps {
  totalUsers: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
  todayActivities: number;
}

const StatsCardSection: React.FC<StatsCardSectionProps> = ({
  totalUsers,
  monthlyRevenue,
  activeSubscriptions,
  todayActivities
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <AnalyticsStatsCard 
        title="Total Utilisateurs" 
        value={totalUsers} 
        icon={Users} 
        iconColor="text-blue-500" 
      />
      
      <AnalyticsStatsCard 
        title="Revenus Mensuels" 
        value={`${monthlyRevenue.toLocaleString('fr-FR')} €`} 
        icon={CreditCard} 
        iconColor="text-green-500" 
      />
      
      <AnalyticsStatsCard 
        title="Abonnements Actifs" 
        value={activeSubscriptions} 
        icon={CreditCard} 
        iconColor="text-blue-500" 
      />
      
      <AnalyticsStatsCard 
        title="Activités Aujourd'hui" 
        value={todayActivities} 
        icon={Calendar} 
        iconColor="text-purple-500" 
        bgColor="bg-purple-500/20"
      />
    </div>
  );
};

export default StatsCardSection;
