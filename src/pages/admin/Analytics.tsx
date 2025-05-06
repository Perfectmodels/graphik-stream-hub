
import React, { useEffect, useState } from "react";
import { BarChart as BarChartIcon, Calendar, Users as UsersIcon, CreditCard } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserActivities } from "@/hooks/admin/useUserActivities";
import { useSubscriptionStats } from "@/components/admin/stats/useSubscriptionStats";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const AdminAnalytics = () => {
  const { loading: activitiesLoading, activities, fetchActivities } = useUserActivities();
  const { loading: statsLoading, stats } = useSubscriptionStats();
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('month');
  const [activityData, setActivityData] = useState<any[]>([]);
  
  useEffect(() => {
    fetchActivities();
  }, []);
  
  // Traitement des données d'activité pour les graphiques
  useEffect(() => {
    if (!activities.length) return;
    
    const groupedData: Record<string, { date: string; count: number; }> = {};
    
    activities.forEach(activity => {
      const date = new Date(activity.created_at);
      let dateKey: string;
      
      if (period === 'day') {
        dateKey = `${date.getHours()}:00`;
      } else if (period === 'week') {
        const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        dateKey = days[date.getDay()];
      } else {
        dateKey = `${date.getDate()}/${date.getMonth() + 1}`;
      }
      
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = { date: dateKey, count: 0 };
      }
      
      groupedData[dateKey].count += 1;
    });
    
    const sortedData = Object.values(groupedData);
    if (period === 'day') {
      sortedData.sort((a, b) => {
        return parseInt(a.date.split(':')[0]) - parseInt(b.date.split(':')[0]);
      });
    }
    
    setActivityData(sortedData);
  }, [activities, period]);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <BarChartIcon className="mr-2 h-6 w-6 text-graphik-purple" />
        Statistiques et Analytique
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="bg-graphik-grey border-graphik-light-grey">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm font-normal">Total Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <UsersIcon className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-graphik-grey border-graphik-light-grey">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm font-normal">Revenus Mensuels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">
                {Object.values(stats.monthlyRevenue).reduce((sum, val) => sum + val, 0).toLocaleString('fr-FR')} €
              </div>
              <CreditCard className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-graphik-grey border-graphik-light-grey">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm font-normal">Abonnements Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">{stats.approved + stats.active}</div>
              <div className="bg-blue-500/20 text-blue-500 p-1 rounded">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-graphik-grey border-graphik-light-grey">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm font-normal">Activités Aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">
                {activities.filter(a => {
                  const today = new Date();
                  const activityDate = new Date(a.created_at);
                  return activityDate.getDate() === today.getDate() &&
                         activityDate.getMonth() === today.getMonth() &&
                         activityDate.getFullYear() === today.getFullYear();
                }).length}
              </div>
              <div className="bg-purple-500/20 text-purple-500 p-1 rounded">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="activities" className="mb-6">
        <TabsList className="bg-graphik-light-grey/20">
          <TabsTrigger value="activities">Activités</TabsTrigger>
          <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities" className="mt-4">
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
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }}
                        labelStyle={{ color: '#fff' }}
                      />
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
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-400">Aucune donnée à afficher pour cette période</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscriptions" className="mt-4">
          <Card className="bg-graphik-grey border-graphik-light-grey">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Abonnements par Service</CardTitle>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-400">Chargement des données...</p>
                </div>
              ) : (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={Object.entries(stats.byService).map(([name, value]) => ({ name, value }))}
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
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="value" fill="#6366F1" name="Abonnements" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-4">
          <Card className="bg-graphik-grey border-graphik-light-grey">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Revenus Mensuels</CardTitle>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-400">Chargement des données...</p>
                </div>
              ) : (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={Object.entries(stats.monthlyRevenue).map(([month, revenue]) => ({ 
                        month, 
                        revenue: Math.round(revenue * 100) / 100
                      }))}
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
                        contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }}
                        labelStyle={{ color: '#fff' }}
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
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminAnalytics;
