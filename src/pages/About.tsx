
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import { Shield, Globe, Sparkles, Clock } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="À Propos de Graphik'Studio"
          subtitle="Notre mission"
          description="Découvrez qui nous sommes et pourquoi nous avons créé la meilleure plateforme de divertissement"
          backgroundImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600"
        />

        <section className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 gradient-text">Notre Histoire</h2>
              <p className="text-gray-300 mb-6">
                Graphik'Studio est né d'une ambition simple : démocratiser l'accès au divertissement numérique pour tous. Fondée en 2023 par une équipe de passionnés de technologie et de multimédia, notre plateforme s'est rapidement imposée comme une référence dans le domaine du streaming vidéo, audio, IPTV et gaming.
              </p>
              <p className="text-gray-300 mb-6">
                Ce qui a commencé comme un petit projet est devenu aujourd'hui une solution complète permettant à nos clients d'accéder facilement aux meilleures plateformes de divertissement, le tout depuis un point d'entrée unique et avec un support client exceptionnel.
              </p>
              <p className="text-gray-300">
                Avec des milliers d'utilisateurs satisfaits et une équipe en constante croissance, nous continuons d'innover pour offrir toujours plus de contenu, de fonctionnalités et une expérience utilisateur optimale.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md aspect-video bg-graphik-grey rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                  alt="Notre équipe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Nos Valeurs"
              description="Ce qui nous guide au quotidien"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey text-center">
                <div className="mx-auto w-16 h-16 mb-6 bg-graphik-blue/20 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-graphik-blue" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Sécurité
                </h3>
                <p className="text-gray-300">
                  La protection de vos données et la sécurité de vos paiements sont notre priorité absolue
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey text-center">
                <div className="mx-auto w-16 h-16 mb-6 bg-graphik-blue/20 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-graphik-blue" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Accessibilité
                </h3>
                <p className="text-gray-300">
                  Nous croyons que le divertissement de qualité devrait être accessible à tous, partout dans le monde
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey text-center">
                <div className="mx-auto w-16 h-16 mb-6 bg-graphik-blue/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-graphik-blue" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Innovation
                </h3>
                <p className="text-gray-300">
                  Nous cherchons constamment à améliorer nos offres et à intégrer les dernières technologies
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey text-center">
                <div className="mx-auto w-16 h-16 mb-6 bg-graphik-blue/20 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-graphik-blue" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Fiabilité
                </h3>
                <p className="text-gray-300">
                  Nous nous engageons à offrir un service stable, rapide et disponible 24/7 pour votre tranquillité d'esprit
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Notre Parcours"
            description="Les moments clés de notre histoire"
          />

          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-graphik-blue ml-6">
              {/* 2023 */}
              <div className="mb-12 relative">
                <div className="absolute -left-8 h-16 w-16 rounded-full bg-graphik-blue/20 border-4 border-graphik-blue flex items-center justify-center">
                  <span className="text-white font-bold">2023</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-xl font-bold text-white mb-2">Naissance de Graphik'Studio</h3>
                  <p className="text-gray-300">
                    Lancement officiel de la plateforme avec les premières offres de streaming vidéo et IPTV
                  </p>
                </div>
              </div>

              {/* 2023 - Expansion */}
              <div className="mb-12 relative">
                <div className="absolute -left-8 h-16 w-16 rounded-full bg-graphik-purple/20 border-4 border-graphik-purple flex items-center justify-center">
                  <span className="text-white font-bold">2023</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-xl font-bold text-white mb-2">Expansion du catalogue</h3>
                  <p className="text-gray-300">
                    Intégration des services de streaming audio et élargissement de l'offre IPTV
                  </p>
                </div>
              </div>

              {/* 2024 */}
              <div className="mb-12 relative">
                <div className="absolute -left-8 h-16 w-16 rounded-full bg-graphik-blue/20 border-4 border-graphik-blue flex items-center justify-center">
                  <span className="text-white font-bold">2024</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-xl font-bold text-white mb-2">Section Gaming</h3>
                  <p className="text-gray-300">
                    Lancement de notre département gaming avec des cartes, crédits et abonnements pour les jeux les plus populaires
                  </p>
                </div>
              </div>

              {/* 2024 - Fin d'année */}
              <div className="relative">
                <div className="absolute -left-8 h-16 w-16 rounded-full bg-graphik-purple/20 border-4 border-graphik-purple flex items-center justify-center">
                  <span className="text-white font-bold">2024</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-xl font-bold text-white mb-2">Nouvelle plateforme</h3>
                  <p className="text-gray-300">
                    Refonte complète de notre interface utilisateur et lancement de l'application mobile pour une expérience encore plus fluide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Notre équipe"
              description="Les talents qui font Graphik'Studio"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src="/placeholder.svg"
                    alt="Thomas Durand"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Thomas Durand</h3>
                <p className="text-graphik-blue mb-4">Fondateur & CEO</p>
                <p className="text-gray-300 text-sm">
                  Passionné de technologie et visionnaire, Thomas a fondé Graphik'Studio avec l'ambition de révolutionner l'accès au divertissement numérique.
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src="/placeholder.svg"
                    alt="Sophie Martin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Sophie Martin</h3>
                <p className="text-graphik-blue mb-4">Directrice Marketing</p>
                <p className="text-gray-300 text-sm">
                  Expert en marketing digital, Sophie orchestre notre stratégie de communication et veille à ce que nos offres répondent parfaitement aux besoins de nos clients.
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src="/placeholder.svg"
                    alt="Maxime Leroy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Maxime Leroy</h3>
                <p className="text-graphik-blue mb-4">Chef Technique</p>
                <p className="text-gray-300 text-sm">
                  Génie de la technologie, Maxime développe et maintient notre infrastructure pour garantir une expérience fluide et sécurisée à tous nos utilisateurs.
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src="/placeholder.svg"
                    alt="Léa Dubois"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Léa Dubois</h3>
                <p className="text-graphik-blue mb-4">Responsable Support</p>
                <p className="text-gray-300 text-sm">
                  Experte en relation client, Léa dirige notre équipe de support pour vous offrir une assistance réactive et personnalisée à chaque étape.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 gradient-text">Pourquoi Nous Choisir ?</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-graphik-blue/20 p-2 rounded-full mr-4">
                    <svg className="w-6 h-6 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 11.1V6.9C22 3.4 20.6 2 17.1 2H12.9C9.4 2 8 3.4 8 6.9V8H11.1C14.6 8 16 9.4 16 12.9V16H17.1C20.6 16 22 14.6 22 11.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17.1V12.9C16 9.4 14.6 8 11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.08008 15L8.03008 16.95L11.9201 13.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Service tout-en-un</h3>
                    <p className="text-gray-300">
                      Accédez à toutes vos plateformes préférées depuis un point d'entrée unique, avec un seul compte et une seule facture
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-graphik-blue/20 p-2 rounded-full mr-4">
                    <svg className="w-6 h-6 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.3 7.91998V13.07C19.3 16.15 17.54 17.47 14.9 17.47H6.10001C5.65001 17.47 5.22001 17.43 4.83001 17.34C4.09001 17.19 3.44001 16.9 2.96001 16.42C2.01001 15.44 1.70001 13.98 1.70001 12.06V6.90998C1.70001 3.82998 3.46001 2.51998 6.10001 2.51998H14.9C17.14 2.51998 18.75 3.51998 19.18 5.98998C19.25 6.29998 19.3 6.59998 19.3 6.91998V7.91998Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22.3011 10.9199V16.0699C22.3011 19.1499 20.5411 20.4699 17.9011 20.4699H9.10109C8.37109 20.4699 7.71109 20.3799 7.13109 20.1499C5.93109 19.6999 5.12109 18.7199 4.83109 17.3399C5.22109 17.4299 5.65109 17.4699 6.10109 17.4699H14.9011C17.5411 17.4699 19.3011 16.1499 19.3011 13.0699V7.91993C19.3011 7.59993 19.2611 7.30993 19.1811 6.98993C21.0811 7.34993 22.3011 8.54993 22.3011 10.9199Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.5 8.52002V11.64C10.5 12.19 10.14 12.16 9.8 11.98L8.76 11.26C8.55 11.11 8.2 11.13 7.99 11.26L6.98 11.98C6.64 12.16 6.28 12.19 6.28 11.64V8.52002C6.28 8.16002 6.58 7.86002 6.94 7.86002H9.83C10.2 7.86002 10.5 8.16002 10.5 8.52002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Prix imbattables</h3>
                    <p className="text-gray-300">
                      Nos partenariats nous permettent d'offrir des tarifs compétitifs et des offres exclusives sur toutes nos plateformes
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-graphik-blue/20 p-2 rounded-full mr-4">
                    <svg className="w-6 h-6 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.16006 10.87C9.06006 10.86 8.94006 10.86 8.83006 10.87C6.45006 10.79 4.56006 8.84 4.56006 6.44C4.56006 3.99 6.54006 2 9.00006 2C11.4501 2 13.4401 3.99 13.4401 6.44C13.4301 8.84 11.5401 10.79 9.16006 10.87Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16.4098 4C18.3498 4 19.9098 5.57 19.9098 7.5C19.9098 9.39 18.4098 10.93 16.5398 11C16.4598 10.99 16.3698 10.99 16.2798 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.16021 14.56C1.74021 16.18 1.74021 18.82 4.16021 20.43C6.91021 22.27 11.4202 22.27 14.1702 20.43C16.5902 18.81 16.5902 16.17 14.1702 14.56C11.4302 12.73 6.92021 12.73 4.16021 14.56Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.3398 20C19.0598 19.85 19.7398 19.56 20.2998 19.13C21.8598 17.96 21.8598 16.03 20.2998 14.86C19.7498 14.44 19.0798 14.16 18.3698 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Support client exceptionnel</h3>
                    <p className="text-gray-300">
                      Notre équipe multilingue est disponible 24/7 pour vous aider avec n'importe quelle question ou problème technique
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-graphik-blue/20 p-2 rounded-full mr-4">
                    <svg className="w-6 h-6 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Sécurité renforcée</h3>
                    <p className="text-gray-300">
                      Cryptage de bout en bout, protection des données et paiements sécurisés pour votre tranquillité d'esprit
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md aspect-square bg-graphik-grey rounded-xl overflow-hidden animate-float">
                <img
                  src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80&w=800"
                  alt="Graphik'Studio en action"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
