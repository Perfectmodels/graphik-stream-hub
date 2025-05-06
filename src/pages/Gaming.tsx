
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SubscriptionDialog from "@/components/SubscriptionDialog";

// Import our new components
import GamingCredits from "@/components/gaming/GamingCredits";
import GamingSubscriptions from "@/components/gaming/GamingSubscriptions";
import GiftCards from "@/components/gaming/GiftCards";
import GamingFeatures from "@/components/gaming/GamingFeatures";
import HowToUse from "@/components/gaming/HowToUse";
import GamingFAQ from "@/components/gaming/GamingFAQ";

const Gaming = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const handleSubscribe = (platform: string) => {
    setSelectedPlatform(platform);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="Gaming & Jeux Vidéo"
          subtitle="Crédits et Abonnements"
          description="Boostez votre expérience de jeu avec nos cartes, crédits et abonnements pour les plateformes les plus populaires"
          backgroundImage="https://assets.euromoneydigital.com/dims4/default/01fc673/2147483647/strip/true/crop/995x559+0+0/resize/840x472!/quality/90/?url=http%3A%2F%2Feuromoney-brightspot.s3.amazonaws.com%2Fa5%2F90%2F0f1167c248d59035af5b47af3fc6%2Fgaming-virtual-blue-adobestock.jpg"
        />

        <GamingCredits onSubscribe={handleSubscribe} />
        <GamingSubscriptions onSubscribe={handleSubscribe} />
        <GiftCards onBuyCard={handleSubscribe} />
        <GamingFeatures />
        <HowToUse />
        <GamingFAQ />

        {/* Subscription Dialog */}
        <SubscriptionDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen}
          serviceType={selectedPlatform}
        />
      </main>
      <Footer />
    </>
  );
};

export default Gaming;
