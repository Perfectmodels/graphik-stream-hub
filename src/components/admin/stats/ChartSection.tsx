
import React from "react";
import PieChartCard from "./PieChartCard";
import BarChartCard from "./BarChartCard";

interface ChartSectionProps {
  serviceData: Array<{ name: string; value: number }>;
  durationData: Array<{ name: string; value: number }>;
  revenueData: Array<{ month: string; revenue: number }>;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  serviceData,
  durationData,
  revenueData,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChartCard title="Distribution des services" data={serviceData} />
        <PieChartCard title="Distribution des durées" data={durationData} />
      </div>

      <BarChartCard 
        title="Revenus mensuels (derniers 6 mois)" 
        data={revenueData} 
        dataKey="revenue" 
        nameKey="month" 
      />
    </>
  );
};

export default ChartSection;
