
import React from "react";
import { BarChart as BarChartIcon } from "lucide-react";

const AnalyticsHeader: React.FC = () => {
  return (
    <h2 className="text-2xl font-bold mb-6 flex items-center">
      <BarChartIcon className="mr-2 h-6 w-6 text-graphik-purple" />
      Statistiques et Analytique
    </h2>
  );
};

export default AnalyticsHeader;
