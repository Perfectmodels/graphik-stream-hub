
import { z } from "zod";

export const subscriptionFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Nom complet requis. Minimum 2 caractères.",
  }),
  email: z.string().email({
    message: "Email invalide.",
  }),
  phone: z.string().min(8, {
    message: "Numéro de téléphone invalide.",
  }),
  address: z.string().optional(),
  serviceType: z.string({
    required_error: "Veuillez sélectionner un service.",
  }),
  durationMonths: z.string({
    required_error: "Veuillez sélectionner une durée.",
  }),
  paymentMethod: z.string({
    required_error: "Veuillez sélectionner une méthode de paiement.",
  }),
  startDate: z.date({
    required_error: "Veuillez sélectionner une date de début.",
  }),
  additionalInfo: z.string().optional(),
  totalPrice: z.number().optional(),
});

export type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

export const getServicePrice = (serviceType: string, durationMonths: string): number => {
  // Base price is 2500 FCFA/month for all services
  const baseMonthlyPrice = 2500;
  
  // Convert duration to number
  const months = parseInt(durationMonths);
  
  // For IPTV services, only offer annual plans
  if (serviceType.includes('IPTV')) {
    // Annual plans pricing for IPTV services
    const annualPrices: { [key: string]: number } = {
      "Xtreme HD IPTV": 30000,
      "Nexott": 35000,
      "Netfly TV": 25000,
      "ReflexSat": 28000,
      "IPTV Standard": 25000,
      "IPTV Premium": 30000,
      "IPTV Ultra": 35000,
    };
    
    // If it's not annual plan but user selected IPTV, force annual price
    if (months !== 12) {
      return annualPrices[serviceType] || 30000;
    }
    
    return annualPrices[serviceType] || 30000;
  }
  
  // For other services, apply standard pricing with discounts
  let discount = 0;
  
  switch (durationMonths) {
    case "3": discount = 0.05; break; // 5% discount
    case "6": discount = 0.10; break; // 10% discount
    case "12": discount = 0.20; break; // 20% discount
    default: discount = 0; break;
  }
  
  return Math.round(baseMonthlyPrice * months * (1 - discount));
};
