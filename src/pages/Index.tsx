
import React from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import SectionHeader from "@/components/SectionHeader";
import TrendingCarousel from "@/components/TrendingCarousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Headphones, Tv, Gamepad2, ShieldCheck, 
  CreditCard, HelpCircle, Clock 
} from "lucide-react";

const Index = () => {
  // Trending content data
  const netflixTrending = [
    {
      title: "Stranger Things",
      platform: "Netflix",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=600",
      description: "Dans une petite ville où tout le monde se connaît, la disparition soudaine d'un jeune garçon va mener ses amis à découvrir des phénomènes surnaturels.",
      type: "series",
      link: "/streaming-video"
    },
    {
      title: "La Casa de Papel",
      platform: "Netflix",
      image: "https://images.unsplash.com/photo-1564751858619-c88118f94177?auto=format&fit=crop&q=80&w=600",
      description: "Un homme mystérieux, surnommé le Professeur, planifie le meilleur braquage jamais réalisé.",
      type: "series",
      link: "/streaming-video"
    },
    {
      title: "The Witcher",
      platform: "Netflix",
      image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=600",
      description: "Le sorceleur Geralt, un chasseur de monstres mutant, se bat pour trouver sa place dans un monde où les humains sont souvent plus vicieux que les bêtes.",
      type: "series",
      link: "/streaming-video"
    }
  ];
  
  const disneyTrending = [
    {
      title: "The Mandalorian",
      platform: "Disney+",
      image: "https://images.unsplash.com/photo-1608346128025-1896b97a6fa8?auto=format&fit=crop&q=80&w=600",
      description: "Après la chute de l'Empire, un chasseur de primes solitaire voyage aux confins de la galaxie, loin de l'autorité de la Nouvelle République.",
      type: "series",
      link: "/streaming-video"
    },
    {
      title: "WandaVision",
      platform: "Disney+",
      image: "https://images.unsplash.com/photo-1618945524163-32451704cbb8?auto=format&fit=crop&q=80&w=600",
      description: "Wanda Maximoff et Vision, deux êtres surpuissants, vivent leur vie de banlieue idéale, mais commencent à soupçonner que tout n'est pas ce qu'il paraît.",
      type: "series",
      link: "/streaming-video"
    },
    {
      title: "Loki",
      platform: "Disney+",
      image: "https://images.unsplash.com/photo-1621955964441-c173e01c135b?auto=format&fit=crop&q=80&w=600",
      description: "Le dieu de la malice Loki reprend son rôle de méchant après les événements d'Avengers: Endgame.",
      type: "series",
      link: "/streaming-video"
    }
  ];
  
  const spotifyTrending = [
    {
      title: "Top Hits 2023",
      platform: "Spotify",
      image: "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&q=80&w=600",
      description: "Les titres les plus écoutés et les hits du moment sur Spotify.",
      type: "music",
      link: "/streaming-audio"
    },
    {
      title: "Afrobeat Vibes",
      platform: "Spotify",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
      description: "Les meilleurs titres Afrobeat pour danser et faire la fête.",
      type: "music",
      link: "/streaming-audio"
    },
    {
      title: "Chill & Study",
      platform: "Spotify",
      image: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?auto=format&fit=crop&q=80&w=600",
      description: "Playlist parfaite pour étudier ou se détendre avec des morceaux lo-fi et ambient.",
      type: "music",
      link: "/streaming-audio"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero
          title="Le meilleur du streaming, de l'IPTV et du gaming"
          subtitle="Bienvenue sur Graphik'Studio"
          description="Découvrez un accès simplifié aux meilleures plateformes de divertissement en un seul endroit. Vidéo, audio, IPTV et gaming à portée de clic."
          primaryButtonText="Découvrir les offres"
          secondaryButtonText="En savoir plus"
          secondaryButtonLink="/contact"
        />

        {/* Services Section */}
        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Nos Univers de Divertissement"
            description="Explorez nos différents univers et trouvez celui qui vous convient le mieux"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              title="Streaming Vidéo"
              description="Netflix, Disney+, Amazon Prime et plus encore. Accédez à vos films et séries préférés."
              image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600"
              link="/streaming-video"
            />
            <ServiceCard
              title="Streaming Audio"
              description="Spotify, Apple Music, Deezer... Écoutez des millions de titres en illimité."
              image="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80&w=600"
              link="/streaming-audio"
            />
            <ServiceCard
              title="IPTV"
              description="Accédez à des milliers de chaînes TV du monde entier en HD et 4K."
              image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600"
              link="/iptv"
            />
            <ServiceCard
              title="Gaming"
              description="Cartes de jeux, crédits et abonnements pour vos jeux favoris."
              image="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600"
              link="/gaming"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Pourquoi Choisir Graphik'Studio ?"
              description="Découvrez les avantages qui font notre différence"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <div className="bg-graphik-blue/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <ShieldCheck className="text-graphik-blue w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">100% Sécurisé</h3>
                <p className="text-gray-300">
                  Paiements sécurisés et données personnelles protégées
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <div className="bg-graphik-purple/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <CreditCard className="text-graphik-purple w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Paiements Flexibles</h3>
                <p className="text-gray-300">
                  Multiples méthodes de paiement acceptées
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <div className="bg-graphik-blue/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <HelpCircle className="text-graphik-blue w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Support 24/7</h3>
                <p className="text-gray-300">
                  Une équipe disponible pour vous aider à tout moment
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <div className="bg-graphik-purple/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Clock className="text-graphik-purple w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Accès Instantané</h3>
                <p className="text-gray-300">
                  Profitez immédiatement de vos achats après paiement
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trending on Platforms Section */}
        <section className="container mx-auto px-4 py-20 animate-fade-in">
          <SectionHeader
            title="Tendances sur les plateformes"
            description="Découvrez ce qui est populaire en ce moment"
          />

          <TrendingCarousel 
            title="Tendances sur Netflix" 
            items={netflixTrending} 
          />
          
          <TrendingCarousel 
            title="Tendances sur Disney+" 
            items={disneyTrending} 
          />
          
          <TrendingCarousel 
            title="Tendances sur Spotify" 
            items={spotifyTrending} 
          />
        </section>

        {/* How it works */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Comment ça marche ?"
              description="Un processus simple en trois étapes"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey text-center relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-graphik-blue flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="h-24 flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.67001 18.9501L7.60001 15.6401C8.39001 15.1101 9.53001 15.1701 10.24 15.7801L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Choisissez votre service</h3>
                <p className="text-gray-300">
                  Parcourez notre catalogue et sélectionnez l'offre qui vous correspond
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey text-center relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-graphik-blue flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="h-24 flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8.50488H22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 16.5049H8" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.5 16.5049H14.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.44 3.50488H17.55C21.11 3.50488 22 4.38488 22 7.89488V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89488C2 4.38488 2.89 3.50488 6.44 3.50488Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Payez en ligne</h3>
                <p className="text-gray-300">
                  Choisissez votre méthode de paiement préférée et finalisez l'achat
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey text-center relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-graphik-blue flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="h-24 flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 17H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Profitez instantanément</h3>
                <p className="text-gray-300">
                  Recevez immédiatement vos identifiants et accédez à vos services
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Ils nous font confiance"
            description="Ce que nos clients disent de Graphik'Studio"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Thomas D."
              content="Graphik'Studio a complètement changé ma façon de consommer les médias. Plus besoin de jongler entre plusieurs abonnements, tout est centralisé et super simple à utiliser !"
              rating={5}
            />
            <TestimonialCard
              name="Sophia M."
              content="Le service client est exceptionnel ! J'ai eu un problème avec mon compte Netflix et ils l'ont résolu en moins de 5 minutes. Je recommande vivement !"
              rating={5}
            />
            <TestimonialCard
              name="Kevin L."
              content="Les offres IPTV sont imbattables. Des milliers de chaînes, une qualité HD impeccable et un prix défiant toute concurrence. Merci Graphik'Studio !"
              rating={4}
            />
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button variant="outline" className="border-graphik-blue text-white hover:bg-graphik-blue/20">
                En savoir plus sur nous
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-graphik-blue to-graphik-purple py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à commencer votre expérience ?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Rejoignez des milliers d'utilisateurs satisfaits et accédez au meilleur du divertissement en un clic.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/subscribe">
                <Button size="lg" className="bg-white text-graphik-purple hover:bg-white/90">
                  S'abonner maintenant
                </Button>
              </Link>
              <Link to="/streaming-video">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Découvrir nos offres
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
