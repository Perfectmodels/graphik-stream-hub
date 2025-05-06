import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import PlatformCard from "@/components/PlatformCard";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IPTV = () => {
  const { toast } = useToast();

  const handleSubscribe = (platform: string) => {
    toast({
      title: "Abonnement en cours",
      description: `Vous allez être redirigé vers la page d'abonnement IPTV ${platform}`,
      duration: 3000,
    });
  };

  const iptvServices = [
  {
    name: "Xtreme HD IPTV",
    logo: "/placeholder.svg",
    previewImage: "/images/xtreme-hd-preview.jpg", // Aperçu de l'image ajouté
    description: "Service IPTV premium avec des milliers de chaînes du monde entier en HD et 4K",
    price: "À partir de 8 529 XOF/mois",
    features: [
      "+8000 chaînes TV en direct",
      "VOD avec +10000 films et séries",
      "Qualité HD et 4K UHD",
      "Compatible avec tous les appareils",
      "EPG (Guide TV) intégré",
    ],
  },
  {
    name: "Nexott",
    logo: "/placeholder.svg",
    previewImage: "/images/nexott-preview.jpg", // Aperçu de l'image ajouté
    description: "Solution IPTV complète avec un support technique réactif et une excellente stabilité",
    price: "À partir de 9 827 XOF/mois",
    features: [
      "+12000 chaînes internationales",
      "Bibliothèque VOD massive",
      "Qualité 4K et HDR",
      "Anti-gel et anti-coupure",
      "Chaînes sportives premium",
    ],
  },
  {
    name: "Netfly TV",
    logo: "/placeholder.svg",
    previewImage: "/images/netfly-preview.jpg", // Aperçu de l'image ajouté
    description: "Service IPTV avec une interface intuitive et des mises à jour régulières",
    price: "À partir de 6 554 XOF/mois",
    features: [
      "+6000 chaînes internationales",
      "Séries et films à la demande",
      "Plusieurs connexions simultanées",
      "Interface utilisateur moderne",
      "Assistance 24/7",
    ],
  },
  {
    name: "ReflexSat",
    logo: "/placeholder.svg",
    previewImage: "/images/reflexsat-preview.jpg", // Aperçu de l'image ajouté
    description: "Service fiable avec une attention particulière aux chaînes sportives et événements en direct",
    price: "À partir de 7 861 XOF/mois",
    features: [
      "Spécialisé dans les événements sportifs",
      "+9000 chaînes en direct",
      "Replay TV disponible",
      "PPV inclus sans surcoût",
      "Compatibilité multi-appareils",
    ],
  },
];
