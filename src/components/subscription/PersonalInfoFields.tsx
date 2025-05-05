
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SubscriptionFormValues } from "@/utils/subscriptionUtils";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<SubscriptionFormValues>;
  disabled?: boolean;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ form, disabled = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Nom complet</FormLabel>
            <FormControl>
              <Input 
                placeholder="Votre nom complet" 
                className="bg-graphik-dark border-graphik-light-grey text-white"
                disabled={disabled}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Email</FormLabel>
            <FormControl>
              <Input 
                type="email"
                placeholder="votre@email.com" 
                className="bg-graphik-dark border-graphik-light-grey text-white"
                disabled={disabled}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Téléphone</FormLabel>
            <FormControl>
              <Input 
                placeholder="Ex: +241 XX XX XX XX" 
                className="bg-graphik-dark border-graphik-light-grey text-white"
                disabled={disabled}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Adresse (optionnel)</FormLabel>
            <FormControl>
              <Input 
                placeholder="Votre adresse" 
                className="bg-graphik-dark border-graphik-light-grey text-white"
                disabled={disabled}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoFields;
