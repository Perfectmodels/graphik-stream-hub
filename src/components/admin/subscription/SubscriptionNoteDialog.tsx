
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Subscription } from "@/types/subscription";

interface SubscriptionNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: Subscription | null;
  onAddNote: (id: number, note: string) => Promise<void>;
}

const SubscriptionNoteDialog: React.FC<SubscriptionNoteDialogProps> = ({
  open,
  onOpenChange,
  subscription,
  onAddNote,
}) => {
  const [noteContent, setNoteContent] = useState("");

  const handleAddNote = async () => {
    if (subscription && noteContent.trim()) {
      await onAddNote(subscription.id, noteContent);
      setNoteContent("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-graphik-grey border-graphik-light-grey text-white">
        <DialogHeader>
          <DialogTitle>Ajouter une note</DialogTitle>
          <DialogDescription className="text-gray-400">
            {subscription && `Ajoutez une note pour l'abonnement de ${subscription.full_name}`}
          </DialogDescription>
        </DialogHeader>
        
        <Textarea
          className="bg-graphik-dark border-graphik-light-grey text-white"
          placeholder="Entrez votre note ici..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          rows={4}
        />
        
        <DialogFooter>
          <Button 
            variant="outline" 
            className="border-graphik-light-grey text-white hover:bg-graphik-light-grey/20"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button 
            className="bg-graphik-blue hover:bg-graphik-blue/80"
            onClick={handleAddNote}
            disabled={!noteContent.trim()}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionNoteDialog;
