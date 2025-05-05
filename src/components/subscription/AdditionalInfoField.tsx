
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { SubscriptionFormValues } from "@/utils/subscriptionUtils";

interface AdditionalInfoFieldProps {
  form: UseFormReturn<SubscriptionFormValues>;
  disabled?: boolean;
}

const AdditionalInfoField: React.FC<AdditionalInfoFieldProps> = ({ form, disabled = false }) => {
  return (
    <FormField
      control={form.control}
      name="additionalInfo"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Informations complémentaires (optionnel)</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Précisez toute information utile concernant votre abonnement" 
              className="bg-graphik-dark border-graphik-light-grey text-white min-h-[120px]"
              disabled={disabled}
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AdditionalInfoField;
