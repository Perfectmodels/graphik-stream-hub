
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Subscription } from "@/types/subscription";

const subscriptionFormSchema = z.object({
  startDate: z.date({
    required_error: "La date de début est requise",
  }),
  durationMonths: z.string({
    required_error: "La durée de l'abonnement est requise",
  }),
  serviceType: z.string({
    required_error: "Le type de service est requis",
  }),
  totalPrice: z.string().min(1, "Le prix total est requis"),
});

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

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
  const { toast } = useToast();

  // Calculer la date de fin en fonction de la date de début et de la durée
  const calculateEndDate = (startDate: Date, durationMonths: string) => {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + parseInt(durationMonths));
    return endDate;
  };

  // Prix par défaut basé sur le service
  const getServicePrice = (serviceType: string) => {
    const prices: {[key: string]: number} = {
      "Netflix": 3500,
      "Disney+": 2500,
      "Amazon Prime Video": 2000,
      "Canal+": 5000,
      "Spotify": 1500,
      "Apple Music": 1500,
      "Xbox Game Pass": 4000,
      "PlayStation Plus": 4500,
      "IPTV Standard": 5000,
      "IPTV Premium": 7500,
      "IPTV Ultra": 10000
    };
    return prices[serviceType] || 2500;
  };

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      startDate: subscription?.start_date ? new Date(subscription.start_date) : new Date(),
      durationMonths: subscription?.duration_months ? String(subscription.duration_months) : "1",
      serviceType: subscription?.service_type || "Netflix",
      totalPrice: subscription?.total_price ? String(subscription.total_price) : "3500"
    }
  });

  // Mettre à jour le prix total quand le service ou la durée change
  React.useEffect(() => {
    const serviceType = form.watch("serviceType");
    const durationMonths = form.watch("durationMonths");
    
    if (serviceType && durationMonths) {
      const basePrice = getServicePrice(serviceType);
      let discount = 0;
      
      switch (durationMonths) {
        case "3": discount = 0.05; break; // 5% discount
        case "6": discount = 0.10; break; // 10% discount
        case "12": discount = 0.20; break; // 20% discount
        default: discount = 0; break;
      }
      
      const totalPrice = Math.round(basePrice * parseInt(durationMonths) * (1 - discount));
      form.setValue("totalPrice", totalPrice.toString());
    }
  }, [form.watch("serviceType"), form.watch("durationMonths")]);

  const onSubmit = async (data: SubscriptionFormValues) => {
    if (!subscription) return;
    
    setIsSubmitting(true);
    
    try {
      // Calculer la date de fin
      const endDate = calculateEndDate(data.startDate, data.durationMonths);
      
      // Mettre à jour l'abonnement
      const { error } = await supabase
        .from('subscription_requests')
        .update({
          service_type: data.serviceType,
          total_price: parseFloat(data.totalPrice),
          duration_months: parseInt(data.durationMonths),
          start_date: format(data.startDate, 'yyyy-MM-dd'),
          end_date: format(endDate, 'yyyy-MM-dd'),
          status: 'approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', subscription.id);
      
      if (error) throw error;
      
      // Créer un enregistrement de paiement
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          subscription_id: subscription.id,
          amount: parseFloat(data.totalPrice),
          payment_method: subscription.payment_method || 'Mobile Money',
          payment_status: 'pending'
        });
        
      if (paymentError) {
        console.error("Erreur lors de la création du paiement:", paymentError);
      }
      
      toast({
        title: "Abonnement validé",
        description: "Les informations d'abonnement ont été mises à jour avec succès",
      });
      
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      console.error("Erreur lors de la validation manuelle:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'abonnement",
        variant: "destructive",
      });
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
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Date de début</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal bg-graphik-dark border-graphik-light-grey text-white",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Sélectionner une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-graphik-dark border-graphik-light-grey" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="bg-graphik-dark text-white pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
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
