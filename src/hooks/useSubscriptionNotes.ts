
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSubscriptionNotes = (onNotesAdded?: () => void) => {
  const { toast } = useToast();

  const addNote = async (id: number, note: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour ajouter une note",
          variant: "destructive",
        });
        return;
      }
      
      const { error } = await supabase
        .from('admin_notes')
        .insert({
          subscription_id: id,
          admin_id: session.session.user.id,
          note
        });
        
      if (error) throw error;
      
      toast({
        title: "Note ajoutée",
        description: "Votre note a été ajoutée avec succès",
      });
      
      if (onNotesAdded) {
        onNotesAdded();
      }
      
    } catch (error) {
      console.error("Erreur lors de l'ajout de la note:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la note",
        variant: "destructive",
      });
    }
  };

  return {
    addNote
  };
};
