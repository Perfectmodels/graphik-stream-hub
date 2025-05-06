
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";

const AppMFACard = () => {
  return (
    <Card className="bg-graphik-grey border-graphik-light-grey opacity-70">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Shield className="mr-2 h-5 w-5 text-gray-500" />
          Application d'authentification
        </CardTitle>
        <CardDescription className="text-gray-400">
          Utilisez Google Authenticator, Authy ou une autre application TOTP
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white">Bientôt disponible</p>
            <p className="text-sm text-gray-400 mt-1">
              Cette fonctionnalité sera disponible prochainement
            </p>
          </div>
          <div className="flex items-center">
            <Switch disabled={true} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppMFACard;
