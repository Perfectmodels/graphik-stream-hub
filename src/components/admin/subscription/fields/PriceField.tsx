
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SubscriptionFormValues } from "../types/subscriptionFormTypes";

interface PriceFieldProps {
  form: UseFormReturn<SubscriptionFormValues>;
}

const PriceField: React.FC<PriceFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="totalPrice"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Prix total (FCFA)</FormLabel>
          <FormControl>
            <Input
              type="number"
              className="bg-graphik-dark border-graphik-light-grey text-white"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PriceField;
