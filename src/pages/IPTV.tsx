
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import PlatformCard from "@/components/PlatformCard";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const IPTV = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubscribe = (platform: string) => {
    toast({
      title: "Abonnement en cours",
      description: `Vous allez être redirigé vers la page d'abonnement IPTV ${platform}`,
      duration: 3000,
    });
    // Redirect to subscription page
    navigate("/subscribe", { state: { serviceType: platform } });
  };

  const iptvServices = [
    {
      name: "Xtreme HD IPTV",
      logo: "/placeholder.svg",
      description: "Service IPTV premium avec des milliers de chaînes du monde entier en HD et 4K. Forfait annuel uniquement.",
      price: "30 000 FCFA/an",
      features: [
        "+8000 chaînes TV en direct incluant Canal+",
        "VOD avec +10000 films et séries",
        "Qualité HD et 4K UHD",
        "Compatible avec tous les appareils",
        "EPG (Guide TV) intégré",
      ],
    },
    {
      name: "Nexott",
      logo: "/placeholder.svg",
      description: "Solution IPTV complète avec un support technique réactif et une excellente stabilité. Forfait annuel uniquement.",
      price: "35 000 FCFA/an",
      features: [
        "+12000 chaînes internationales incluant Canal+",
        "Bibliothèque VOD massive",
        "Qualité 4K et HDR",
        "Anti-gel et anti-coupure",
        "Chaînes sportives premium",
      ],
    },
    {
      name: "Netfly TV",
      logo: "/placeholder.svg",
      description: "Service IPTV avec une interface intuitive et des mises à jour régulières. Forfait annuel uniquement.",
      price: "25 000 FCFA/an",
      features: [
        "+6000 chaînes internationales incluant Canal+",
        "Séries et films à la demande",
        "Plusieurs connexions simultanées",
        "Interface utilisateur moderne",
        "Assistance 24/7",
      ],
    },
    {
      name: "ReflexSat",
      logo: "/placeholder.svg",
      description: "Service fiable avec une attention particulière aux chaînes sportives et événements en direct. Forfait annuel uniquement.",
      price: "28 000 FCFA/an",
      features: [
        "Spécialisé dans les événements sportifs incluant Canal+",
        "+9000 chaînes en direct",
        "Replay TV disponible",
        "PPV inclus sans surcoût",
        "Compatibilité multi-appareils",
      ],
    },
  ];

  return (
    <div>
      <Navbar />
      <Hero 
        title="Services IPTV Premium" 
        subtitle="Accès mondial aux chaînes TV"
        description="Découvrez nos services IPTV de haute qualité pour accéder à des milliers de chaînes du monde entier"
        backgroundImage="https://cdn.pixabay.com/photo/2020/04/08/16/32/server-5017527_1280.jpg"
      />
      <div className="container mx-auto px-4 py-12">
        <SectionHeader title="Découvrez nos services IPTV - Forfaits Annuels" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {iptvServices.map((service) => (
            <PlatformCard
              key={service.name}
              name={service.name}
              logo={service.logo}
              description={service.description}
              price={service.price}
              features={service.features}
              buttonAction={() => handleSubscribe(service.name)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IPTV;
