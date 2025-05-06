import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, MessageSquare, Play, Pause, Eye, Plus } from "lucide-react";
import SubscriptionStatusBadge from "./SubscriptionStatusBadge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Subscription } from "@/types/subscription";

interface SubscriptionTableProps {
  loading: boolean;
  filteredSubscriptions: Subscription[];
  processingIds: number[];
  updateSubscriptionStatus: (id: number, status: 'approved' | 'rejected' | 'active' | 'suspended') => Promise<void>;
  addNote: (id: number, note: string) => Promise<void>;
  searchTerm: string;
}

const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  loading,
  filteredSubscriptions,
  processingIds,
  updateSubscriptionStatus,
  addNote,
  searchTerm
}) => {
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const handleAddNote = async () => {
    if (selectedSubscription && noteContent.trim()) {
      await addNote(selectedSubscription.id, noteContent);
      setNoteContent("");
      setNoteDialogOpen(false);
    }
  };

  const openNoteDialog = (sub: Subscription) => {
    setSelectedSubscription(sub);
    setNoteContent("");
    setNoteDialogOpen(true);
  };

  const openDetailsDialog = (sub: Subscription) => {
    setSelectedSubscription(sub);
    setDetailsDialogOpen(true);
  };

  const getAvailableActions = (sub: Subscription) => {
    switch (sub.status) {
      case 'pending':
        return (
          <>
            <Button
              variant="outline"
              size="sm"
              className="border-green-500 text-green-500 hover:bg-green-500/20"
              onClick={() => updateSubscriptionStatus(sub.id, 'approved')}
              disabled={processingIds.includes(sub.id)}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-500 text-red-500 hover:bg-red-500/20"
              onClick={() => updateSubscriptionStatus(sub.id, 'rejected')}
              disabled={processingIds.includes(sub.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        );
      case 'approved':
        return (
          <Button
            variant="outline"
            size="sm"
            className="border-blue-500 text-blue-500 hover:bg-blue-500/20"
            onClick={() => updateSubscriptionStatus(sub.id, 'active')}
            disabled={processingIds.includes(sub.id)}
          >
            <Play className="h-4 w-4" />
          </Button>
        );
      case 'active':
        return (
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500 text-purple-500 hover:bg-purple-500/20"
            onClick={() => updateSubscriptionStatus(sub.id, 'suspended')}
            disabled={processingIds.includes(sub.id)}
          >
            <Pause className="h-4 w-4" />
          </Button>
        );
      case 'suspended':
        return (
          <Button
            variant="outline"
            size="sm"
            className="border-blue-500 text-blue-500 hover:bg-blue-500/20"
            onClick={() => updateSubscriptionStatus(sub.id, 'active')}
            disabled={processingIds.includes(sub.id)}
          >
            <Play className="h-4 w-4" />
          </Button>
        );
      default:
        return null;
    }
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
                  <div className="flex items-center">
                    <div>
                      <div>{sub.full_name}</div>
                      <div className="text-xs text-gray-400">{sub.email}</div>
                    </div>
                    {(sub.has_notes || sub.has_payment) && (
                      <div className="ml-2 flex space-x-1">
                        {sub.has_notes && (
                          <div className="text-xs bg-amber-500/20 text-amber-500 px-1 rounded">Note</div>
                        )}
                        {sub.has_payment && sub.payment_status === 'completed' && (
                          <div className="text-xs bg-green-500/20 text-green-500 px-1 rounded">Payé</div>
                        )}
                        {sub.has_payment && sub.payment_status === 'pending' && (
                          <div className="text-xs bg-amber-500/20 text-amber-500 px-1 rounded">Paiement en attente</div>
                        )}
                      </div>
                    )}
                  </div>
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
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-500 text-gray-300 hover:bg-graphik-light-grey/20"
                      onClick={() => openDetailsDialog(sub)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-500 text-amber-500 hover:bg-amber-500/20"
                      onClick={() => openNoteDialog(sub)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    {getAvailableActions(sub)}
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

      {/* Dialog pour ajouter une note */}
      <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
        <DialogContent className="bg-graphik-grey border-graphik-light-grey text-white">
          <DialogHeader>
            <DialogTitle>Ajouter une note</DialogTitle>
            <DialogDescription className="text-gray-400">
              Ajoutez une note pour l'abonnement de {selectedSubscription?.full_name}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            className="bg-graphik-dark border-graphik-light-grey text-white"
            placeholder="Entrez votre note ici..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-graphik-light-grey text-white hover:bg-graphik-light-grey/20"
              onClick={() => setNoteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              className="bg-graphik-blue hover:bg-graphik-blue/80"
              onClick={handleAddNote}
              disabled={!noteContent.trim()}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour afficher les détails */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="bg-graphik-grey border-graphik-light-grey text-white">
          <DialogHeader>
            <DialogTitle>Détails de l'abonnement</DialogTitle>
          </DialogHeader>
          {selectedSubscription && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Client</p>
                  <p className="text-white">{selectedSubscription.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{selectedSubscription.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Téléphone</p>
                  <p className="text-white">{selectedSubscription.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Service</p>
                  <p className="text-white">{selectedSubscription.service_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Prix total</p>
                  <p className="text-white">{selectedSubscription.total_price} FCFA</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Durée</p>
                  <p className="text-white">{selectedSubscription.duration_months} mois</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date de début</p>
                  <p className="text-white">{new Date(selectedSubscription.start_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date de fin</p>
                  <p className="text-white">{new Date(selectedSubscription.end_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Méthode de paiement</p>
                  <p className="text-white">{selectedSubscription.payment_method || "Non spécifiée"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Statut</p>
                  <SubscriptionStatusBadge status={selectedSubscription.status} />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  className="bg-graphik-blue hover:bg-graphik-blue/80"
                  onClick={() => setDetailsDialogOpen(false)}
                >
                  Fermer
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionTable;
