
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

type StatData = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  byService: Record<string, number>;
  byDuration: Record<string, number>;
  monthlyRevenue: Record<string, number>;
};

const SubscriptionStats: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatData>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    byService: {},
    byDuration: {},
    monthlyRevenue: {},
  });
  const { toast } = useToast();

  const COLORS = ["#3498db", "#9b59b6", "#2ecc71", "#e74c3c", "#f39c12", "#1abc9c"];
  
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all subscriptions
      const { data: subscriptions, error } = await supabase
        .from("subscription_requests")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Process data for stats
      const stats: StatData = {
        total: subscriptions?.length || 0,
        pending: 0,
        approved: 0, 
        rejected: 0,
        byService: {},
        byDuration: {},
        monthlyRevenue: {},
      };
      
      // Process each subscription
      subscriptions?.forEach(sub => {
        // Status counts
        if (sub.status === 'pending') stats.pending++;
        else if (sub.status === 'approved') stats.approved++;
        else if (sub.status === 'rejected') stats.rejected++;
        
        // Service type counts
        if (stats.byService[sub.service_type]) {
          stats.byService[sub.service_type]++;
        } else {
          stats.byService[sub.service_type] = 1;
        }
        
        // Duration counts
        const duration = `${sub.duration_months} mois`;
        if (stats.byDuration[duration]) {
          stats.byDuration[duration]++;
        } else {
          stats.byDuration[duration] = 1;
        }
        
        // Monthly revenue - group by month
        if (sub.created_at) {
          const date = new Date(sub.created_at);
          const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
          
          if (stats.monthlyRevenue[monthYear]) {
            stats.monthlyRevenue[monthYear] += Number(sub.total_price) || 0;
          } else {
            stats.monthlyRevenue[monthYear] = Number(sub.total_price) || 0;
          }
        }
      });
      
      setStats(stats);
    } catch (error) {
      console.error("Error fetching subscription stats:", error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les statistiques d'abonnement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Format data for charts
  const serviceData = Object.entries(stats.byService).map(([name, value]) => ({ name, value }));
  const durationData = Object.entries(stats.byDuration).map(([name, value]) => ({ name, value }));
  
  const revenueData = Object.entries(stats.monthlyRevenue)
    .map(([month, revenue]) => ({ 
      month, 
      revenue: Math.round(revenue * 100) / 100
    }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split('/').map(Number);
      const [bMonth, bYear] = b.month.split('/').map(Number);
      
      if (aYear !== bYear) return aYear - bYear;
      return aMonth - bMonth;
    })
    .slice(-6); // Last 6 months
  
  if (loading) {
    return (
      <div className="grid gap-6">
        <Card className="bg-graphik-grey border-graphik-light-grey">
          <CardHeader>
            <CardTitle className="text-white">Chargement des statistiques...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-graphik-grey border-graphik-light-grey">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-xl">Total abonnements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-graphik-grey border-graphik-light-grey">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-xl">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-500">{stats.pending}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-graphik-grey border-graphik-light-grey">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-xl">Approuvés</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-500">{stats.approved}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-graphik-grey border-graphik-light-grey">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-xl">Refusés</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-500">{stats.rejected}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service type distribution */}
        <Card className="bg-graphik-grey border-graphik-light-grey col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Distribution des services</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={{
              primary: { theme: { light: '#3498db', dark: '#3498db' } },
              secondary: { theme: { light: '#9b59b6', dark: '#9b59b6' } },
              tertiary: { theme: { light: '#2ecc71', dark: '#2ecc71' } },
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Duration distribution */}
        <Card className="bg-graphik-grey border-graphik-light-grey col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Distribution des durées</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={{
              primary: { theme: { light: '#3498db', dark: '#3498db' } },
              secondary: { theme: { light: '#9b59b6', dark: '#9b59b6' } },
              tertiary: { theme: { light: '#2ecc71', dark: '#2ecc71' } },
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={durationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {durationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="bg-graphik-grey border-graphik-light-grey">
        <CardHeader>
          <CardTitle className="text-white">Revenus mensuels (derniers 6 mois)</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer config={{
            primary: { theme: { light: '#3498db', dark: '#3498db' } }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" name="Revenu (€)" fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionStats;
