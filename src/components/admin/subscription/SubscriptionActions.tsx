
import React, { useState } from "react";
import { MoreVertical, Eye, FileText, CheckCircle, XCircle, Play, Pause, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Subscription } from "@/types/subscription";
import ManualSubscriptionForm from "./ManualSubscriptionForm";

interface SubscriptionActionsProps {
  subscription: Subscription;
  processingIds: number[];
  onViewDetails: (subscription: Subscription) => void;
  onAddNote: (subscription: Subscription) => void;
  updateSubscriptionStatus: (id: number, status: 'approved' | 'rejected' | 'active' | 'suspended') => Promise<void>;
}

const SubscriptionActions: React.FC<SubscriptionActionsProps> = ({ 
  subscription, 
  processingIds, 
  onViewDetails,
  onAddNote,
  updateSubscriptionStatus 
}) => {
  const [manualValidationOpen, setManualValidationOpen] = useState(false);
  const isProcessing = processingIds.includes(subscription.id);
  
  const handleStatusUpdate = async (status: 'approved' | 'rejected' | 'active' | 'suspended') => {
    await updateSubscriptionStatus(subscription.id, status);
  };
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-graphik-light-grey/20">
            <span className="sr-only">Ouvrir le menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-graphik-dark border-graphik-light-grey text-white">
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-graphik-light-grey/20"
            onClick={() => onViewDetails(subscription)}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>Voir détails</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-graphik-light-grey/20"
            onClick={() => onAddNote(subscription)}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Ajouter une note</span>
          </DropdownMenuItem>
          
          {subscription.status === 'pending' && (
            <>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-graphik-light-grey/20"
                onClick={() => handleStatusUpdate('approved')}
                disabled={isProcessing}
              >
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span>Approuver</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-graphik-light-grey/20"
                onClick={() => handleStatusUpdate('rejected')}
                disabled={isProcessing}
              >
                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                <span>Rejeter</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-graphik-light-grey/20 flex items-center"
                onClick={() => setManualValidationOpen(true)}
                disabled={isProcessing}
              >
                <Edit className="mr-2 h-4 w-4 text-blue-500" />
                <span>Validation manuelle</span>
              </DropdownMenuItem>
            </>
          )}
          
          {subscription.status === 'approved' && (
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-graphik-light-grey/20"
              onClick={() => handleStatusUpdate('active')}
              disabled={isProcessing}
            >
              <Play className="mr-2 h-4 w-4 text-green-500" />
              <span>Activer</span>
            </DropdownMenuItem>
          )}
          
          {subscription.status === 'active' && (
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-graphik-light-grey/20"
              onClick={() => handleStatusUpdate('suspended')}
              disabled={isProcessing}
            >
              <Pause className="mr-2 h-4 w-4 text-orange-500" />
              <span>Suspendre</span>
            </DropdownMenuItem>
          )}
          
          {subscription.status === 'suspended' && (
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-graphik-light-grey/20"
              onClick={() => handleStatusUpdate('active')}
              disabled={isProcessing}
            >
              <Play className="mr-2 h-4 w-4 text-green-500" />
              <span>Réactiver</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <ManualSubscriptionForm 
        open={manualValidationOpen}
        onOpenChange={setManualValidationOpen}
        subscription={subscription}
        onSuccess={() => {
          // Recharger les données après validation manuelle
          // Ceci sera géré par le parent (SubscriptionTable/useSubscriptions)
        }}
      />
    </>
  );
};

export default SubscriptionActions;
