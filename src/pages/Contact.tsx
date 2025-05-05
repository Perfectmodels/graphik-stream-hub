
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, WhatsApp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais",
      duration: 5000,
    });
    // Reset form fields
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="Contactez-Nous"
          subtitle="À votre service"
          description="Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos projets"
          backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=1600"
        />

        <section className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <SectionHeader
                title="Nous contacter"
                description="Plusieurs façons de nous joindre"
              />

              <div className="space-y-8 mt-10">
                <div className="flex items-start">
                  <div className="bg-graphik-blue/20 p-3 rounded-full mr-4">
                    <WhatsApp className="text-graphik-blue h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">WhatsApp</h3>
                    <p className="text-gray-300">Contactez-nous directement sur WhatsApp</p>
                    <a href="https://wa.me/24162708998" className="text-graphik-blue hover:underline">
                      +241 62 70 89 98
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-graphik-purple/20 p-3 rounded-full mr-4">
                    <Mail className="text-graphik-purple h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Email</h3>
                    <p className="text-gray-300">Envoyez-nous un email à tout moment</p>
                    <a href="mailto:Contact@graphikstudio.pro" className="text-graphik-blue hover:underline">
                      Contact@graphikstudio.pro
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-graphik-blue/20 p-3 rounded-full mr-4">
                    <Clock className="text-graphik-blue h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Heures d'ouverture</h3>
                    <p className="text-gray-300">Lundi - Vendredi: 9h - 18h</p>
                    <p className="text-gray-300">Samedi: 10h - 15h</p>
                  </div>
                </div>

                <Card className="bg-graphik-purple/10 border-graphik-purple/20">
                  <CardContent className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2">Support prioritaire</h3>
                    <p className="text-gray-300">
                      Pour toute question urgente ou assistance technique, contacter directement notre équipe via WhatsApp pour une réponse rapide.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card className="bg-graphik-grey border-graphik-light-grey">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Envoyez-nous un message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Nom</label>
                        <Input 
                          placeholder="Votre nom" 
                          className="bg-graphik-dark border-graphik-light-grey text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Email</label>
                        <Input 
                          type="email" 
                          placeholder="Votre email" 
                          className="bg-graphik-dark border-graphik-light-grey text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Sujet</label>
                      <Input 
                        placeholder="Sujet de votre message" 
                        className="bg-graphik-dark border-graphik-light-grey text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Message</label>
                      <Textarea 
                        placeholder="Votre message" 
                        className="bg-graphik-dark border-graphik-light-grey text-white min-h-[150px]"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-graphik-purple hover:bg-graphik-violet">
                      <Send className="mr-2 h-4 w-4" /> Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Questions Fréquentes"
              description="Réponses aux questions les plus courantes"
            />

            <div className="max-w-3xl mx-auto grid gap-6 mt-10">
              <Card className="bg-graphik-dark border-graphik-light-grey">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Comment fonctionne le processus d'abonnement ?
                  </h3>
                  <p className="text-gray-300">
                    Après avoir soumis votre demande d'abonnement via notre formulaire, notre équipe vous contactera dans un délai de 24h pour confirmer les détails et finaliser le paiement. Une fois le paiement effectué, vous recevrez immédiatement vos identifiants de connexion.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-graphik-dark border-graphik-light-grey">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Quels sont les modes de paiement acceptés ?
                  </h3>
                  <p className="text-gray-300">
                    Nous acceptons plusieurs modes de paiement : Mobile Money (Airtel Money, Moov Money), cartes bancaires, virements bancaires et paiements en espèces pour les clients à Libreville.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-graphik-dark border-graphik-light-grey">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Que faire en cas de problème technique ?
                  </h3>
                  <p className="text-gray-300">
                    Notre équipe de support technique est disponible 7j/7 via WhatsApp au +241 62 70 89 98. Vous pouvez également nous contacter par email à Contact@graphikstudio.pro pour toute assistance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
