
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
    price: "À partir de 12,99€/mois",
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
    price: "À partir de 14,99€/mois",
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
    price: "À partir de 9,99€/mois",
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
    price: "À partir de 11,99€/mois",
    features: [
      "Spécialisé dans les événements sportifs",
      "+9000 chaînes en direct",
      "Replay TV disponible",
      "PPV inclus sans surcoût",
      "Compatibilité multi-appareils",
    ],
  },
];

// Mettez à jour le composant PlatformCard pour inclure l'image d'aperçu
const PlatformCard = ({ name, logo, previewImage, description, price, features, buttonAction }) => (
  <div className="bg-graphik-dark rounded-xl border border-graphik-light-grey overflow-hidden">
    {/* Aperçu de l'image */}
    <div className="w-full h-48">
      <img
        src={previewImage}
        alt={`Aperçu de ${name}`}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center mb-4">
        <img src={logo} alt={`${name} logo`} className="w-12 h-12 mr-4" />
        <h3 className="text-white text-lg font-bold">{name}</h3>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <p className="text-graphik-blue font-bold mb-4">{price}</p>
      <ul className="space-y-2 mb-4">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-400">
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={buttonAction}
        className="w-full py-2 px-4 bg-graphik-blue hover:bg-graphik-blue/80 text-white rounded-md transition"
      >
        S'abonner
      </button>
    </div>
  </div>
);
