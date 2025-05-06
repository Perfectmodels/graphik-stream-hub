
import React from "react";
import { Subscription } from "@/types/subscription";
import { BadgeCheck, BadgeAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CustomerInfoProps {
  subscription: Subscription;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ subscription }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col">
        <div className="font-medium">{subscription.full_name}</div>
        <div className="text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center">
          <span>{subscription.email}</span>
          {subscription.phone && (
            <span className="sm:before:content-['•'] sm:before:mx-1 sm:before:text-gray-500">
              {subscription.phone}
            </span>
          )}
        </div>
      </div>
      
      <div className="ml-auto flex space-x-1 flex-shrink-0">
        {subscription.has_notes && (
          <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/30">
            <BadgeAlert className="h-3 w-3 mr-1" />
            Note
          </Badge>
        )}
        
        {subscription.has_payment && subscription.payment_status === 'completed' && (
          <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30">
            <BadgeCheck className="h-3 w-3 mr-1" />
            Payé
          </Badge>
        )}
        
        {subscription.has_payment && subscription.payment_status === 'pending' && (
          <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/30">
            <BadgeAlert className="h-3 w-3 mr-1" />
            Paiement en attente
          </Badge>
        )}
      </div>
    </div>
  );
};

export default CustomerInfo;
