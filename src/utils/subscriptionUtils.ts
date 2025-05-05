
import { z } from "zod";

// Form schema definition
export const subscriptionFormSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom complet est requis" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().min(6, { message: "Numéro de téléphone requis" }),
  address: z.string().optional(),
  serviceType: z.string().min(1, { message: "Veuillez sélectionner un service" }),
  durationMonths: z.string().min(1, { message: "Veuillez sélectionner une durée" }),
  paymentMethod: z.string().min(1, { message: "Veuillez sélectionner un mode de paiement" }),
  additionalInfo: z.string().optional(),
});

// Type for the form schema
export type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

// Service price calculation utility
export const getServicePrice = (service: string, duration: string): number => {
  // Prix en FCFA
  const durationMonths = parseInt(duration);
  
  const basePrices: Record<string, number> = {
    "Netflix": 3000,
    "Disney+": 4000,
    "Amazon Prime Video": 3000,
    "Canal+": 6000,
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
