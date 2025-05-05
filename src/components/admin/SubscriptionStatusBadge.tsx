
import React from "react";

interface SubscriptionStatusBadgeProps {
  status: string;
}

const SubscriptionStatusBadge: React.FC<SubscriptionStatusBadgeProps> = ({ status }) => {
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
    case 'active':
      return (
        <div className="bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full text-xs inline-flex items-center">
          Actif
        </div>
      );
    case 'expired':
      return (
        <div className="bg-gray-500/20 text-gray-500 px-2 py-1 rounded-full text-xs inline-flex items-center">
          Expiré
        </div>
      );
    case 'suspended':
      return (
        <div className="bg-purple-500/20 text-purple-500 px-2 py-1 rounded-full text-xs inline-flex items-center">
          Suspendu
        </div>
      );
    default:
      return <span>{status}</span>;
  }
};

export default SubscriptionStatusBadge;
