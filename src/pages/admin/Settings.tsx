
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Shield, AlertTriangle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminSettings = () => {
  const { toast } = useToast();
  const [activeSection] = useState('general');

  const handleNotImplemented = () => {
    toast({
      title: "Fonctionnalité en développement",
      description: "Cette fonctionnalité sera disponible prochainement",
      variant: "default",
    });
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Settings className="mr-2 h-6 w-6 text-graphik-purple" />
        Paramètres administrateur
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="bg-graphik-grey border-graphik-light-grey md:w-1/3">
          <CardHeader>
            <CardTitle className="text-white">Sections</CardTitle>
            <CardDescription className="text-gray-400">
              Configurer les différentes sections du panneau d'administration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button 
                className={`w-full text-left py-3 px-4 rounded-md flex items-center ${
                  activeSection === 'general' 
                    ? 'bg-graphik-blue/20 text-graphik-blue' 
                    : 'text-gray-300 hover:bg-graphik-light-grey/10 hover:text-white'
                }`}
                onClick={handleNotImplemented}
              >
                <Settings className="h-4 w-4 mr-2" /> Paramètres généraux
              </button>
              <button 
                className={`w-full text-left py-3 px-4 rounded-md flex items-center ${
                  activeSection === 'security' 
                    ? 'bg-graphik-blue/20 text-graphik-blue' 
                    : 'text-gray-300 hover:bg-graphik-light-grey/10 hover:text-white'
                }`}
                onClick={handleNotImplemented}
              >
                <Shield className="h-4 w-4 mr-2" /> Sécurité
              </button>
              <button 
                className={`w-full text-left py-3 px-4 rounded-md flex items-center ${
                  activeSection === 'maintenance' 
                    ? 'bg-graphik-blue/20 text-graphik-blue' 
                    : 'text-gray-300 hover:bg-graphik-light-grey/10 hover:text-white'
                }`}
                onClick={handleNotImplemented}
              >
                <AlertTriangle className="h-4 w-4 mr-2" /> Maintenance
              </button>
              <button 
                className={`w-full text-left py-3 px-4 rounded-md flex items-center ${
                  activeSection === 'about' 
                    ? 'bg-graphik-blue/20 text-graphik-blue' 
                    : 'text-gray-300 hover:bg-graphik-light-grey/10 hover:text-white'
                }`}
                onClick={handleNotImplemented}
              >
                <Info className="h-4 w-4 mr-2" /> À propos
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="md:w-2/3 space-y-6">
          <Card className="bg-graphik-grey border-graphik-light-grey">
            <CardHeader>
              <CardTitle className="text-white">Paramètres généraux</CardTitle>
              <CardDescription className="text-gray-400">
                Configuration générale de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-400 py-8">
                <Settings className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Les paramètres administrateur seront disponibles dans une prochaine mise à jour.</p>
                <p className="mt-2 text-sm">Consultez la documentation pour plus d'informations.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-500/10 border-amber-500/30">
            <CardHeader>
              <CardTitle className="text-amber-500 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" /> Note importante
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Cette section est en cours de développement. Des fonctionnalités 
                supplémentaires seront ajoutées prochainement, notamment:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-400">
                <li>Gestion avancée des utilisateurs et permissions</li>
                <li>Configuration des services et abonnements</li>
                <li>Rapports et statistiques détaillées</li>
                <li>Personnalisation de l'interface d'administration</li>
                <li>Gestion des journaux et audit de sécurité</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
