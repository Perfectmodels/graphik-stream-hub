
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SubscriptionStatusBadge from "../SubscriptionStatusBadge";
import { Subscription } from "@/types/subscription";

interface SubscriptionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: Subscription | null;
}

const SubscriptionDetailsDialog: React.FC<SubscriptionDetailsDialogProps> = ({
  open,
  onOpenChange,
  subscription,
}) => {
  if (!subscription) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-graphik-grey border-graphik-light-grey text-white">
        <DialogHeader>
          <DialogTitle>Détails de l'abonnement</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Client</p>
              <p className="text-white">{subscription.full_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-white">{subscription.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Téléphone</p>
              <p className="text-white">{subscription.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Service</p>
              <p className="text-white">{subscription.service_type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Prix total</p>
              <p className="text-white">{subscription.total_price} FCFA</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Durée</p>
              <p className="text-white">{subscription.duration_months} mois</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Date de début</p>
              <p className="text-white">{new Date(subscription.start_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Date de fin</p>
              <p className="text-white">{new Date(subscription.end_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Méthode de paiement</p>
              <p className="text-white">{subscription.payment_method || "Non spécifiée"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Statut</p>
              <SubscriptionStatusBadge status={subscription.status} />
            </div>
          </div>

          <DialogFooter>
            <Button 
              className="bg-graphik-blue hover:bg-graphik-blue/80"
              onClick={() => onOpenChange(false)}
            >
              Fermer
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDetailsDialog;
