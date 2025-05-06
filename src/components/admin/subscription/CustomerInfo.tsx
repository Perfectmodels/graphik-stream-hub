
import React from "react";
import { Subscription } from "@/types/subscription";

interface CustomerInfoProps {
  subscription: Subscription;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ subscription }) => {
  return (
    <div className="flex items-center">
      <div>
        <div>{subscription.full_name}</div>
        <div className="text-xs text-gray-400">{subscription.email}</div>
      </div>
      {(subscription.has_notes || subscription.has_payment) && (
        <div className="ml-2 flex space-x-1">
          {subscription.has_notes && (
            <div className="text-xs bg-amber-500/20 text-amber-500 px-1 rounded">Note</div>
          )}
          {subscription.has_payment && subscription.payment_status === 'completed' && (
            <div className="text-xs bg-green-500/20 text-green-500 px-1 rounded">Payé</div>
          )}
          {subscription.has_payment && subscription.payment_status === 'pending' && (
            <div className="text-xs bg-amber-500/20 text-amber-500 px-1 rounded">Paiement en attente</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerInfo;
