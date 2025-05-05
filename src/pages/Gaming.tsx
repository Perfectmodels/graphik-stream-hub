
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
          backgroundImage="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600"
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
