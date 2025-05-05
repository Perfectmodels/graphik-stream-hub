import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom complet est requis" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().min(6, { message: "Numéro de téléphone requis" }),
  address: z.string().optional(),
  serviceType: z.string().min(1, { message: "Veuillez sélectionner un service" }),
  durationMonths: z.string().min(1, { message: "Veuillez sélectionner une durée" }),
  paymentMethod: z.string().min(1, { message: "Veuillez sélectionner un mode de paiement" }),
  additionalInfo: z.string().optional(),
});

interface SubscriptionFormProps {
  defaultServiceType?: string;
  onClose?: () => void;
  isModal?: boolean;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ 
  defaultServiceType = "", 
  onClose,
  isModal = false
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      serviceType: defaultServiceType,
      durationMonths: "",
      paymentMethod: "",
      additionalInfo: "",
    },
  });

  const getServicePrice = (service: string, duration: string) => {
    // Prix en FCFA
    const durationMonths = parseInt(duration);
    
    const basePrices: Record<string, number> = {
      "Netflix": 5000,
      "Disney+": 4000,
      "Amazon Prime Video": 3500,
      "Canal+": 15000,
      "Apple TV+": 4500,
      "Paramount+": 4000,
      "Max (ex-HBO Max)": 6000,
      "Spotify": 3000,
      "Apple Music": 3000,
      "Deezer": 2500,
      "Amazon Music": 2500,
      "Xbox Game Pass": 7000,
      "PlayStation Plus": 6000,
      "Nintendo Switch Online": 2500,
      "EA Play": 3500,
      "IPTV Standard": 10000,
      "IPTV Premium": 15000,
      "IPTV Ultra": 25000,
      "Call of Duty": 6000,
      "Fortnite": 5000,
      "PUBG": 3000,
      "Roblox": 3000,
    };

    // Prix de base pour le service sélectionné (ou 5000 FCFA par défaut)
    const basePrice = basePrices[service] || 5000;
    
    // Calcul du prix total avec remise pour les abonnements plus longs
    let discount = 0;
    if (durationMonths >= 12) {
      discount = 0.20; // 20% de remise pour 12 mois ou plus
    } else if (durationMonths >= 6) {
      discount = 0.10; // 10% de remise pour 6 mois ou plus
    } else if (durationMonths >= 3) {
      discount = 0.05; // 5% de remise pour 3 mois
    }
    
    const totalPrice = basePrice * durationMonths * (1 - discount);
    return totalPrice;
  };

  const sendSubscriptionDocuments = async (subscriptionId: number) => {
    try {
      const { error } = await supabase.functions.invoke('send-subscription', {
        body: { subscriptionId },
      });
      
      if (error) {
        console.error("Erreur lors de l'envoi des documents:", error);
        toast({
          title: "Erreur",
          description: "Les documents n'ont pas pu être envoyés. Notre équipe vous contactera sous peu.",
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Documents envoyés",
        description: "Les détails de votre demande ont été envoyés à votre email et WhatsApp.",
      });
      return true;
    } catch (error) {
      console.error("Erreur lors de l'appel à la fonction:", error);
      toast({
        title: "Erreur",
        description: "Les documents n'ont pas pu être envoyés. Notre équipe vous contactera sous peu.",
        variant: "destructive",
      });
      return false;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Calcul du prix total
      const totalPrice = getServicePrice(values.serviceType, values.durationMonths);
      
      // Calcul des dates
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + parseInt(values.durationMonths));
      
      // Préparation des données
      const subscriptionData = {
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        service_type: values.serviceType,
        duration_months: parseInt(values.durationMonths),
        payment_method: values.paymentMethod,
        additional_info: values.additionalInfo,
        total_price: totalPrice,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        status: "pending"
      };
      
      // Envoi à Supabase
      const { data, error } = await supabase
        .from('subscription_requests')
        .insert(subscriptionData)
        .select()
        .single();
        
      if (error) throw error;

      // Envoi par email et WhatsApp
      try {
        await supabase.functions.invoke('send-subscription', {
          body: { subscriptionId: data.id }
        });
        
        // Notification de succès complète
        toast.success("Demande d'abonnement envoyée avec succès", {
          description: "Un email de confirmation a été envoyé à votre adresse. Nous vous contacterons bientôt."
        });
      } catch (sendError) {
        console.error("Erreur lors de l'envoi des notifications:", sendError);
        
        // Le formulaire a été enregistré, mais l'envoi des notifications a échoué
        toast.success("Demande d'abonnement enregistrée", {
          description: "Votre demande a été enregistrée, mais l'envoi des notifications a échoué."
        });
      }
      
      // Appel à la fonction Edge pour envoyer les documents
      await sendSubscriptionDocuments(data.id);
      
      // Redirection ou fermeture du modal
      if (isModal && onClose) {
        onClose();
      } else {
        navigate("/");
      }
      
    } catch (error: any) {
      console.error("Erreur lors de l'envoi de la demande:", error);
      toast.error("Erreur lors de l'envoi", {
        description: error.message || "Veuillez réessayer ultérieurement."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`${isModal ? '' : 'max-w-3xl mx-auto'} bg-graphik-grey border-graphik-light-grey`}>
      <CardHeader>
        <CardTitle className="text-white">Demande d'abonnement</CardTitle>
        <CardDescription className="text-gray-300">
          Complétez ce formulaire pour souscrire à nos services
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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
                    >
                      <FormControl>
                        <SelectTrigger className="bg-graphik-dark border-graphik-light-grey text-white">
                          <SelectValue placeholder="Choisir un mode de paiement" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-graphik-dark border-graphik-light-grey text-white">
                        <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                        <SelectItem value="Carte bancaire">Carte bancaire</SelectItem>
                        <SelectItem value="Virement bancaire">Virement bancaire</SelectItem>
                        <SelectItem value="Espèces">Espèces</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <CardFooter className="flex justify-end px-0 pt-4">
              {isModal && onClose && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="mr-2 border-graphik-light-grey text-white hover:bg-graphik-light-grey/10"
                >
                  Annuler
                </Button>
              )}
              <Button 
                type="submit" 
                className="bg-graphik-purple hover:bg-graphik-violet"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SubscriptionForm;
