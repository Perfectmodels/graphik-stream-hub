
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardWelcomeCard: React.FC = () => {
  return (
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
  );
};

export default DashboardWelcomeCard;
