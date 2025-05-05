
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, Users, CreditCard, Calendar, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session) {
          navigate("/login");
          return;
        }
        
        const { data: adminData, error: adminError } = await supabase.rpc('is_admin', {
          user_id: session.session.user.id
        });
        
        if (adminError || adminData !== true) {
          toast({
            title: "Accès non autorisé",
            description: "Vous n'avez pas les droits d'administrateur",
            variant: "destructive",
          });
          navigate("/");
          return;
        }
        
        setIsAdmin(true);
        await fetchData();
        
      } catch (error) {
        console.error("Erreur lors de la vérification admin:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    
    checkAdmin();
  }, [navigate, toast]);
  
  const fetchData = async () => {
    try {
      // Récupérer les profils utilisateurs
      const { data: profilesData, error: profilesError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (profilesError) throw profilesError;
      setUsers(profilesData || []);
      
      // Récupérer les demandes d'abonnement
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscription_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (subscriptionError) throw subscriptionError;
      setSubscriptions(subscriptionData || []);
      
      // Compter les demandes en attente
      const { count, error: countError } = await supabase
        .from('subscription_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
        
      if (countError) throw countError;
      setPendingRequests(count || 0);
      
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-graphik-dark">
        <div className="text-white text-xl">Chargement du tableau de bord administrateur...</div>
      </div>
    );
  }
  
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-graphik-dark text-white">
      <header className="bg-graphik-grey border-b border-graphik-light-grey">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-graphik-blue via-graphik-purple to-graphik-lightblue bg-clip-text text-transparent">
            Graphik'Studio Admin
          </h1>
          <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-graphik-light-grey/20">
            <LogOut className="mr-2 h-4 w-4" /> Déconnexion
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8">Tableau de bord administrateur</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-graphik-grey border-graphik-light-grey">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Users className="mr-2 h-5 w-5 text-graphik-blue" />
                Utilisateurs
              </CardTitle>
              <CardDescription className="text-gray-400">
                Profils enregistrés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{users.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-graphik-grey border-graphik-light-grey">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-graphik-purple" />
                Abonnements
              </CardTitle>
              <CardDescription className="text-gray-400">
                Demandes totales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{subscriptions.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-graphik-grey border-graphik-light-grey">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                En attente
              </CardTitle>
              <CardDescription className="text-gray-400">
                Demandes à traiter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">{pendingRequests}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-10">
          <Card className="bg-graphik-grey border-graphik-light-grey overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white">Derniers utilisateurs</CardTitle>
              <CardDescription className="text-gray-400">
                Liste des 10 derniers profils créés
              </CardDescription>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                    <TableHead className="text-white">Nom</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Téléphone</TableHead>
                    <TableHead className="text-white">Date d'inscription</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                      <TableCell className="font-medium text-white">{user.full_name}</TableCell>
                      <TableCell className="text-gray-300">{user.email}</TableCell>
                      <TableCell className="text-gray-300">{user.phone || "Non renseigné"}</TableCell>
                      <TableCell className="text-gray-300">
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-400">
                        Aucun utilisateur trouvé
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="bg-graphik-grey border-graphik-light-grey overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white">Demandes d'abonnements</CardTitle>
              <CardDescription className="text-gray-400">
                Liste des 10 dernières demandes
              </CardDescription>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                    <TableHead className="text-white">Client</TableHead>
                    <TableHead className="text-white">Service</TableHead>
                    <TableHead className="text-white">Statut</TableHead>
                    <TableHead className="text-white">Prix</TableHead>
                    <TableHead className="text-white">Date de demande</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((sub) => (
                    <TableRow key={sub.id} className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                      <TableCell className="font-medium text-white">{sub.full_name}</TableCell>
                      <TableCell className="text-gray-300">{sub.service_type}</TableCell>
                      <TableCell>
                        <div 
                          className={`inline-flex px-2 py-1 rounded-full text-xs ${
                            sub.status === 'pending' 
                              ? 'bg-amber-500/20 text-amber-500' 
                              : sub.status === 'approved' 
                                ? 'bg-green-500/20 text-green-500' 
                                : 'bg-red-500/20 text-red-500'
                          }`}
                        >
                          {sub.status === 'pending' 
                            ? 'En attente' 
                            : sub.status === 'approved' 
                              ? 'Approuvé' 
                              : 'Refusé'}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{sub.total_price} €</TableCell>
                      <TableCell className="text-gray-300">
                        {new Date(sub.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  {subscriptions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                        Aucune demande d'abonnement trouvée
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
