
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuthentication } from "@/hooks/subscription/useAdminAuthentication";

export type SubscriptionApproval = {
  id: string;
  subscription_id: number;
  admin_id: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  review_date: string | null;
  approval_date: string | null;
  rejection_date: string | null;
  rejection_reason: string | null;
  additional_requirements: string | null;
  created_at: string;
  updated_at: string;
};

export const useSubscriptionApprovals = () => {
  const [loading, setLoading] = useState(false);
  const [approvals, setApprovals] = useState<SubscriptionApproval[]>([]);
  const { toast } = useToast();
  const { verifyAdminStatus } = useAdminAuthentication();

  const fetchApprovalBySubscriptionId = async (subscriptionId: number): Promise<SubscriptionApproval | null> => {
    try {
      setLoading(true);
      const isAdmin = await verifyAdminStatus();
      
      if (!isAdmin) {
        return null;
      }

      const { data, error } = await supabase
        .from('subscription_approvals')
        .select('*')
        .eq('subscription_id', subscriptionId)
        .single();

      if (error) {
        console.error("Erreur lors de la récupération de l'approbation:", error);
        return null;
      }

      // Conversion explicite des données
      const typedApproval: SubscriptionApproval = {
        ...data,
        status: data.status as 'pending' | 'approved' | 'rejected' | 'under_review'
      };

      return typedApproval;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'approbation:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateApprovalStatus = async (
    approvalId: string,
    status: 'pending' | 'approved' | 'rejected' | 'under_review',
    details?: {
      rejection_reason?: string;
      additional_requirements?: string;
    }
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const isAdmin = await verifyAdminStatus();
      
      if (!isAdmin) {
        toast({
          title: "Accès non autorisé",
          description: "Vous n'avez pas les droits d'administrateur",
          variant: "destructive",
        });
        return false;
      }

      const now = new Date().toISOString();
      
      // Préparer les données de mise à jour selon le statut
      const updateData: any = {
        status,
        updated_at: now,
        admin_id: (await supabase.auth.getSession()).data.session?.user.id
      };

      // Ajouter les champs spécifiques selon le statut
      if (status === 'under_review') {
        updateData.review_date = now;
      } else if (status === 'approved') {
        updateData.approval_date = now;
      } else if (status === 'rejected') {
        updateData.rejection_date = now;
        updateData.rejection_reason = details?.rejection_reason || null;
      }

      if (details?.additional_requirements) {
        updateData.additional_requirements = details.additional_requirements;
      }

      const { error } = await supabase
        .from('subscription_approvals')
        .update(updateData)
        .eq('id', approvalId);

      if (error) {
        console.error("Erreur lors de la mise à jour de l'approbation:", error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le statut de l'approbation",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Statut mis à jour",
        description: `Le statut de l'approbation a été mis à jour avec succès`,
      });
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'approbation:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    approvals,
    fetchApprovalBySubscriptionId,
    updateApprovalStatus
  };
};
