
import { z } from "zod";

export const subscriptionFormSchema = z.object({
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

export type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;
