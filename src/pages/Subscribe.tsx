
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
          backgroundImage="https://images.unsplash.com/photo-1603969072881-b0fc7f3d77d7?auto=format&fit=crop&q=80&w=1600"
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
