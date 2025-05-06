
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
    return <div className="text-center py-4 text-gray-400">Aucune information d'approbation disponible</div>;
  }

  const getStatusBadge = () => {
    switch (approval.status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/30">En attente</Badge>;
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
      
      {approval.review_date && (
        <div>
          <span className="text-gray-400">Mise en examen:</span>
          <p className="text-white mt-1">{formatDate(approval.review_date)}</p>
        </div>
      )}
      
      {approval.approval_date && (
        <div>
          <span className="text-gray-400">Date d'approbation:</span>
          <p className="text-white mt-1">{formatDate(approval.approval_date)}</p>
        </div>
      )}
      
      {approval.rejection_date && (
        <div>
          <span className="text-gray-400">Date de rejet:</span>
          <p className="text-white mt-1">{formatDate(approval.rejection_date)}</p>
        </div>
      )}
      
      {approval.rejection_reason && (
        <div>
          <span className="text-gray-400">Motif de rejet:</span>
          <p className="text-white mt-1">{approval.rejection_reason}</p>
        </div>
      )}
      
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
