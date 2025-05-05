
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, CreditCard, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";

type Subscription = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  status: 'pending' | 'approved' | 'rejected';
  total_price: number;
  created_at: string;
  start_date: string;
  end_date: string;
  duration_months: number;
}

const AdminSubscriptions = () => {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [processingIds, setProcessingIds] = useState<number[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscriptions();
  }, [navigate, toast]);

  const fetchSubscriptions = async () => {
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
      
      const { data, error } = await supabase
        .from('subscription_requests')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        // Convertit les données pour correspondre au type Subscription
        const typedData: Subscription[] = data.map(item => ({
          id: item.id,
          full_name: item.full_name,
          email: item.email,
          phone: item.phone,
          service_type: item.service_type,
          status: item.status as 'pending' | 'approved' | 'rejected',
          total_price: item.total_price,
          created_at: item.created_at,
          start_date: item.start_date,
          end_date: item.end_date,
          duration_months: item.duration_months
        }));
        
        setSubscriptions(typedData);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des abonnements:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des abonnements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriptionStatus = async (id: number, status: 'approved' | 'rejected') => {
    try {
      setProcessingIds(prev => [...prev, id]);
      
      const { error } = await supabase
        .from('subscription_requests')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: status === 'approved' ? "Demande approuvée" : "Demande rejetée",
        description: `La demande d'abonnement a été ${status === 'approved' ? 'approuvée' : 'rejetée'} avec succès.`,
        variant: status === 'approved' ? "default" : "destructive",
      });
      
      setSubscriptions(prev => prev.map(sub => 
        sub.id === id ? { ...sub, status } : sub
      ));
      
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du statut:`, error);
      toast({
        title: "Erreur",
        description: `Impossible de ${status === 'approved' ? 'approuver' : 'rejeter'} la demande`,
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => prev.filter(id_ => id_ !== id));
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => 
    sub.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.service_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.status?.includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="bg-amber-500/20 text-amber-500 px-2 py-1 rounded-full text-xs inline-flex items-center">
            En attente
          </div>
        );
      case 'approved':
        return (
          <div className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs inline-flex items-center">
            Approuvé
          </div>
        );
      case 'rejected':
        return (
          <div className="bg-red-500/20 text-red-500 px-2 py-1 rounded-full text-xs inline-flex items-center">
            Rejeté
          </div>
        );
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <CreditCard className="mr-2 h-6 w-6 text-graphik-purple" />
        Gestion des abonnements
      </h2>

      <Card className="bg-graphik-grey border-graphik-light-grey mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Rechercher</CardTitle>
          <CardDescription className="text-gray-400">
            Filtrer les demandes par nom, email, service ou statut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un abonnement..."
              className="pl-10 bg-graphik-dark border-graphik-light-grey text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-graphik-grey border-graphik-light-grey overflow-hidden">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Demandes d'abonnements</span>
            <span className="text-sm font-normal bg-graphik-blue/20 text-graphik-blue px-2 py-1 rounded">
              {filteredSubscriptions.length} demande(s)
            </span>
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-8 text-gray-400">Chargement des abonnements...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                  <TableHead className="text-white">Client</TableHead>
                  <TableHead className="text-white">Service</TableHead>
                  <TableHead className="text-white">Statut</TableHead>
                  <TableHead className="text-white">Prix</TableHead>
                  <TableHead className="text-white">Durée</TableHead>
                  <TableHead className="text-white">Date de demande</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((sub) => (
                  <TableRow key={sub.id} className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                    <TableCell className="font-medium text-white">
                      <div>{sub.full_name}</div>
                      <div className="text-xs text-gray-400">{sub.email}</div>
                    </TableCell>
                    <TableCell className="text-gray-300">{sub.service_type}</TableCell>
                    <TableCell>{getStatusBadge(sub.status)}</TableCell>
                    <TableCell className="text-gray-300">{sub.total_price} FCFA</TableCell>
                    <TableCell className="text-gray-300">{sub.duration_months} mois</TableCell>
                    <TableCell className="text-gray-300">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500 text-green-500 hover:bg-green-500/20"
                          onClick={() => updateSubscriptionStatus(sub.id, 'approved')}
                          disabled={sub.status !== 'pending' || processingIds.includes(sub.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-500/20"
                          onClick={() => updateSubscriptionStatus(sub.id, 'rejected')}
                          disabled={sub.status !== 'pending' || processingIds.includes(sub.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSubscriptions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                      {searchTerm ? "Aucun abonnement ne correspond à votre recherche" : "Aucune demande d'abonnement trouvée"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
    </AdminLayout>
  );
};

export default AdminSubscriptions;
