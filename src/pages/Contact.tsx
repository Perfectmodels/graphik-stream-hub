
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
      duration: 3000,
    });
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="Contactez-Nous"
          subtitle="Support & Assistance"
          description="Notre équipe est disponible 24/7 pour répondre à toutes vos questions"
        />

        <section className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionHeader
                title="Nous contacter"
                description="Comment pouvons-nous vous aider ?"
                alignment="left"
              />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-white font-medium">
                      Nom complet
                    </label>
                    <Input
                      id="name"
                      placeholder="Votre nom"
                      className="bg-graphik-grey border-graphik-light-grey text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      className="bg-graphik-grey border-graphik-light-grey text-white"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-white font-medium">
                    Sujet
                  </label>
                  <Input
                    id="subject"
                    placeholder="Sujet de votre message"
                    className="bg-graphik-grey border-graphik-light-grey text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-white font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Votre message..."
                    className="bg-graphik-grey border-graphik-light-grey text-white min-h-[150px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-graphik-blue hover:bg-graphik-blue/80">
                  Envoyer le message
                </Button>
              </form>
            </div>

            <div>
              <SectionHeader
                title="Informations de contact"
                description="Plusieurs façons de nous joindre"
                alignment="left"
              />

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-graphik-blue/20 p-3 rounded-full mr-4">
                    <Mail className="text-graphik-blue w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                    <p className="text-gray-300">
                      <a href="mailto:support@graphikstudio.com" className="hover:text-graphik-blue transition-colors">
                        support@graphikstudio.com
                      </a>
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Nous répondons généralement dans les 24 heures
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-graphik-purple/20 p-3 rounded-full mr-4">
                    <Phone className="text-graphik-purple w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Téléphone</h3>
                    <p className="text-gray-300">
                      <a href="tel:+33123456789" className="hover:text-graphik-purple transition-colors">
                        +33 1 23 45 67 89
                      </a>
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Disponible 7j/7 de 8h00 à 22h00 (heure de Paris)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-graphik-blue/20 p-3 rounded-full mr-4">
                    <MessageSquare className="text-graphik-blue w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Chat en direct</h3>
                    <p className="text-gray-300">
                      Cliquez sur l'icône de chat en bas à droite
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Support instantané 24/7 pour une assistance rapide
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-graphik-purple/20 p-3 rounded-full mr-4">
                    <MapPin className="text-graphik-purple w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Adresse</h3>
                    <p className="text-gray-300">
                      123 Avenue du Numérique<br />
                      75001 Paris, France
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Sur rendez-vous uniquement
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-bold text-white mb-4">Heures d'ouverture</h3>
                <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium">Lundi - Vendredi:</p>
                      <p className="text-gray-300">08:00 - 22:00</p>
                    </div>
                    <div>
                      <p className="text-white font-medium">Samedi - Dimanche:</p>
                      <p className="text-gray-300">09:00 - 20:00</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-graphik-light-grey">
                    <p className="text-gray-400 text-sm">
                      Support technique disponible 24/7 pour les urgences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Questions Fréquentes"
              description="Réponses aux questions les plus courantes"
            />

            <div className="max-w-3xl mx-auto grid gap-6">
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Comment puis-je suivre ma commande ?
                </h3>
                <p className="text-gray-300">
                  Vous pouvez suivre vos commandes et abonnements directement depuis votre espace client. Connectez-vous à votre compte et accédez à la section "Mes commandes" pour voir l'état actuel de chaque transaction.
                </p>
              </div>
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Comment réinitialiser mon mot de passe ?
                </h3>
                <p className="text-gray-300">
                  Sur la page de connexion, cliquez sur "Mot de passe oublié" et suivez les instructions. Un email vous sera envoyé avec un lien pour réinitialiser votre mot de passe.
                </p>
              </div>
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Comment annuler un abonnement ?
                </h3>
                <p className="text-gray-300">
                  Vous pouvez annuler un abonnement à tout moment depuis votre espace client dans la section "Mes abonnements". Sélectionnez l'abonnement concerné et cliquez sur "Annuler". L'accès restera disponible jusqu'à la fin de la période payée.
                </p>
              </div>
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Quels sont les délais de réponse au support ?
                </h3>
                <p className="text-gray-300">
                  Notre équipe répond généralement dans l'heure pour les demandes urgentes et dans les 24 heures pour les questions générales. Le chat en direct offre une assistance instantanée 24/7.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
