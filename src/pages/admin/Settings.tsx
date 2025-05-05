
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Shield, AlertTriangle, Info, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AdminSettings = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('general');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNotImplemented = () => {
    toast({
      title: "Fonctionnalité en développement",
      description: "Cette fonctionnalité sera disponible prochainement",
      variant: "default",
    });
  };

  const handleAuthentication = () => {
    if (password === "PMM2025@") {
      setIsAuthenticated(true);
      toast({
        title: "Authentification réussie",
        description: "Vous avez maintenant accès aux paramètres administrateur",
        variant: "default",
      });
    } else {
      toast({
        title: "Mot de passe incorrect",
        description: "Veuillez vérifier le mot de passe et réessayer",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminLayout>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Settings className="mr-2 h-6 w-6 text-graphik-purple" />
          Paramètres administrateur
        </h2>

        <Card className="bg-graphik-grey border-graphik-light-grey max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              Authentification requise
            </CardTitle>
            <CardDescription className="text-gray-400">
              Veuillez entrer le mot de passe administrateur pour accéder aux paramètres
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Mot de passe</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-graphik-dark border-graphik-light-grey text-white"
                  placeholder="Entrez le mot de passe administrateur"
                />
              </div>
              
              <Button 
                onClick={handleAuthentication}
                className="w-full bg-graphik-purple hover:bg-graphik-purple/90"
              >
                Se connecter
              </Button>
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

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
                onClick={() => setActiveSection('general')}
              >
                <Settings className="h-4 w-4 mr-2" /> Paramètres généraux
              </button>
              <button 
                className={`w-full text-left py-3 px-4 rounded-md flex items-center ${
                  activeSection === 'security' 
                    ? 'bg-graphik-blue/20 text-graphik-blue' 
                    : 'text-gray-300 hover:bg-graphik-light-grey/10 hover:text-white'
                }`}
                onClick={() => setActiveSection('security')}
              >
                <Shield className="h-4 w-4 mr-2" /> Sécurité
              </button>
              <button 
                className={`w-full text-left py-3 px-4 rounded-md flex items-center ${
                  activeSection === 'maintenance' 
                    ? 'bg-graphik-blue/20 text-graphik-blue' 
                    : 'text-gray-300 hover:bg-graphik-light-grey/10 hover:text-white'
                }`}
                onClick={() => setActiveSection('maintenance')}
              >
                <AlertTriangle className="h-4 w-4 mr-2" /> Maintenance
              </button>
              <button 
                className={`w-full text-left py-3 px-4 rounded-md flex items-center ${
                  activeSection === 'about' 
                    ? 'bg-graphik-blue/20 text-graphik-blue' 
                    : 'text-gray-300 hover:bg-graphik-light-grey/10 hover:text-white'
                }`}
                onClick={() => setActiveSection('about')}
              >
                <Info className="h-4 w-4 mr-2" /> À propos
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="md:w-2/3 space-y-6">
          {activeSection === 'general' && (
            <Card className="bg-graphik-grey border-graphik-light-grey">
              <CardHeader>
                <CardTitle className="text-white">Paramètres généraux</CardTitle>
                <CardDescription className="text-gray-400">
                  Configuration générale de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteName" className="text-white">Nom du site</Label>
                      <Input 
                        id="siteName" 
                        defaultValue="Graphik'Studio" 
                        className="bg-graphik-dark border-graphik-light-grey text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail" className="text-white">Email de contact</Label>
                      <Input 
                        id="contactEmail" 
                        type="email" 
                        defaultValue="Contact@graphikstudio.pro" 
                        className="bg-graphik-dark border-graphik-light-grey text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="text-white">Numéro WhatsApp</Label>
                      <Input 
                        id="whatsapp" 
                        defaultValue="+241 62 70 89 98" 
                        className="bg-graphik-dark border-graphik-light-grey text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency" className="text-white">Devise</Label>
                      <Input 
                        id="currency" 
                        defaultValue="FCFA" 
                        className="bg-graphik-dark border-graphik-light-grey text-white"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleNotImplemented}
                    className="bg-graphik-purple hover:bg-graphik-purple/90"
                  >
                    Enregistrer les modifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'security' && (
            <Card className="bg-graphik-grey border-graphik-light-grey">
              <CardHeader>
                <CardTitle className="text-white">Paramètres de sécurité</CardTitle>
                <CardDescription className="text-gray-400">
                  Configuration des options de sécurité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword" className="text-white">Mot de passe administrateur</Label>
                      <Input 
                        id="adminPassword" 
                        type="password" 
                        defaultValue="PMM2025@" 
                        className="bg-graphik-dark border-graphik-light-grey text-white"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleNotImplemented}
                    className="bg-graphik-purple hover:bg-graphik-purple/90"
                  >
                    Mettre à jour le mot de passe
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'maintenance' && (
            <Card className="bg-graphik-grey border-graphik-light-grey">
              <CardHeader>
                <CardTitle className="text-white">Maintenance du site</CardTitle>
                <CardDescription className="text-gray-400">
                  Options de maintenance et de performances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Mode maintenance</h3>
                      <p className="text-gray-400 text-sm">Activer le mode maintenance pour empêcher l'accès au site</p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={handleNotImplemented}
                      className="border-graphik-light-grey text-white hover:bg-graphik-light-grey/10"
                    >
                      Activer
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Vider le cache</h3>
                      <p className="text-gray-400 text-sm">Effacer le cache du système pour améliorer les performances</p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={handleNotImplemented}
                      className="border-graphik-light-grey text-white hover:bg-graphik-light-grey/10"
                    >
                      Vider
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'about' && (
            <Card className="bg-graphik-grey border-graphik-light-grey">
              <CardHeader>
                <CardTitle className="text-white">À propos</CardTitle>
                <CardDescription className="text-gray-400">
                  Informations sur le système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-gray-300 text-sm">Nom du produit</h3>
                      <p className="text-white font-medium">Graphik'Studio</p>
                    </div>
                    <div>
                      <h3 className="text-gray-300 text-sm">Version</h3>
                      <p className="text-white font-medium">1.0.0</p>
                    </div>
                    <div>
                      <h3 className="text-gray-300 text-sm">Développé par</h3>
                      <p className="text-white font-medium">Graphik'Studio Team</p>
                    </div>
                    <div>
                      <h3 className="text-gray-300 text-sm">Date de déploiement</h3>
                      <p className="text-white font-medium">Mai 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

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
