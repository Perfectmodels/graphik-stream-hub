
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface RevenueChartProps {
  loading: boolean;
  data: Array<{ month: string; revenue: number }>;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ loading, data }) => {
  return (
    <Card className="bg-graphik-grey border-graphik-light-grey">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Revenus Mensuels</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">Chargement des données...</p>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ChartContainer config={{
              revenue: { theme: { light: '#10B981', dark: '#10B981' } }
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                  <XAxis dataKey="month" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: any) => [`${value} €`, "Revenu"]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    name="Revenu"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
