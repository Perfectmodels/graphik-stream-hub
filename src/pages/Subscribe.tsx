
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SubscriptionForm from "@/components/SubscriptionForm";

const Subscribe = () => {
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
          <SubscriptionForm />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Subscribe;
