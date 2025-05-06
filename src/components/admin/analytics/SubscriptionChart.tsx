
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface SubscriptionChartProps {
  loading: boolean;
  data: Array<{ name: string; value: number }>;
}

const SubscriptionChart: React.FC<SubscriptionChartProps> = ({ loading, data }) => {
  return (
    <Card className="bg-graphik-grey border-graphik-light-grey">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Abonnements par Service</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">Chargement des données...</p>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ChartContainer config={{
              value: { theme: { light: '#6366F1', dark: '#6366F1' } }
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#999" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#999" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#6366F1" name="Abonnements" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionChart;
