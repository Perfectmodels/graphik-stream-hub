
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import SubscriptionStats from "@/components/admin/SubscriptionStats";
import DashboardWelcomeCard from "@/components/admin/DashboardWelcomeCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SubscriptionStatusBadge from "@/components/admin/SubscriptionStatusBadge";
import { useSalesTargets } from "@/hooks/admin/useSalesTargets";
import SalesTargetCard from "@/components/admin/targets/SalesTargetCard";
import { useUserActivities, UserActivity } from "@/hooks/admin/useUserActivities";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const AdminDashboard = () => {
  const { data: activeSubscriptions, isLoading } = useQuery({
    queryKey: ['activeSubscriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_requests')
        .select('*')
        .in('status', ['active', 'approved'])
        .order('end_date', { ascending: true });
        
      if (error) throw error;
      return data || [];
    }
  });

  const { targets, loading: targetsLoading, fetchTargets } = useSalesTargets();
  const { activities, loading: activitiesLoading, fetchActivities } = useUserActivities();

  // Filtrer pour n'obtenir que les objectifs en cours et non complétés
  const activeTargets = targets
    .filter(target => {
      const now = new Date();
      const endDate = new Date(target.end_date);
      return endDate >= now && target.current_value < target.target_value;
    })
    .slice(0, 3); // Limiter à 3 objectifs pour le tableau de bord

  // Obtenir les activités les plus récentes
  const recentActivities = [...activities].slice(0, 5);

  // Formater les activités pour un affichage convivial
  const formatActivityMessage = (activity: UserActivity): string => {
    const activityType = activity.activity_type;
    
    switch (activityType) {
      case 'login':
        return "s'est connecté";
      case 'logout':
        return "s'est déconnecté";
      case 'registration':
        return "s'est inscrit";
      case 'subscription_create':
        return "a créé un abonnement";
      case 'subscription_view':
        return "a consulté un abonnement";
      case 'subscription_status_change':
        const newStatus = activity.activity_data?.new_status;
        return `a changé le statut d'un abonnement en ${newStatus || 'nouveau statut'}`;
      case 'payment':
        const amount = activity.activity_data?.amount;
        return `a effectué un paiement${amount ? ` de ${amount}€` : ''}`;
      default:
        return `a effectué une action: ${activityType}`;
    }
  };

  useEffect(() => {
    fetchTargets();
    fetchActivities();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    }).format(date);
  };

  const getRemainingDays = (endDateString: string) => {
    const today = new Date();
    const endDate = new Date(endDateString);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpirationStatus = (daysLeft: number) => {
    if (daysLeft < 0) return "expired";
    if (daysLeft <= 7) return "critical";
    if (daysLeft <= 30) return "warning";
    return "good";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Tableau de bord administrateur</h2>
        
        <SubscriptionStats />
        
        <DashboardWelcomeCard />
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Objectifs en cours */}
          <Card className="bg-graphik-grey border-graphik-light-grey">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Objectifs en cours</span>
                <span className="text-sm font-normal bg-graphik-blue/20 text-graphik-blue px-2 py-1 rounded">
                  {activeTargets.length} objectif(s)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {targetsLoading ? (
                <div className="text-center py-4 text-gray-400">
                  Chargement des objectifs...
                </div>
              ) : activeTargets.length > 0 ? (
                <div className="space-y-4">
                  {activeTargets.map(target => (
                    <SalesTargetCard key={target.id} target={target} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400">
                  Aucun objectif en cours
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activités récentes */}
          <Card className="bg-graphik-grey border-graphik-light-grey">
            <CardHeader>
              <CardTitle className="text-white">Activités récentes</CardTitle>
            </CardHeader>
            <CardContent>
              {activitiesLoading ? (
                <div className="text-center py-4 text-gray-400">
                  Chargement des activités...
                </div>
              ) : recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const timeAgo = formatDistanceToNow(new Date(activity.created_at), { 
                      addSuffix: true,
                      locale: fr
                    });
                    
                    return (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-graphik-blue/20 flex items-center justify-center">
                          <span className="text-graphik-blue font-bold">
                            {activity.user_id.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm">
                            <span className="text-white">Utilisateur </span>
                            <span className="text-gray-400">{formatActivityMessage(activity)}</span>
                          </div>
                          <p className="text-xs text-gray-500">{timeAgo}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400">
                  Aucune activité récente
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-graphik-grey border-graphik-light-grey">
          <CardHeader>
            <CardTitle className="text-white">Abonnements en cours</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4 text-gray-400">
                Chargement des abonnements...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                      <TableHead className="text-white">Client</TableHead>
                      <TableHead className="text-white">Service</TableHead>
                      <TableHead className="text-white">Statut</TableHead>
                      <TableHead className="text-white">Début</TableHead>
                      <TableHead className="text-white">Échéance</TableHead>
                      <TableHead className="text-white">Jours restants</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeSubscriptions && activeSubscriptions.length > 0 ? (
                      activeSubscriptions.map((subscription) => {
                        const daysLeft = getRemainingDays(subscription.end_date);
                        const expirationStatus = getExpirationStatus(daysLeft);
                        
                        return (
                          <TableRow key={subscription.id} className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                            <TableCell className="font-medium text-white">
                              {subscription.full_name}
                              <div className="text-xs text-gray-400">{subscription.email}</div>
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {subscription.service_type}
                            </TableCell>
                            <TableCell>
                              <SubscriptionStatusBadge status={subscription.status} />
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {formatDate(subscription.start_date)}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {formatDate(subscription.end_date)}
                            </TableCell>
                            <TableCell>
                              <div className={`px-2 py-1 rounded text-xs inline-flex items-center ${
                                expirationStatus === "expired" ? "bg-red-500/20 text-red-500" :
                                expirationStatus === "critical" ? "bg-amber-500/20 text-amber-500" :
                                expirationStatus === "warning" ? "bg-yellow-500/20 text-yellow-500" :
                                "bg-green-500/20 text-green-500"
                              }`}>
                                {daysLeft < 0 ? "Expiré" : `${daysLeft} jours`}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                          Aucun abonnement actif trouvé
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
