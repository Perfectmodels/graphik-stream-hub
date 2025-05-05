
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import SubscriptionSearch from "@/components/admin/SubscriptionSearch";
import SubscriptionTable, { Subscription } from "@/components/admin/SubscriptionTable";

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

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <CreditCard className="mr-2 h-6 w-6 text-graphik-purple" />
        Gestion des abonnements
      </h2>

      <SubscriptionSearch 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <Card className="bg-graphik-grey border-graphik-light-grey overflow-hidden">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Demandes d'abonnements</span>
            <span className="text-sm font-normal bg-graphik-blue/20 text-graphik-blue px-2 py-1 rounded">
              {filteredSubscriptions.length} demande(s)
            </span>
          </CardTitle>
        </CardHeader>
        
        <SubscriptionTable 
          loading={loading}
          filteredSubscriptions={filteredSubscriptions}
          processingIds={processingIds}
          updateSubscriptionStatus={updateSubscriptionStatus}
          searchTerm={searchTerm}
        />
      </Card>
    </AdminLayout>
  );
};

export default AdminSubscriptions;
