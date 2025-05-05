
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface DataItem {
  name: string;
  value: number;
}

interface PieChartCardProps {
  title: string;
  data: DataItem[];
  height?: string;
}

const COLORS = ["#3498db", "#9b59b6", "#2ecc71", "#e74c3c", "#f39c12", "#1abc9c"];

const PieChartCard: React.FC<PieChartCardProps> = ({ 
  title, 
  data,
  height = "h-80"
}) => {
  return (
    <Card className="bg-graphik-grey border-graphik-light-grey col-span-1">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className={height}>
        <ChartContainer config={{
          primary: { theme: { light: '#3498db', dark: '#3498db' } },
          secondary: { theme: { light: '#9b59b6', dark: '#9b59b6' } },
          tertiary: { theme: { light: '#2ecc71', dark: '#2ecc71' } },
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartCard;
