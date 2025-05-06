
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Subscription } from "@/types/subscription";
import { SubscriptionApproval, useSubscriptionApprovals } from "@/hooks/admin/useSubscriptionApprovals";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApprovalDetails from "./ApprovalDetails";

interface ApprovalActionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: Subscription | null;
  onSuccess?: () => void;
}

const ApprovalActionsDialog: React.FC<ApprovalActionsDialogProps> = ({
  open,
  onOpenChange,
  subscription,
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState<string>("details");
  const [reason, setReason] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [approval, setApproval] = useState<SubscriptionApproval | null>(null);
  
  const { 
    loading, 
    fetchApprovalBySubscriptionId, 
    updateApprovalStatus 
  } = useSubscriptionApprovals();

  useEffect(() => {
    if (open && subscription) {
      loadApproval();
    }
  }, [open, subscription]);

  const loadApproval = async () => {
    if (!subscription) return;
    
    const approvalData = await fetchApprovalBySubscriptionId(subscription.id);
    setApproval(approvalData);
  };

  const handleAction = async (action: 'approve' | 'reject' | 'review') => {
    if (!approval || !subscription) return;
    
    setSubmitting(true);
    
    try {
      let success = false;
      
      if (action === 'approve') {
        success = await updateApprovalStatus(approval.id, 'approved', {
          additional_requirements: requirements || undefined
        });
      } else if (action === 'reject') {
        if (!reason) {
          alert("Veuillez fournir un motif de rejet");
          setSubmitting(false);
          return;
        }
        success = await updateApprovalStatus(approval.id, 'rejected', {
          rejection_reason: reason
        });
      } else if (action === 'review') {
        success = await updateApprovalStatus(approval.id, 'under_review', {
          additional_requirements: requirements || undefined
        });
      }
      
      if (success) {
        await loadApproval(); // Recharger les détails d'approbation
        if (onSuccess) onSuccess();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-graphik-dark border-graphik-light-grey text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            Gestion de l'approbation
          </DialogTitle>
        </DialogHeader>
        
        {subscription && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 bg-graphik-grey">
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="approve">Approuver</TabsTrigger>
              <TabsTrigger value="reject">Rejeter</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-4">
              <ApprovalDetails approval={approval} isLoading={loading} />
              
              <div className="flex justify-end mt-4 space-x-2">
                {approval?.status === 'pending' && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => handleAction('review')}
                    disabled={submitting}
                  >
                    Marquer en cours d'examen
                  </Button>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="approve" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-gray-400">
                  En approuvant cette demande d'abonnement, vous confirmez que tous les critères ont été satisfaits.
                </p>
                
                <div className="space-y-2">
                  <label htmlFor="requirements" className="text-sm text-gray-400">
                    Exigences supplémentaires (optionnel)
                  </label>
                  <Textarea 
                    id="requirements"
                    placeholder="Spécifiez des exigences supplémentaires si nécessaire..."
                    className="bg-graphik-grey border-graphik-light-grey text-white"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                  />
                </div>
                
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleAction('approve')}
                  disabled={submitting}
                >
                  {submitting ? "Approbation en cours..." : "Approuver la demande"}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="reject" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-gray-400">
                  Veuillez fournir un motif de rejet pour cette demande d'abonnement.
                </p>
                
                <div className="space-y-2">
                  <label htmlFor="reason" className="text-sm text-gray-400">
                    Motif de rejet <span className="text-red-500">*</span>
                  </label>
                  <Textarea 
                    id="reason"
                    placeholder="Expliquez pourquoi cette demande est rejetée..."
                    className="bg-graphik-grey border-graphik-light-grey text-white"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                
                <Button 
                  variant="destructive"
                  className="w-full"
                  onClick={() => handleAction('reject')}
                  disabled={submitting || !reason}
                >
                  {submitting ? "Rejet en cours..." : "Rejeter la demande"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
        
        <DialogFooter className="flex justify-between">
          <Button 
            variant="outline" 
            className="border-graphik-light-grey text-gray-300 hover:bg-graphik-light-grey/10"
            onClick={() => onOpenChange(false)}
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApprovalActionsDialog;
