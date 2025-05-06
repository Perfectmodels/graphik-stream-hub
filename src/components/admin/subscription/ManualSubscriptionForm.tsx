
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Subscription } from "@/types/subscription";
import { subscriptionFormSchema, SubscriptionFormValues } from "./types/subscriptionFormTypes";
import { calculateTotalPrice } from "./utils/subscriptionFormUtils";
import DateSelectionField from "./fields/DateSelectionField";
import ServiceSelectionField from "./fields/ServiceSelectionField";
import DurationSelectionField from "./fields/DurationSelectionField";
import PriceField from "./fields/PriceField";
import { useSubscriptionFormHandlers } from "./handlers/subscriptionFormHandlers";

interface ManualSubscriptionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription?: Subscription;
  onSuccess: () => void;
}

const ManualSubscriptionForm: React.FC<ManualSubscriptionFormProps> = ({
  open,
  onOpenChange,
  subscription,
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSubmit } = useSubscriptionFormHandlers();

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      startDate: subscription?.start_date ? new Date(subscription.start_date) : new Date(),
      durationMonths: subscription?.duration_months ? String(subscription.duration_months) : "1",
      serviceType: subscription?.service_type || "Netflix",
      totalPrice: subscription?.total_price ? String(subscription.total_price) : "3500"
    }
  });

  // Update the total price when service or duration changes
  React.useEffect(() => {
    const serviceType = form.watch("serviceType");
    const durationMonths = form.watch("durationMonths");
    
    if (serviceType && durationMonths) {
      const totalPrice = calculateTotalPrice(serviceType, durationMonths);
      form.setValue("totalPrice", totalPrice.toString());
    }
  }, [form.watch("serviceType"), form.watch("durationMonths")]);

  const onSubmit = async (data: SubscriptionFormValues) => {
    if (!subscription) return;
    
    setIsSubmitting(true);
    try {
      await handleSubmit(data, subscription, onSuccess, onOpenChange);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-graphik-grey border-graphik-light-grey text-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-white">Validation manuelle d'abonnement</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DateSelectionField form={form} />
            <DurationSelectionField form={form} />
            <ServiceSelectionField form={form} />
            <PriceField form={form} />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-graphik-light-grey text-white hover:bg-graphik-light-grey/10"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-graphik-purple hover:bg-graphik-violet"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Validation en cours..." : "Valider l'abonnement"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManualSubscriptionForm;
