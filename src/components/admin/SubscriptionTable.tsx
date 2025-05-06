
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SubscriptionStatusBadge from "./SubscriptionStatusBadge";
import { Subscription } from "@/types/subscription";
import SubscriptionDetailsDialog from "./subscription/SubscriptionDetailsDialog";
import SubscriptionNoteDialog from "./subscription/SubscriptionNoteDialog";
import SubscriptionActions from "./subscription/SubscriptionActions";
import CustomerInfo from "./subscription/CustomerInfo";

interface SubscriptionTableProps {
  loading: boolean;
  filteredSubscriptions: Subscription[];
  processingIds: number[];
  updateSubscriptionStatus: (id: number, status: 'approved' | 'rejected' | 'active' | 'suspended') => Promise<void>;
  addNote: (id: number, note: string) => Promise<void>;
  searchTerm: string;
  onRefresh?: () => void;
}

const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  loading,
  filteredSubscriptions,
  processingIds,
  updateSubscriptionStatus,
  addNote,
  searchTerm,
  onRefresh
}) => {
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const openNoteDialog = (sub: Subscription) => {
    setSelectedSubscription(sub);
    setNoteDialogOpen(true);
  };

  const openDetailsDialog = (sub: Subscription) => {
    setSelectedSubscription(sub);
    setDetailsDialogOpen(true);
  };

  const handleAddNote = async (id: number, note: string) => {
    await addNote(id, note);
    if (onRefresh) onRefresh();
  };

  const handleStatusUpdate = async (id: number, status: 'approved' | 'rejected' | 'active' | 'suspended') => {
    await updateSubscriptionStatus(id, status);
    if (onRefresh) onRefresh();
  };

  return (
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
                  <CustomerInfo subscription={sub} />
                </TableCell>
                <TableCell className="text-gray-300">{sub.service_type}</TableCell>
                <TableCell>
                  <SubscriptionStatusBadge status={sub.status} />
                </TableCell>
                <TableCell className="text-gray-300">{sub.total_price} FCFA</TableCell>
                <TableCell className="text-gray-300">{sub.duration_months} mois</TableCell>
                <TableCell className="text-gray-300">
                  {new Date(sub.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <SubscriptionActions 
                    subscription={sub}
                    processingIds={processingIds}
                    onViewDetails={openDetailsDialog}
                    onAddNote={openNoteDialog}
                    updateSubscriptionStatus={handleStatusUpdate}
                  />
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

      {/* Dialog for subscription details */}
      <SubscriptionDetailsDialog 
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        subscription={selectedSubscription}
      />

      {/* Dialog for adding notes */}
      <SubscriptionNoteDialog 
        open={noteDialogOpen}
        onOpenChange={setNoteDialogOpen}
        subscription={selectedSubscription}
        onAddNote={handleAddNote}
      />
    </div>
  );
};

export default SubscriptionTable;
