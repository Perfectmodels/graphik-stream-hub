
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AnalyticsStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  bgColor?: string;
}

const AnalyticsStatsCard: React.FC<AnalyticsStatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  iconColor, 
  bgColor = "bg-blue-500/20" 
}) => {
  return (
    <Card className="bg-graphik-grey border-graphik-light-grey">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-sm font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className={`${bgColor} ${iconColor} p-1 rounded`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsStatsCard;
