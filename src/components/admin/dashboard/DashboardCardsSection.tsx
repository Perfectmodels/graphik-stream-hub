
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardWelcomeCard from "@/components/admin/DashboardWelcomeCard";
import SalesTargetCard from "@/components/admin/targets/SalesTargetCard";
import { UserActivity } from "@/hooks/admin/useUserActivities";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface DashboardCardsSectionProps {
  activeTargets: any[];
  targetsLoading: boolean;
  activities: UserActivity[];
  activitiesLoading: boolean;
}

const DashboardCardsSection: React.FC<DashboardCardsSectionProps> = ({
  activeTargets,
  targetsLoading,
  activities,
  activitiesLoading
}) => {
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

  // Obtenir les activités les plus récentes
  const recentActivities = [...activities].slice(0, 5);

  return (
    <>
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
    </>
  );
};

export default DashboardCardsSection;
