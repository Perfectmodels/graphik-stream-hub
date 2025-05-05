
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import PlatformCard from "@/components/PlatformCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionDialog from "@/components/SubscriptionDialog";

const StreamingVideo = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const handleSubscribe = (platform: string) => {
    setSelectedPlatform(platform);
    setIsDialogOpen(true);
  };

  const platforms = [
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png",
      description: "Leader mondial avec un immense catalogue de séries, films et documentaires",
      price: "À partir de 5000 FCFA/mois",
      features: [
        "Milliers de films et séries",
        "Productions originales exclusives",
        "Qualité HD et 4K",
        "Visionnage simultané (selon forfait)",
        "Téléchargement pour visionnage hors ligne",
      ],
    },
    {
      name: "Disney+",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/1280px-Disney%2B_logo.svg.png",
      description: "Accès aux univers Disney, Pixar, Marvel, Star Wars et National Geographic",
      price: "À partir de 4000 FCFA/mois",
      features: [
        "Franchises exclusives Disney, Marvel, Star Wars",
        "Contenu pour toute la famille",
        "Qualité 4K HDR",
        "7 profils utilisateurs",
        "Téléchargement illimité",
      ],
    },
    {
      name: "Amazon Prime Video",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/1280px-Amazon_Prime_Video_logo.svg.png",
      description: "Challenger avec un catalogue en croissance et des productions originales",
      price: "Inclus avec Amazon Prime (3500 FCFA/mois)",
      features: [
        "Milliers de films et séries",
        "Productions originales Amazon",
        "Qualité HD et 4K",
        "Téléchargement pour visionnage hors ligne",
        "Inclus avec l'abonnement Amazon Prime",
      ],
    },
    {
      name: "Canal+",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Canal%2B.svg/1280px-Canal%2B.svg.png",
      description: "Séries françaises et internationales, productions originales et accès TV en direct",
      price: "À partir de 15000 FCFA/mois",
      features: [
        "Content exclusif et chaînes premium",
        "Sport en direct",
        "Séries originales Canal+",
        "Films récents",
        "Multi-écrans",
      ],
    },
  ];

  const morePlatforms = [
    {
      name: "Apple TV+",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Apple_TV_Plus_Logo.svg/1280px-Apple_TV_Plus_Logo.svg.png",
      description: "Plateforme axée sur des contenus originaux de qualité",
      price: "À partir de 4500 FCFA/mois",
      features: [
        "Contenus exclusifs Apple Originals",
        "Qualité 4K HDR et Dolby Atmos",
        "Partage familial jusqu'à 6 comptes",
        "Téléchargement pour visionnage hors ligne",
        "Essai gratuit disponible",
      ],
    },
    {
      name: "Paramount+",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Paramount%2B_logo.svg/1280px-Paramount%2B_logo.svg.png",
      description: "Contenus de Paramount, CBS, Comedy Central et Nickelodeon",
      price: "À partir de 4000 FCFA/mois",
      features: [
        "Films Paramount récents",
        "Séries originales exclusives",
        "Contenu pour enfants",
        "CBS et Comedy Central",
        "Téléchargement pour visionnage hors ligne",
      ],
    },
    {
      name: "Max (ex-HBO Max)",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO_Max_Logo.svg/1280px-HBO_Max_Logo.svg.png",
      description: "Séries emblématiques de HBO et de nouveaux contenus Warner Bros",
      price: "À partir de 6000 FCFA/mois",
      features: [
        "Séries prestigieuses HBO",
        "Films Warner Bros",
        "Contenus DC Comics",
        "Documentaires exclusifs",
        "Qualité 4K",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="Streaming Vidéo"
          subtitle="Offres et abonnements"
          description="Accédez aux meilleures plateformes de streaming vidéo avec nos abonnements optimisés"
          backgroundImage="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1600"
        />

        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Plateformes Populaires"
            description="Découvrez les services de streaming vidéo les plus recherchés"
          />

          <Tabs defaultValue="popular" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-graphik-grey">
              <TabsTrigger value="popular" className="data-[state=active]:bg-graphik-purple">
                Les plus populaires
              </TabsTrigger>
              <TabsTrigger value="more" className="data-[state=active]:bg-graphik-purple">
                Autres plateformes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="popular">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {platforms.map((platform) => (
                  <PlatformCard
                    key={platform.name}
                    name={platform.name}
                    logo={platform.logo}
                    description={platform.description}
                    price={platform.price}
                    features={platform.features}
                    buttonAction={() => handleSubscribe(platform.name)}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="more">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {morePlatforms.map((platform) => (
                  <PlatformCard
                    key={platform.name}
                    name={platform.name}
                    logo={platform.logo}
                    description={platform.description}
                    price={platform.price}
                    features={platform.features}
                    buttonAction={() => handleSubscribe(platform.name)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Comparison Table */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Comparatif des plateformes"
              description="Trouvez la plateforme qui correspond le mieux à vos besoins"
            />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="border-b border-graphik-light-grey">
                    <th className="py-4 px-6 text-left text-white">Plateforme</th>
                    <th className="py-4 px-6 text-left text-white">Prix</th>
                    <th className="py-4 px-6 text-left text-white">Qualité Max</th>
                    <th className="py-4 px-6 text-left text-white">Écrans simultanés</th>
                    <th className="py-4 px-6 text-left text-white">Mode hors ligne</th>
                    <th className="py-4 px-6 text-left text-white">Contenu original</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                    <td className="py-4 px-6 text-white">Netflix</td>
                    <td className="py-4 px-6 text-gray-300">5000 - 15000 FCFA</td>
                    <td className="py-4 px-6 text-gray-300">4K HDR</td>
                    <td className="py-4 px-6 text-gray-300">1-4</td>
                    <td className="py-4 px-6 text-gray-300">✓</td>
                    <td className="py-4 px-6 text-gray-300">✓✓✓</td>
                  </tr>
                  <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                    <td className="py-4 px-6 text-white">Disney+</td>
                    <td className="py-4 px-6 text-gray-300">4000 - 8000 FCFA</td>
                    <td className="py-4 px-6 text-gray-300">4K HDR</td>
                    <td className="py-4 px-6 text-gray-300">4</td>
                    <td className="py-4 px-6 text-gray-300">✓</td>
                    <td className="py-4 px-6 text-gray-300">✓✓</td>
                  </tr>
                  <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                    <td className="py-4 px-6 text-white">Prime Video</td>
                    <td className="py-4 px-6 text-gray-300">3500 FCFA (Prime)</td>
                    <td className="py-4 px-6 text-gray-300">4K HDR</td>
                    <td className="py-4 px-6 text-gray-300">3</td>
                    <td className="py-4 px-6 text-gray-300">✓</td>
                    <td className="py-4 px-6 text-gray-300">✓✓</td>
                  </tr>
                  <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                    <td className="py-4 px-6 text-white">Canal+</td>
                    <td className="py-4 px-6 text-gray-300">15000+ FCFA</td>
                    <td className="py-4 px-6 text-gray-300">4K HDR</td>
                    <td className="py-4 px-6 text-gray-300">2</td>
                    <td className="py-4 px-6 text-gray-300">✓</td>
                    <td className="py-4 px-6 text-gray-300">✓✓</td>
                  </tr>
                  <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                    <td className="py-4 px-6 text-white">Apple TV+</td>
                    <td className="py-4 px-6 text-gray-300">4500 FCFA</td>
                    <td className="py-4 px-6 text-gray-300">4K HDR</td>
                    <td className="py-4 px-6 text-gray-300">6 (partage familial)</td>
                    <td className="py-4 px-6 text-gray-300">✓</td>
                    <td className="py-4 px-6 text-gray-300">✓✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Questions Fréquentes"
            description="Tout ce que vous devez savoir sur nos offres de streaming vidéo"
          />

          <div className="max-w-3xl mx-auto grid gap-6">
            <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey">
              <h3 className="text-xl font-bold text-white mb-2">
                Comment fonctionnent les abonnements ?
              </h3>
              <p className="text-gray-300">
                Nous vous fournissons un accès aux plateformes de streaming via des comptes optimisés. Après votre paiement, vous recevez immédiatement vos identifiants de connexion par email.
              </p>
            </div>
            <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey">
              <h3 className="text-xl font-bold text-white mb-2">
                Les abonnements sont-ils partagés ?
              </h3>
              <p className="text-gray-300">
                Nos abonnements sont personnels et ne doivent pas être partagés. Pour une utilisation familiale, nous proposons des forfaits spécifiques permettant l'utilisation sur plusieurs appareils.
              </p>
            </div>
            <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey">
              <h3 className="text-xl font-bold text-white mb-2">
                Quelle est la durée des abonnements ?
              </h3>
              <p className="text-gray-300">
                Nous proposons des durées flexibles : mensuel, trimestriel ou annuel. Plus la période est longue, plus vous bénéficiez de réductions avantageuses.
              </p>
            </div>
            <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey">
              <h3 className="text-xl font-bold text-white mb-2">
                Comment regarder sur ma TV ?
              </h3>
              <p className="text-gray-300">
                Vous pouvez accéder à votre compte sur tous les appareils compatibles : Smart TV, boîtiers TV connectés (Apple TV, Android TV, Fire Stick), consoles de jeux ou simplement via votre navigateur web.
              </p>
            </div>
          </div>
        </section>

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

export default StreamingVideo;
