
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface BarChartCardProps {
  title: string;
  data: Array<Record<string, any>>;
  dataKey: string;
  nameKey: string;
  height?: string;
}

const BarChartCard: React.FC<BarChartCardProps> = ({ 
  title, 
  data, 
  dataKey, 
  nameKey,
  height = "h-80"
}) => {
  return (
    <Card className="bg-graphik-grey border-graphik-light-grey">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className={height}>
        <ChartContainer config={{
          primary: { theme: { light: '#3498db', dark: '#3498db' } }
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey={nameKey} stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey={dataKey} name={`${dataKey.charAt(0).toUpperCase() + dataKey.slice(1)} (€)`} fill="#3498db" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartCard;
