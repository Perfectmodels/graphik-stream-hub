
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface ActivityChartProps {
  activitiesLoading: boolean;
  activityData: Array<{ date: string; count: number }>;
  period: 'day' | 'week' | 'month';
  setPeriod: (period: 'day' | 'week' | 'month') => void;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ 
  activitiesLoading, 
  activityData,
  period,
  setPeriod
}) => {
  return (
    <Card className="bg-graphik-grey border-graphik-light-grey">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-white">Activités Utilisateurs</CardTitle>
        <div className="flex gap-2">
          <button 
            onClick={() => setPeriod('day')}
            className={`px-3 py-1 text-xs rounded ${period === 'day' ? 'bg-graphik-blue text-white' : 'bg-graphik-light-grey/20 text-gray-300'}`}
          >
            Aujourd'hui
          </button>
          <button 
            onClick={() => setPeriod('week')}
            className={`px-3 py-1 text-xs rounded ${period === 'week' ? 'bg-graphik-blue text-white' : 'bg-graphik-light-grey/20 text-gray-300'}`}
          >
            Cette semaine
          </button>
          <button 
            onClick={() => setPeriod('month')}
            className={`px-3 py-1 text-xs rounded ${period === 'month' ? 'bg-graphik-blue text-white' : 'bg-graphik-light-grey/20 text-gray-300'}`}
          >
            Ce mois
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {activitiesLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">Chargement des données...</p>
          </div>
        ) : activityData.length > 0 ? (
          <div className="h-64 w-full">
            <ChartContainer config={{
              count: { theme: { light: '#8884d8', dark: '#8884d8' } }
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={activityData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                  <XAxis dataKey="date" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorCount)" 
                    name="Activités"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">Aucune donnée à afficher pour cette période</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
