
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SubscriptionFormValues } from "../types/subscriptionFormTypes";

interface DurationSelectionFieldProps {
  form: UseFormReturn<SubscriptionFormValues>;
}

const DurationSelectionField: React.FC<DurationSelectionFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="durationMonths"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Durée d'abonnement</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-graphik-dark border-graphik-light-grey text-white">
                <SelectValue placeholder="Choisir une durée" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-graphik-dark border-graphik-light-grey text-white">
              <SelectItem value="1">1 mois</SelectItem>
              <SelectItem value="3">3 mois (-5%)</SelectItem>
              <SelectItem value="6">6 mois (-10%)</SelectItem>
              <SelectItem value="12">12 mois (-20%)</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DurationSelectionField;
