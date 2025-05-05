
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import SubscriptionStatusBadge from "./SubscriptionStatusBadge";

export type Subscription = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  status: 'pending' | 'approved' | 'rejected';
  total_price: number;
  created_at: string;
  start_date: string;
  end_date: string;
  duration_months: number;
}

interface SubscriptionTableProps {
  loading: boolean;
  filteredSubscriptions: Subscription[];
  processingIds: number[];
  updateSubscriptionStatus: (id: number, status: 'approved' | 'rejected') => Promise<void>;
  searchTerm: string;
}

const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  loading,
  filteredSubscriptions,
  processingIds,
  updateSubscriptionStatus,
  searchTerm
}) => {
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="text-center py-8 text-gray-400">Chargement des abonnements...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
              <TableHead className="text-white">Client</TableHead>
              <TableHead className="text-white">Service</TableHead>
              <TableHead className="text-white">Statut</TableHead>
              <TableHead className="text-white">Prix</TableHead>
              <TableHead className="text-white">Durée</TableHead>
              <TableHead className="text-white">Date de demande</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscriptions.map((sub) => (
              <TableRow key={sub.id} className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                <TableCell className="font-medium text-white">
                  <div>{sub.full_name}</div>
                  <div className="text-xs text-gray-400">{sub.email}</div>
                </TableCell>
                <TableCell className="text-gray-300">{sub.service_type}</TableCell>
                <TableCell>
                  <SubscriptionStatusBadge status={sub.status} />
                </TableCell>
                <TableCell className="text-gray-300">{sub.total_price} FCFA</TableCell>
                <TableCell className="text-gray-300">{sub.duration_months} mois</TableCell>
                <TableCell className="text-gray-300">
                  {new Date(sub.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500 text-green-500 hover:bg-green-500/20"
                      onClick={() => updateSubscriptionStatus(sub.id, 'approved')}
                      disabled={sub.status !== 'pending' || processingIds.includes(sub.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-500/20"
                      onClick={() => updateSubscriptionStatus(sub.id, 'rejected')}
                      disabled={sub.status !== 'pending' || processingIds.includes(sub.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredSubscriptions.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                  {searchTerm ? "Aucun abonnement ne correspond à votre recherche" : "Aucune demande d'abonnement trouvée"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default SubscriptionTable;
