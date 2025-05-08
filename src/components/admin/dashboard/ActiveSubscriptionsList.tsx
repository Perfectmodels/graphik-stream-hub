import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SubscriptionStatusBadge from "@/components/admin/SubscriptionStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActiveSubscriptionsListProps {
  activeSubscriptions: any[];
  isLoading: boolean;
}

const ActiveSubscriptionsList: React.FC<ActiveSubscriptionsListProps> = ({ 
  activeSubscriptions, 
  isLoading 
}) => {
  const [subscriptions, setSubscriptions] = useState(activeSubscriptions);

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

  // Fonction pour valider un abonnement
  const handleValidate = (subscriptionId: string) => {
    if (window.confirm("Voulez-vous vraiment valider cet abonnement ?")) {
      // Simuler la validation en mettant à jour le statut localement
      const updatedSubscriptions = subscriptions.map((sub) =>
        sub.id === subscriptionId ? { ...sub, status: "validé" } : sub
      );
      setSubscriptions(updatedSubscriptions);

      // Appeler une API si nécessaire
      console.log(`Abonnement validé : ${subscriptionId}`);
    }
  };

  // Fonction pour rejeter un abonnement
  const handleDecline = (subscriptionId: string) => {
    if (window.confirm("Voulez-vous vraiment rejeter cet abonnement ?")) {
      // Simuler le rejet en mettant à jour le statut localement
      const updatedSubscriptions = subscriptions.map((sub) =>
        sub.id === subscriptionId ? { ...sub, status: "rejeté" } : sub
      );
      setSubscriptions(updatedSubscriptions);

      // Appeler une API si nécessaire
      console.log(`Abonnement rejeté : ${subscriptionId}`);
    }
  };

  return (
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
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions && subscriptions.length > 0 ? (
                  subscriptions.map((subscription) => {
                    const daysLeft = getRemainingDays(subscription.end_date);
                    const expirationStatus = getExpirationStatus(daysLeft);
                    
                    return (
                      <TableRow key={subscription.id} className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                        <TableCell className="font-medium text-white">
                          {subscription.full_name}
                          <div className="text-xs text-gray-400">{subscription.email}</div>
                        </TableCell>
                        <TableCell className="text-gray-300">{subscription.service_type}</TableCell>
                        <TableCell>
                          <SubscriptionStatusBadge status={subscription.status} />
                        </TableCell>
                        <TableCell className="text-gray-300">{formatDate(subscription.start_date)}</TableCell>
                        <TableCell className="text-gray-300">{formatDate(subscription.end_date)}</TableCell>
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
                        <TableCell>
                          <button 
                            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                            onClick={() => handleValidate(subscription.id)}
                          >
                            Valider
                          </button>
                          <button 
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => handleDecline(subscription.id)}
                          >
                            Rejeter
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-400">
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
  );
};

export default ActiveSubscriptionsList;
