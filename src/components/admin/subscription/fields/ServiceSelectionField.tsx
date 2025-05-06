
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SubscriptionFormValues } from "../types/subscriptionFormTypes";

interface ServiceSelectionFieldProps {
  form: UseFormReturn<SubscriptionFormValues>;
}

const ServiceSelectionField: React.FC<ServiceSelectionFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="serviceType"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Type de service</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
  );
};

export default ServiceSelectionField;
