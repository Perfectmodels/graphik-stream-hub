
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color = "text-white" }) => {
  return (
    <Card className="bg-graphik-grey border-graphik-light-grey">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
