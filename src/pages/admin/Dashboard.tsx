
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import SubscriptionStats from "@/components/admin/SubscriptionStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Tableau de bord administrateur</h2>
        
        <SubscriptionStats />
        
        <Card className="bg-graphik-grey border-graphik-light-grey">
          <CardHeader>
            <CardTitle className="text-white">Bienvenue dans le tableau de bord administrateur</CardTitle>
            <CardDescription className="text-gray-400">
              Consultez les statistiques d'abonnements ci-dessus et utilisez les modules dans le menu latéral pour gérer les différents aspects de l'application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Vous pouvez accéder à la gestion des utilisateurs, des abonnements et des paramètres via la barre latérale.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
