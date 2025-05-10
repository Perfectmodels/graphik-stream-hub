
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { subscriptionFormSchema, SubscriptionFormValues } from "@/utils/subscriptionUtils";
import { submitSubscriptionForm } from "@/services/subscriptionService";
import PersonalInfoFields from "./subscription/PersonalInfoFields";
import ServiceSelectionFields from "./subscription/ServiceSelectionFields";
import AdditionalInfoField from "./subscription/AdditionalInfoField";
import { AlertCircle, Phone, Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

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
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Récupérer le service depuis les state params de la navigation
  useEffect(() => {
    if (location.state && location.state.serviceType) {
      form.setValue("serviceType", location.state.serviceType);
    }
  }, [location.state]);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      serviceType: defaultServiceType,
      durationMonths: "",
      paymentMethod: "",
      additionalInfo: "",
      startDate: new Date(),
    },
  });

  const onSubmit = async (values: SubscriptionFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Submit the form data and get the result
      await submitSubscriptionForm(values);
      
      // Notification de succès
      toast.success("Demande d'abonnement envoyée avec succès", {
        description: "Les détails de votre abonnement seront envoyés par WhatsApp. Nous vous contacterons bientôt."
      });
      
      // Délai court avant de fermer le modal ou rediriger pour laisser le temps à WhatsApp de s'ouvrir
      setTimeout(() => {
        // Redirection ou fermeture du modal
        if (isModal && onClose) {
          onClose();
        } else {
          navigate("/");
        }
      }, 1500);
      
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
        <div className="bg-blue-900/20 border border-blue-800 p-4 rounded-md mb-6 flex items-start">
          <Phone className="text-blue-400 mr-3 h-5 w-5 mt-0.5" />
          <p className="text-blue-100 text-sm">
            Assurez-vous que votre numéro de téléphone est correct et dans un format international 
            (par exemple +241 XX XX XX XX). C'est sur ce numéro que vous recevrez les détails de votre abonnement par WhatsApp.
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PersonalInfoFields form={form} disabled={isSubmitting} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nouveau champ pour la date de début */}
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
                            disabled={isSubmitting}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-graphik-dark border-graphik-light-grey" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="bg-graphik-dark text-white pointer-events-auto"
                          locale={fr}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <ServiceSelectionFields form={form} disabled={isSubmitting} />
            
            <AdditionalInfoField form={form} disabled={isSubmitting} />
            
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
