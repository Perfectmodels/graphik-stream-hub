
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import SubscriptionSearch from "@/components/admin/SubscriptionSearch";
import SubscriptionTable, { Subscription } from "@/components/admin/SubscriptionTable";

type Service = {
  id: number;
  name: string;
  description: string | null;
  base_price: number;
  category_id: number | null;
};

const AdminSubscriptions = () => {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [processingIds, setProcessingIds] = useState<number[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscriptions();
    fetchServices();
  }, [navigate, toast]);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, name, description, base_price, category_id')
        .order('name');
        
      if (error) throw error;
      
      if (data) {
        setServices(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des services:", error);
    }
  };

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
        .select(`
          *,
          payments:payments(id, payment_status),
          admin_notes:admin_notes(id, note)
        `)
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
          status: item.status as 'pending' | 'approved' | 'rejected' | 'active' | 'expired' | 'suspended',
          total_price: item.total_price,
          created_at: item.created_at || "",
          start_date: item.start_date || "",
          end_date: item.end_date || "",
          duration_months: item.duration_months,
          has_payment: item.payments && item.payments.length > 0,
          payment_status: item.payments && item.payments.length > 0 ? item.payments[0].payment_status : null,
          has_notes: item.admin_notes && item.admin_notes.length > 0
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

  const updateSubscriptionStatus = async (id: number, status: 'approved' | 'rejected' | 'active' | 'suspended') => {
    try {
      setProcessingIds(prev => [...prev, id]);
      
      const { error } = await supabase
        .from('subscription_requests')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
        
      if (error) throw error;
      
      // Si le statut est approuvé, créer automatiquement un enregistrement de paiement en attente
      if (status === 'approved') {
        const subscription = subscriptions.find(sub => sub.id === id);
        
        if (subscription) {
          const { error: paymentError } = await supabase
            .from('payments')
            .insert({
              subscription_id: id,
              amount: subscription.total_price,
              payment_method: subscription.payment_method || 'Mobile Money',
              payment_status: 'pending'
            });
            
          if (paymentError) console.error("Erreur lors de la création du paiement:", paymentError);
        }
      }
      
      toast({
        title: status === 'approved' ? "Demande approuvée" : 
               status === 'rejected' ? "Demande rejetée" :
               status === 'active' ? "Abonnement activé" : "Abonnement suspendu",
        description: `La demande d'abonnement a été mise à jour avec succès.`,
        variant: status === 'rejected' || status === 'suspended' ? "destructive" : "default",
      });
      
      // Mettre à jour l'état local
      setSubscriptions(prev => prev.map(sub => 
        sub.id === id ? { ...sub, status } : sub
      ));
      
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du statut:`, error);
      toast({
        title: "Erreur",
        description: `Impossible de mettre à jour le statut de la demande`,
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => prev.filter(id_ => id_ !== id));
    }
  };

  const addNote = async (id: number, note: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour ajouter une note",
          variant: "destructive",
        });
        return;
      }
      
      const { error } = await supabase
        .from('admin_notes')
        .insert({
          subscription_id: id,
          admin_id: session.session.user.id,
          note
        });
        
      if (error) throw error;
      
      toast({
        title: "Note ajoutée",
        description: "Votre note a été ajoutée avec succès",
      });
      
      fetchSubscriptions(); // Rafraîchir pour voir la note
      
    } catch (error) {
      console.error("Erreur lors de l'ajout de la note:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la note",
        variant: "destructive",
      });
    }
  };

  // Filtrage avancé avec plusieurs critères
  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = 
      sub.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.service_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.status?.includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || sub.status === statusFilter;
    const matchesService = !serviceFilter || sub.service_type === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <CreditCard className="mr-2 h-6 w-6 text-graphik-purple" />
        Gestion des abonnements
      </h2>

      <SubscriptionSearch 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        serviceFilter={serviceFilter}
        setServiceFilter={setServiceFilter}
        services={services}
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
          addNote={addNote}
          searchTerm={searchTerm}
        />
      </Card>
    </AdminLayout>
  );
};

export default AdminSubscriptions;
