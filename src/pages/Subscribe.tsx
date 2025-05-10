
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SubscriptionForm from "@/components/SubscriptionForm";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const Subscribe = () => {
  const location = useLocation();
  const [serviceType, setServiceType] = useState<string>("");
  
  // Get service type from location state if available
  useEffect(() => {
    if (location.state && location.state.serviceType) {
      setServiceType(location.state.serviceType);
      toast.info(`Abonnement à ${location.state.serviceType}`, {
        description: "Veuillez compléter le formulaire ci-dessous"
      });
    }

    // Add message to explain WhatsApp redirection
    toast.info("Redirection vers WhatsApp", {
      description: "Après l'envoi du formulaire, vous serez redirigé automatiquement vers WhatsApp pour finaliser votre demande."
    });
  }, [location.state]);

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="S'abonner à nos services"
          subtitle="Demande d'abonnement"
          description="Remplissez le formulaire ci-dessous pour souscrire à nos services de streaming et de gaming"
          backgroundImage="https://image.son-video.com/images/illustration/guides/comment-bien-choisir-son-service-de-streaming-audio-et-vod/SVDGUI-202311-ChoisirServiceDeStreaming-HeroHeader.jpg"
        />

        <section className="container mx-auto px-4 py-20">
          <SubscriptionForm defaultServiceType={serviceType} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Subscribe;
