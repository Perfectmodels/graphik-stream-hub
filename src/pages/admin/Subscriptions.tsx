
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import SubscriptionSearch from "@/components/admin/SubscriptionSearch";
import SubscriptionTable from "@/components/admin/SubscriptionTable";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { Subscription } from "@/types/subscription";

const AdminSubscriptions = () => {
  const {
    loading,
    subscriptions,
    services,
    processingIds,
    fetchSubscriptions,
    fetchServices,
    updateSubscriptionStatus,
    addNote
  } = useSubscriptions();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  useEffect(() => {
    fetchSubscriptions();
    fetchServices();
  }, []);

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
