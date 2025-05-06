
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Subscription } from "@/types/subscription";
import SubscriptionStatusBadge from "../SubscriptionStatusBadge";
import { useSubscriptionApprovals, SubscriptionApproval } from "@/hooks/admin/useSubscriptionApprovals";
import ApprovalDetails from "./ApprovalDetails";

interface SubscriptionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: Subscription | null;
}

const SubscriptionDetailsDialog: React.FC<SubscriptionDetailsDialogProps> = ({ open, onOpenChange, subscription }) => {
  const [activeTab, setActiveTab] = useState<string>("details");
  const [approval, setApproval] = useState<SubscriptionApproval | null>(null);
  const { loading: approvalLoading, fetchApprovalBySubscriptionId } = useSubscriptionApprovals();

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

  if (!subscription) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-graphik-dark border-graphik-light-grey text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            <span>Détails de l'abonnement</span>
            <SubscriptionStatusBadge status={subscription.status} />
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 bg-graphik-grey">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="approval">Approbation</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Informations client</h3>
                  <Table>
                    <TableBody>
                      <TableRow className="border-graphik-light-grey/30">
                        <TableCell className="text-gray-400 py-2">Nom complet</TableCell>
                        <TableCell className="text-white py-2">{subscription.full_name}</TableCell>
                      </TableRow>
                      <TableRow className="border-graphik-light-grey/30">
                        <TableCell className="text-gray-400 py-2">Email</TableCell>
                        <TableCell className="text-white py-2">{subscription.email}</TableCell>
                      </TableRow>
                      <TableRow className="border-graphik-light-grey/30">
                        <TableCell className="text-gray-400 py-2">Téléphone</TableCell>
                        <TableCell className="text-white py-2">{subscription.phone}</TableCell>
                      </TableRow>
                      {subscription.address && (
                        <TableRow className="border-graphik-light-grey/30">
                          <TableCell className="text-gray-400 py-2">Adresse</TableCell>
                          <TableCell className="text-white py-2">{subscription.address}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Informations de paiement</h3>
                  <Table>
                    <TableBody>
                      <TableRow className="border-graphik-light-grey/30">
                        <TableCell className="text-gray-400 py-2">Méthode</TableCell>
                        <TableCell className="text-white py-2">{subscription.payment_method}</TableCell>
                      </TableRow>
                      <TableRow className="border-graphik-light-grey/30">
                        <TableCell className="text-gray-400 py-2">Statut</TableCell>
                        <TableCell className="text-white py-2">
                          {subscription.payment_status ? (
                            <span className={
                              subscription.payment_status === "completed" 
                                ? "text-green-500" 
                                : subscription.payment_status === "pending" 
                                  ? "text-amber-500" 
                                  : "text-red-500"
                            }>
                              {subscription.payment_status === "completed" 
                                ? "Payé" 
                                : subscription.payment_status === "pending" 
                                  ? "En attente" 
                                  : subscription.payment_status}
                            </span>
                          ) : "Non disponible"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Détails de l'abonnement</h3>
                  <Table>
                    <TableBody>
                      <TableRow className="border-graphik-light-grey/30">
                        <TableCell className="text-gray-400 py-2">Service</TableCell>
                        <TableCell className="text-white py-2">{subscription.service_type}</TableCell>
                      </TableRow>
                      <TableRow className="border-graphik-light-grey/30">
                        <TableCell className="text-gray-400 py-2">Prix total</TableCell>
                        <TableCell className="text-white py-2">{subscription.total_price} FCFA</TableCell>
                      </TableRow>
                      <TableRow className="border-graphik-light-grey/30">
                        <TableCell className="text-gray-400 py-2">Durée</TableCell>
                        <TableCell className="text-white py-2">{subscription.duration_months} mois</TableCell>
                      </TableRow>
                      <TableRow className="border-graphik-light-grey/30">
                        <TableCell className="text-gray-400 py-2">Date de début</TableCell>
                        <TableCell className="text-white py-2">{formatDate(subscription.start_date)}</TableCell>
                      </TableRow>
                      <TableRow className="border-graphik-light-grey/30">
                        <TableCell className="text-gray-400 py-2">Date de fin</TableCell>
                        <TableCell className="text-white py-2">{formatDate(subscription.end_date)}</TableCell>
                      </TableRow>
                      <TableRow className="border-graphik-light-grey/30">
                        <TableCell className="text-gray-400 py-2">Date de demande</TableCell>
                        <TableCell className="text-white py-2">{formatDate(subscription.created_at)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="approval" className="mt-4">
            <div className="p-4 bg-graphik-grey/30 rounded-md">
              <ApprovalDetails approval={approval} isLoading={approvalLoading} />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDetailsDialog;
