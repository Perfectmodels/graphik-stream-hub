
import React from "react";
import { Subscription } from "@/types/subscription";
import { BadgeCheck, BadgeAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CustomerInfoProps {
  subscription: Subscription;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ subscription }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
      <div className="flex flex-col">
        <div className="font-medium">{subscription.full_name}</div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center">
                <span className="truncate max-w-[120px] sm:max-w-[160px]">{subscription.email}</span>
                {subscription.phone && (
                  <span className="sm:before:content-['•'] sm:before:mx-1 sm:before:text-gray-500">
                    {subscription.phone}
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-graphik-dark text-white border-graphik-light-grey">
              <div className="py-1">
                <div>Email: {subscription.email}</div>
                {subscription.phone && <div>Téléphone: {subscription.phone}</div>}
                {subscription.address && <div>Adresse: {subscription.address}</div>}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="mt-1 sm:mt-0 ml-0 sm:ml-auto flex space-x-1 flex-shrink-0">
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

        {subscription.has_payment && subscription.payment_status === 'failed' && (
          <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/30">
            <BadgeAlert className="h-3 w-3 mr-1" />
            Échec
          </Badge>
        )}
      </div>
    </div>
  );
};

export default CustomerInfo;
