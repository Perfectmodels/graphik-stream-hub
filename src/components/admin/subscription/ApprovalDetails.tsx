
import React from "react";
import { SubscriptionApproval } from "@/hooks/admin/useSubscriptionApprovals";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface ApprovalDetailsProps {
  approval: SubscriptionApproval | null;
  isLoading?: boolean;
}

const ApprovalDetails: React.FC<ApprovalDetailsProps> = ({ approval, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-4 text-gray-400">Chargement des détails d'approbation...</div>;
  }

  if (!approval) {
    return (
      <div className="space-y-4 text-sm">
        <div className="text-center py-4 text-gray-400">
          Toutes les demandes d'abonnement sont automatiquement approuvées.
          <p className="mt-2 text-green-500">Aucune action nécessaire de la part de l'administrateur.</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = () => {
    switch (approval.status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/30">En attente (Auto-approuvé)</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/30">Rejeté</Badge>;
      case 'under_review':
        return <Badge variant="outline" className="bg-blue-500/20 text-blue-500 border-blue-500/30">En cours d'examen</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-500/20 text-gray-400 border-gray-500/30">Inconnu</Badge>;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Non disponible";
    
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: fr
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-gray-400">Statut actuel:</span>
        {getStatusBadge()}
      </div>
      
      <Separator className="bg-graphik-light-grey/30" />
      
      <div>
        <span className="text-gray-400">Créé:</span>
        <p className="text-white mt-1">{formatDate(approval.created_at)}</p>
      </div>
      
      <div>
        <span className="text-gray-400">Statut:</span>
        <p className="text-white mt-1">Approuvé automatiquement</p>
      </div>
      
      {approval.additional_requirements && (
        <div>
          <span className="text-gray-400">Exigences supplémentaires:</span>
          <p className="text-white mt-1">{approval.additional_requirements}</p>
        </div>
      )}
    </div>
  );
};

export default ApprovalDetails;
