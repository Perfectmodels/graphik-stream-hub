
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { subscriptionFormSchema, SubscriptionFormValues } from "@/utils/subscriptionUtils";
import { submitSubscriptionForm, sendSubscriptionDocuments } from "@/services/subscriptionService";
import PersonalInfoFields from "./subscription/PersonalInfoFields";
import ServiceSelectionFields from "./subscription/ServiceSelectionFields";
import AdditionalInfoField from "./subscription/AdditionalInfoField";
import { AlertCircle, Phone } from "lucide-react";

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
    },
  });

  const onSubmit = async (values: SubscriptionFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Submit the form data and get the result
      const data = await submitSubscriptionForm(values);
      
      // Send subscription documents via WhatsApp
      try {
        await sendSubscriptionDocuments(data.id);
        
        // Notification de succès
        toast.success("Demande d'abonnement envoyée avec succès", {
          description: "Les détails de votre abonnement seront envoyés par WhatsApp. Nous vous contacterons bientôt."
        });
      } catch (sendError) {
        console.error("Erreur lors de l'envoi de la notification WhatsApp:", sendError);
        
        // Le formulaire a été enregistré, mais l'envoi de la notification a échoué
        toast.success("Demande d'abonnement enregistrée", {
          description: "Votre demande a été enregistrée, mais l'envoi de la notification WhatsApp a échoué."
        });
      }
      
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
