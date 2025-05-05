
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SubscriptionFormValues } from "@/utils/subscriptionUtils";

interface ServiceSelectionFieldsProps {
  form: UseFormReturn<SubscriptionFormValues>;
  disabled?: boolean;
}

const ServiceSelectionFields: React.FC<ServiceSelectionFieldsProps> = ({ form, disabled = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="serviceType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Service</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger className="bg-graphik-dark border-graphik-light-grey text-white">
                  <SelectValue placeholder="Choisir un service" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-graphik-dark border-graphik-light-grey text-white">
                <SelectItem value="Netflix">Netflix</SelectItem>
                <SelectItem value="Disney+">Disney+</SelectItem>
                <SelectItem value="Amazon Prime Video">Amazon Prime Video</SelectItem>
                <SelectItem value="Canal+">Canal+</SelectItem>
                <SelectItem value="Apple TV+">Apple TV+</SelectItem>
                <SelectItem value="Paramount+">Paramount+</SelectItem>
                <SelectItem value="Max (ex-HBO Max)">Max (ex-HBO Max)</SelectItem>
                <SelectItem value="Spotify">Spotify</SelectItem>
                <SelectItem value="Apple Music">Apple Music</SelectItem>
                <SelectItem value="Deezer">Deezer</SelectItem>
                <SelectItem value="Amazon Music">Amazon Music</SelectItem>
                <SelectItem value="Xbox Game Pass">Xbox Game Pass</SelectItem>
                <SelectItem value="PlayStation Plus">PlayStation Plus</SelectItem>
                <SelectItem value="Nintendo Switch Online">Nintendo Switch Online</SelectItem>
                <SelectItem value="EA Play">EA Play</SelectItem>
                <SelectItem value="IPTV Standard">IPTV Standard</SelectItem>
                <SelectItem value="IPTV Premium">IPTV Premium</SelectItem>
                <SelectItem value="IPTV Ultra">IPTV Ultra</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="durationMonths"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Durée d'abonnement</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              disabled={disabled}
            >
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
      
      <FormField
        control={form.control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Mode de paiement</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger className="bg-graphik-dark border-graphik-light-grey text-white">
                  <SelectValue placeholder="Choisir un mode de paiement" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-graphik-dark border-graphik-light-grey text-white">
                <SelectItem value="Airtel Money">Airtel Money</SelectItem>
                <SelectItem value="Moov Money">Moov Money</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ServiceSelectionFields;
