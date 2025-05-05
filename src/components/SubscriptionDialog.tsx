
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SubscriptionForm from "./SubscriptionForm";

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType?: string;
}

const SubscriptionDialog: React.FC<SubscriptionDialogProps> = ({
  open,
  onOpenChange,
  serviceType,
}) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-graphik-grey border-graphik-light-grey text-white sm:max-w-[600px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-white">S'abonner à {serviceType || "nos services"}</DialogTitle>
        </DialogHeader>
        <SubscriptionForm 
          defaultServiceType={serviceType} 
          onClose={handleClose}
          isModal={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;
