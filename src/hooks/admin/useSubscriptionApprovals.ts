
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

      // Vérifie d'abord si une approbation existe déjà
      const { data, error } = await supabase
        .from('subscription_approvals')
        .select('*')
        .eq('subscription_id', subscriptionId)
        .single();

      if (error) {
        // Aucune approbation trouvée, créons-en une automatiquement approuvée
        const now = new Date().toISOString();
        const newApproval = {
          subscription_id: subscriptionId,
          status: 'approved' as const,
          approval_date: now,
          created_at: now,
          updated_at: now
        };
        
        const { data: insertedData, error: insertError } = await supabase
          .from('subscription_approvals')
          .insert(newApproval)
          .select('*')
          .single();
          
        if (insertError) {
          console.error("Erreur lors de la création de l'approbation:", insertError);
          return null;
        }
        
        // Conversion explicite des données
        const typedApproval: SubscriptionApproval = {
          ...insertedData,
          id: insertedData.id,
          subscription_id: insertedData.subscription_id,
          admin_id: null,
          status: insertedData.status as 'pending' | 'approved' | 'rejected' | 'under_review',
          review_date: null,
          approval_date: insertedData.approval_date,
          rejection_date: null,
          rejection_reason: null,
          additional_requirements: null,
          created_at: insertedData.created_at,
          updated_at: insertedData.updated_at
        };
        
        return typedApproval;
      }

      // Conversion explicite des données existantes
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
    // Toujours retourner true car nous considérons que tout est approuvé automatiquement
    return true;
  };

  return {
    loading,
    approvals,
    fetchApprovalBySubscriptionId,
    updateApprovalStatus
  };
};
