
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import PlatformCard from "@/components/PlatformCard";
import { useToast } from "@/hooks/use-toast";

const StreamingAudio = () => {
  const { toast } = useToast();

  const handleSubscribe = (platform: string) => {
    toast({
      title: "Abonnement en cours",
      description: `Vous allez être redirigé vers la page d'abonnement ${platform}`,
      duration: 3000,
    });
  };

  const platforms = [
    {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1280px-Spotify_logo_with_text.svg.png",
      description: "Plus de 70 millions de titres, recommandations personnalisées, interface intuitive",
      price: "À partir de 10,99€/mois",
      features: [
        "Plus de 70 millions de titres",
        "Playlists personnalisées",
        "Mode hors connexion",
        "Qualité audio jusqu'à 320 kbps",
        "Podcasts inclus",
      ],
    },
    {
      name: "Apple Music",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/1280px-Apple_Music_icon.svg.png",
      description: "Qualité sonore élevée, intégration avec l'écosystème Apple",
      price: "À partir de 10,99€/mois",
      features: [
        "Plus de 75 millions de titres",
        "Audio spatial et Lossless",
        "Intégration écosystème Apple",
        "Mode hors connexion",
        "Radio Apple Music en direct",
      ],
    },
    {
      name: "Deezer",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Deezer_logo.svg/1280px-Deezer_logo.svg.png",
      description: "Plateforme française, large catalogue, Flow personnalisé",
      price: "À partir de 10,99€/mois",
      features: [
        "Plus de 73 millions de titres",
        "Flow personnalisé",
        "Qualité HiFi (FLAC 16 bits)",
        "Mode hors connexion",
        "Paroles en temps réel",
      ],
    },
    {
      name: "Amazon Music",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Amazon_Music_logo.svg/1280px-Amazon_Music_logo.svg.png",
      description: "Inclus avec Prime ou en version illimitée, qualité HD disponible",
      price: "À partir de 9,99€/mois",
      features: [
        "Plus de 75 millions de titres",
        "Version limitée incluse avec Prime",
        "Qualité HD et Ultra HD",
        "Mode hors connexion",
        "Compatible Alexa",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="Streaming Audio"
          subtitle="Musique Illimitée"
          description="Accédez à des millions de titres en streaming avec nos abonnements aux meilleures plateformes musicales"
          backgroundImage="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80&w=1600"
        />

        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Plateformes de Streaming Musical"
            description="Découvrez les services audio les plus populaires"
          />

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
        </section>

        {/* Comparison */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Comparatif Audio"
              description="Quelle plateforme de streaming musical vous convient le mieux ?"
            />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="border-b border-graphik-light-grey">
                    <th className="py-4 px-6 text-left text-white">Plateforme</th>
                    <th className="py-4 px-6 text-left text-white">Prix</th>
                    <th className="py-4 px-6 text-left text-white">Catalogue</th>
                    <th className="py-4 px-6 text-left text-white">Qualité max</th>
                    <th className="py-4 px-6 text-left text-white">Hors ligne</th>
                    <th className="py-4 px-6 text-left text-white">Contenu exclusif</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                    <td className="py-4 px-6 text-white">Spotify</td>
                    <td className="py-4 px-6 text-gray-300">10,99€/mois</td>
                    <td className="py-4 px-6 text-gray-300">+70 millions</td>
                    <td className="py-4 px-6 text-gray-300">320 kbps</td>
                    <td className="py-4 px-6 text-gray-300">✓</td>
                    <td className="py-4 px-6 text-gray-300">Podcasts, DJ</td>
                  </tr>
                  <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                    <td className="py-4 px-6 text-white">Apple Music</td>
                    <td className="py-4 px-6 text-gray-300">10,99€/mois</td>
                    <td className="py-4 px-6 text-gray-300">+75 millions</td>
                    <td className="py-4 px-6 text-gray-300">Lossless, Spatial</td>
                    <td className="py-4 px-6 text-gray-300">✓</td>
                    <td className="py-4 px-6 text-gray-300">Apple Music Radio</td>
                  </tr>
                  <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                    <td className="py-4 px-6 text-white">Deezer</td>
                    <td className="py-4 px-6 text-gray-300">10,99€/mois</td>
                    <td className="py-4 px-6 text-gray-300">+73 millions</td>
                    <td className="py-4 px-6 text-gray-300">FLAC (HiFi)</td>
                    <td className="py-4 px-6 text-gray-300">✓</td>
                    <td className="py-4 px-6 text-gray-300">Flow</td>
                  </tr>
                  <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                    <td className="py-4 px-6 text-white">Amazon Music</td>
                    <td className="py-4 px-6 text-gray-300">9,99€/mois</td>
                    <td className="py-4 px-6 text-gray-300">+75 millions</td>
                    <td className="py-4 px-6 text-gray-300">Ultra HD</td>
                    <td className="py-4 px-6 text-gray-300">✓</td>
                    <td className="py-4 px-6 text-gray-300">Prime inclus</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Pourquoi choisir le streaming musical ?"
            description="Découvrez les avantages des plateformes de streaming audio"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey text-center">
              <div className="mx-auto w-16 h-16 mb-6 bg-graphik-blue/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 12C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Catalogue Immense
              </h3>
              <p className="text-gray-300">
                Accédez à des millions de titres, de podcasts et de contenus exclusifs en un clic
              </p>
            </div>

            <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey text-center">
              <div className="mx-auto w-16 h-16 mb-6 bg-graphik-purple/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-graphik-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 10.5C15.5 10.5 13.5 9 10 9C6.5 9 4.5 10.5 4.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19.5 8.5C19.5 8.5 16.5 5.5 10 5.5C3.5 5.5 0.5 8.5 0.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 19C10.5523 19 11 18.5523 11 18C11 17.4477 10.5523 17 10 17C9.44772 17 9 17.4477 9 18C9 18.5523 9.44772 19 10 19Z" fill="currentColor" />
                  <path d="M10 19C10.5523 19 11 18.5523 11 18C11 17.4477 10.5523 17 10 17C9.44772 17 9 17.4477 9 18C9 18.5523 9.44772 19 10 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 15.5C15 14.3739 14.4732 13.2941 13.5355 12.5095C12.5979 11.7248 11.3261 11.2874 10 11.2874C8.67392 11.2874 7.40215 11.7248 6.46447 12.5095C5.52678 13.2941 5 14.3739 5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Qualité Audio Premium
              </h3>
              <p className="text-gray-300">
                Profitez d'une qualité audio exceptionnelle avec des options Hi-Fi et son spatial
              </p>
            </div>

            <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey text-center">
              <div className="mx-auto w-16 h-16 mb-6 bg-graphik-blue/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.28 3.16992C15.15 2.03992 13.28 2.03992 12.16 3.16992L11.62 3.70992C11.49 3.83992 11.49 4.15992 11.62 4.28992L14.5 7.16992C14.63 7.29992 14.95 7.29992 15.08 7.16992L15.62 6.62992C16.75 5.50992 16.75 3.62992 15.62 2.49992L16.28 3.16992Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.45 5L7.5 7.95001C5.4 10.05 5.4 10.05 7.5 12.15L11.85 16.5C13.95 18.6 13.95 18.6 16.05 16.5L19 13.55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.9999 19C18.9999 19.75 18.7899 20.46 18.4199 21.06C18.0399 21.65 17.4999 22.12 16.8699 22.42C16.2399 22.72 15.5299 22.88 14.7899 22.88C14.2999 22.88 13.8299 22.82 13.3699 22.69C11.7799 22.23 10.4999 20.95 10.0399 19.36C9.8999 18.9 9.8399 18.42 9.8399 17.92C9.8399 17.29 9.9599 16.68 10.1799 16.11C10.4599 15.36 10.9199 14.72 11.5099 14.2C12.0999 13.69 12.7899 13.31 13.5499 13.11C13.9699 13.03 14.3899 12.98 14.8299 12.98C16.2499 12.98 17.5399 13.56 18.4499 14.49C19.2999 15.31 19.8399 16.47 19.9799 17.74C19.9899 17.79 19.9899 17.84 19.9899 17.89V18.01H19.9999C19.9999 18.33 19.9599 18.66 19.8999 18.99" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Découvertes Personnalisées
              </h3>
              <p className="text-gray-300">
                Des algorithmes intelligents qui vous recommandent de nouveaux artistes selon vos goûts
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Questions Fréquentes"
              description="Tout ce que vous devez savoir sur nos offres de streaming audio"
            />

            <div className="max-w-3xl mx-auto grid gap-6">
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Quelle est la différence entre les services de streaming musical ?
                </h3>
                <p className="text-gray-300">
                  Chaque plateforme propose des atouts uniques : Spotify a les meilleures recommandations et playlists, Apple Music propose de l'audio spatial et lossless, Deezer est connu pour son Flow personnalisé, et Amazon Music est intégré à l'écosystème Prime.
                </p>
              </div>
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Puis-je utiliser ces services sur tous mes appareils ?
                </h3>
                <p className="text-gray-300">
                  Oui, tous ces services sont disponibles sur smartphones (iOS et Android), ordinateurs, tablettes, enceintes connectées et même certaines TV connectées ou consoles de jeu.
                </p>
              </div>
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Les abonnements incluent-ils des podcasts ?
                </h3>
                <p className="text-gray-300">
                  Spotify propose la plus vaste sélection de podcasts, mais Apple Music et Amazon Music en proposent également. Deezer se concentre davantage sur l'expérience musicale mais intègre aussi des podcasts.
                </p>
              </div>
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Y a-t-il des offres familiales disponibles ?
                </h3>
                <p className="text-gray-300">
                  Oui, tous ces services proposent des forfaits familiaux permettant à plusieurs utilisateurs (généralement jusqu'à 6) de profiter du service avec leurs propres comptes et recommandations personnalisées.
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

export default StreamingAudio;
