
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X, MessageSquare, Play, Pause, Eye, Plus } from "lucide-react";
import { Subscription } from "@/types/subscription";

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
  const isProcessing = processingIds.includes(subscription.id);
  
  const handleStatusUpdate = async (status: 'approved' | 'rejected' | 'active' | 'suspended') => {
    console.log(`Requesting status update for subscription ${subscription.id} to ${status}`);
    await updateSubscriptionStatus(subscription.id, status);
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
              onClick={() => handleStatusUpdate('approved')}
              disabled={isProcessing}
            >
              {isProcessing ? "..." : <Check className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-500 text-red-500 hover:bg-red-500/20"
              onClick={() => handleStatusUpdate('rejected')}
              disabled={isProcessing}
            >
              {isProcessing ? "..." : <X className="h-4 w-4" />}
            </Button>
          </>
        );
      case 'approved':
        return (
          <Button
            variant="outline"
            size="sm"
            className="border-blue-500 text-blue-500 hover:bg-blue-500/20"
            onClick={() => handleStatusUpdate('active')}
            disabled={isProcessing}
          >
            {isProcessing ? "..." : <Play className="h-4 w-4" />}
          </Button>
        );
      case 'active':
        return (
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500 text-purple-500 hover:bg-purple-500/20"
            onClick={() => handleStatusUpdate('suspended')}
            disabled={isProcessing}
          >
            {isProcessing ? "..." : <Pause className="h-4 w-4" />}
          </Button>
        );
      case 'suspended':
        return (
          <Button
            variant="outline"
            size="sm"
            className="border-blue-500 text-blue-500 hover:bg-blue-500/20"
            onClick={() => handleStatusUpdate('active')}
            disabled={isProcessing}
          >
            {isProcessing ? "..." : <Play className="h-4 w-4" />}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="border-gray-500 text-gray-300 hover:bg-graphik-light-grey/20"
        onClick={() => onViewDetails(subscription)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="border-amber-500 text-amber-500 hover:bg-amber-500/20"
        onClick={() => onAddNote(subscription)}
      >
        <Plus className="h-4 w-4 mr-1" />
        <MessageSquare className="h-4 w-4" />
      </Button>
      {getAvailableActions(subscription)}
    </div>
  );
};

export default SubscriptionActions;
