
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import PlatformCard from "@/components/PlatformCard";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IPTV = () => {
  const { toast } = useToast();

  const handleSubscribe = (platform: string) => {
    toast({
      title: "Abonnement en cours",
      description: `Vous allez être redirigé vers la page d'abonnement IPTV ${platform}`,
      duration: 3000,
    });
  };

  const iptvServices = [
    {
      name: "Xtreme HD IPTV",
      logo: "/placeholder.svg",
      description: "Service IPTV premium avec des milliers de chaînes du monde entier en HD et 4K",
      price: "À partir de 12,99€/mois",
      features: [
        "+8000 chaînes TV en direct",
        "VOD avec +10000 films et séries",
        "Qualité HD et 4K UHD",
        "Compatible avec tous les appareils",
        "EPG (Guide TV) intégré",
      ],
    },
    {
      name: "Nexott",
      logo: "/placeholder.svg",
      description: "Solution IPTV complète avec un support technique réactif et une excellente stabilité",
      price: "À partir de 14,99€/mois",
      features: [
        "+12000 chaînes internationales",
        "Bibliothèque VOD massive",
        "Qualité 4K et HDR",
        "Anti-gel et anti-coupure",
        "Chaînes sportives premium",
      ],
    },
    {
      name: "Netfly TV",
      logo: "/placeholder.svg",
      description: "Service IPTV avec une interface intuitive et des mises à jour régulières",
      price: "À partir de 9,99€/mois",
      features: [
        "+6000 chaînes internationales",
        "Séries et films à la demande",
        "Plusieurs connexions simultanées",
        "Interface utilisateur moderne",
        "Assistance 24/7",
      ],
    },
    {
      name: "ReflexSat",
      logo: "/placeholder.svg",
      description: "Service fiable avec une attention particulière aux chaînes sportives et événements en direct",
      price: "À partir de 11,99€/mois",
      features: [
        "Spécialisé dans les événements sportifs",
        "+9000 chaînes en direct",
        "Replay TV disponible",
        "PPV inclus sans surcoût",
        "Compatibilité multi-appareils",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="Offres IPTV"
          subtitle="Télévision sans limites"
          description="Accédez à des milliers de chaînes du monde entier en HD et 4K avec nos services IPTV premium"
          backgroundImage="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1600"
        />

        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Nos Services IPTV Premium"
            description="Des milliers de chaînes et VOD à portée de clic"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {iptvServices.map((service) => (
              <PlatformCard
                key={service.name}
                name={service.name}
                logo={service.logo}
                description={service.description}
                price={service.price}
                features={service.features}
                buttonAction={() => handleSubscribe(service.name)}
              />
            ))}
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Forfaits Flexibles"
              description="Choisissez la durée qui vous convient"
            />

            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-graphik-dark">
                <TabsTrigger value="monthly" className="data-[state=active]:bg-graphik-blue">
                  Mensuel
                </TabsTrigger>
                <TabsTrigger value="quarterly" className="data-[state=active]:bg-graphik-blue">
                  Trimestriel
                </TabsTrigger>
                <TabsTrigger value="yearly" className="data-[state=active]:bg-graphik-blue">
                  Annuel
                </TabsTrigger>
              </TabsList>
              <TabsContent value="monthly">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-graphik-dark rounded-xl border border-graphik-light-grey overflow-hidden">
                    <div className="bg-graphik-blue/10 p-6 text-center">
                      <h3 className="text-xl font-bold text-white">Basic</h3>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-graphik-blue">12,99€</span>
                        <span className="text-gray-300">/mois</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4 mb-6">
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">5000+ chaînes en direct</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Bibliothèque VOD de base</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Qualité HD</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">1 connexion simultanée</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Support par email</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => handleSubscribe("Basic Monthly")}
                        className="w-full py-2 px-4 bg-graphik-blue hover:bg-graphik-blue/80 text-white rounded-md transition"
                      >
                        S'abonner
                      </button>
                    </div>
                  </div>

                  <div className="bg-graphik-dark rounded-xl border border-graphik-purple overflow-hidden relative">
                    <div className="absolute top-0 right-0 bg-graphik-purple text-white text-xs px-3 py-1 rounded-bl-lg">
                      POPULAIRE
                    </div>
                    <div className="bg-graphik-purple/10 p-6 text-center">
                      <h3 className="text-xl font-bold text-white">Standard</h3>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-graphik-purple">17,99€</span>
                        <span className="text-gray-300">/mois</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4 mb-6">
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">10000+ chaînes en direct</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">Bibliothèque VOD complète</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">Qualité HD et 4K</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">2 connexions simultanées</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">Support prioritaire 7j/7</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => handleSubscribe("Standard Monthly")}
                        className="w-full py-2 px-4 bg-graphik-purple hover:bg-graphik-violet text-white rounded-md transition"
                      >
                        S'abonner
                      </button>
                    </div>
                  </div>

                  <div className="bg-graphik-dark rounded-xl border border-graphik-light-grey overflow-hidden">
                    <div className="bg-graphik-blue/10 p-6 text-center">
                      <h3 className="text-xl font-bold text-white">Premium</h3>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-graphik-blue">24,99€</span>
                        <span className="text-gray-300">/mois</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4 mb-6">
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">15000+ chaînes en direct</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">VOD Ultra-complète + PPV</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Qualité 4K HDR</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">4 connexions simultanées</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Support VIP 24/7</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => handleSubscribe("Premium Monthly")}
                        className="w-full py-2 px-4 bg-graphik-blue hover:bg-graphik-blue/80 text-white rounded-md transition"
                      >
                        S'abonner
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="quarterly">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-graphik-dark rounded-xl border border-graphik-light-grey overflow-hidden">
                    <div className="bg-graphik-blue/10 p-6 text-center">
                      <h3 className="text-xl font-bold text-white">Basic</h3>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-graphik-blue">32,99€</span>
                        <span className="text-gray-300">/3 mois</span>
                      </div>
                      <p className="text-green-500 text-sm mt-2">
                        Économisez 15% par rapport au mensuel
                      </p>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4 mb-6">
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">5000+ chaînes en direct</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Bibliothèque VOD de base</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Qualité HD</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">1 connexion simultanée</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Support par email</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => handleSubscribe("Basic Quarterly")}
                        className="w-full py-2 px-4 bg-graphik-blue hover:bg-graphik-blue/80 text-white rounded-md transition"
                      >
                        S'abonner
                      </button>
                    </div>
                  </div>

                  <div className="bg-graphik-dark rounded-xl border border-graphik-purple overflow-hidden relative">
                    <div className="absolute top-0 right-0 bg-graphik-purple text-white text-xs px-3 py-1 rounded-bl-lg">
                      POPULAIRE
                    </div>
                    <div className="bg-graphik-purple/10 p-6 text-center">
                      <h3 className="text-xl font-bold text-white">Standard</h3>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-graphik-purple">45,99€</span>
                        <span className="text-gray-300">/3 mois</span>
                      </div>
                      <p className="text-green-500 text-sm mt-2">
                        Économisez 15% par rapport au mensuel
                      </p>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4 mb-6">
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">10000+ chaînes en direct</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">Bibliothèque VOD complète</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">Qualité HD et 4K</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">2 connexions simultanées</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">Support prioritaire 7j/7</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => handleSubscribe("Standard Quarterly")}
                        className="w-full py-2 px-4 bg-graphik-purple hover:bg-graphik-violet text-white rounded-md transition"
                      >
                        S'abonner
                      </button>
                    </div>
                  </div>

                  <div className="bg-graphik-dark rounded-xl border border-graphik-light-grey overflow-hidden">
                    <div className="bg-graphik-blue/10 p-6 text-center">
                      <h3 className="text-xl font-bold text-white">Premium</h3>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-graphik-blue">62,99€</span>
                        <span className="text-gray-300">/3 mois</span>
                      </div>
                      <p className="text-green-500 text-sm mt-2">
                        Économisez 16% par rapport au mensuel
                      </p>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4 mb-6">
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">15000+ chaînes en direct</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">VOD Ultra-complète + PPV</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Qualité 4K HDR</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">4 connexions simultanées</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Support VIP 24/7</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => handleSubscribe("Premium Quarterly")}
                        className="w-full py-2 px-4 bg-graphik-blue hover:bg-graphik-blue/80 text-white rounded-md transition"
                      >
                        S'abonner
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="yearly">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-graphik-dark rounded-xl border border-graphik-light-grey overflow-hidden">
                    <div className="bg-graphik-blue/10 p-6 text-center">
                      <h3 className="text-xl font-bold text-white">Basic</h3>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-graphik-blue">109,99€</span>
                        <span className="text-gray-300">/an</span>
                      </div>
                      <p className="text-green-500 text-sm mt-2">
                        Économisez 30% par rapport au mensuel
                      </p>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4 mb-6">
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">5000+ chaînes en direct</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Bibliothèque VOD de base</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Qualité HD</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">1 connexion simultanée</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Support par email</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">1 mois gratuit</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => handleSubscribe("Basic Yearly")}
                        className="w-full py-2 px-4 bg-graphik-blue hover:bg-graphik-blue/80 text-white rounded-md transition"
                      >
                        S'abonner
                      </button>
                    </div>
                  </div>

                  <div className="bg-graphik-dark rounded-xl border border-graphik-purple overflow-hidden relative">
                    <div className="absolute top-0 right-0 bg-graphik-purple text-white text-xs px-3 py-1 rounded-bl-lg">
                      POPULAIRE
                    </div>
                    <div className="bg-graphik-purple/10 p-6 text-center">
                      <h3 className="text-xl font-bold text-white">Standard</h3>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-graphik-purple">151,99€</span>
                        <span className="text-gray-300">/an</span>
                      </div>
                      <p className="text-green-500 text-sm mt-2">
                        Économisez 30% par rapport au mensuel
                      </p>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4 mb-6">
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">10000+ chaînes en direct</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">Bibliothèque VOD complète</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">Qualité HD et 4K</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">2 connexions simultanées</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">Support prioritaire 7j/7</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-purple mr-2">✓</span>
                          <span className="text-gray-300">2 mois gratuits</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => handleSubscribe("Standard Yearly")}
                        className="w-full py-2 px-4 bg-graphik-purple hover:bg-graphik-violet text-white rounded-md transition"
                      >
                        S'abonner
                      </button>
                    </div>
                  </div>

                  <div className="bg-graphik-dark rounded-xl border border-graphik-light-grey overflow-hidden">
                    <div className="bg-graphik-blue/10 p-6 text-center">
                      <h3 className="text-xl font-bold text-white">Premium</h3>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-graphik-blue">209,99€</span>
                        <span className="text-gray-300">/an</span>
                      </div>
                      <p className="text-green-500 text-sm mt-2">
                        Économisez 30% par rapport au mensuel
                      </p>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4 mb-6">
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">15000+ chaînes en direct</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">VOD Ultra-complète + PPV</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Qualité 4K HDR</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">4 connexions simultanées</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">Support VIP 24/7</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-graphik-blue mr-2">✓</span>
                          <span className="text-gray-300">3 mois gratuits</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => handleSubscribe("Premium Yearly")}
                        className="w-full py-2 px-4 bg-graphik-blue hover:bg-graphik-blue/80 text-white rounded-md transition"
                      >
                        S'abonner
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Compatible Devices */}
        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Appareils Compatibles"
            description="Profitez de votre contenu sur tous vos appareils"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
            <div className="bg-graphik-grey p-6 rounded-xl">
              <div className="h-16 flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 5.5H10" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.0039 19.1C12.8893 19.1 13.6039 18.3855 13.6039 17.5C13.6039 16.6145 12.8893 15.9 12.0039 15.9C11.1184 15.9 10.4039 16.6145 10.4039 17.5C10.4039 18.3855 11.1184 19.1 12.0039 19.1Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="text-white font-medium">Smartphone</h4>
              <p className="text-gray-400 text-sm">iOS, Android</p>
            </div>

            <div className="bg-graphik-grey p-6 rounded-xl">
              <div className="h-16 flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.18945 22H15.8094C16.5794 22 17.2094 21.33 17.1594 20.56L16.3294 12H7.66945L6.83945 20.56C6.78945 21.33 7.41945 22 8.18945 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.0006 7.24023C20.0006 7.87023 19.5006 8.37023 18.8706 8.37023H5.1306C4.5006 8.37023 4.0006 7.87023 4.0006 7.24023C4.0006 6.61023 4.5006 6.11023 5.1306 6.11023H18.8706C19.5006 6.11023 20.0006 6.61023 20.0006 7.24023Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.7906 5.85C17.5306 3.63 16.0706 2 14.3106 2H9.69055C7.93055 2 6.47055 3.63 6.21055 5.85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.9997 17H12.0097" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="text-white font-medium">Ordinateur</h4>
              <p className="text-gray-400 text-sm">Windows, Mac, Linux</p>
            </div>

            <div className="bg-graphik-grey p-6 rounded-xl">
              <div className="h-16 flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 17.5H2" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 22H4C2.9 22 2 21.1 2 20V9C2 7.9 2.9 7 4 7H20C21.1 7 22 7.9 22 9V20C22 21.1 21.1 22 20 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2V7" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 5.5L12 2L16 5.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="text-white font-medium">Smart TV</h4>
              <p className="text-gray-400 text-sm">Samsung, LG, Sony</p>
            </div>

            <div className="bg-graphik-grey p-6 rounded-xl">
              <div className="h-16 flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.47 10.7501H3.53002C2.14002 10.7501 1.01001 11.8801 1.01001 13.2701V18.5101C1.01001 19.9001 2.14002 21.0301 3.53002 21.0301H20.47C21.86 21.0301 22.99 19.9001 22.99 18.5101V13.2701C22.99 11.8801 21.86 10.7501 20.47 10.7501Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 15H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 17H16C15.45 17 15 16.55 15 16V15C15 14.45 15.45 14 16 14H19C19.55 14 20 14.45 20 15V16C20 16.55 19.55 17 19 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.26996 5.97984C5.80996 4.27984 7.01996 2.54984 8.76996 2.96984C9.62996 3.16984 10.26 3.89984 10.33 4.77984C10.41 5.73984 9.88996 6.55984 9.09996 6.89984C8.93996 6.95984 8.82996 7.11984 8.82996 7.28984V7.86984" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.28 5.97984C15.82 4.27984 17.03 2.54984 18.78 2.96984C19.64 3.16984 20.27 3.89984 20.34 4.77984C20.42 5.73984 19.9 6.55984 19.11 6.89984C18.95 6.95984 18.84 7.11984 18.84 7.28984V7.86984" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="text-white font-medium">Box TV</h4>
              <p className="text-gray-400 text-sm">Android, Apple, Fire</p>
            </div>

            <div className="bg-graphik-grey p-6 rounded-xl">
              <div className="h-16 flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 15.5C10.5 14.12 9.38 13 8 13C6.62 13 5.5 14.12 5.5 15.5C5.5 16.88 6.62 18 8 18C9.38 18 10.5 16.88 10.5 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 18.5C17.1046 18.5 18 17.6046 18 16.5C18 15.3954 17.1046 14.5 16 14.5C14.8954 14.5 14 15.3954 14 16.5C14 17.6046 14.8954 18.5 16 18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 6.5C18 7.88 19.12 9 20.5 9C21.88 9 23 7.88 23 6.5C23 5.12 21.88 4 20.5 4C19.12 4 18 5.12 18 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.5 9C4.88071 9 6 7.88071 6 6.5C6 5.11929 4.88071 4 3.5 4C2.11929 4 1 5.11929 1 6.5C1 7.88071 2.11929 9 3.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.5 9.5H13.5C14.6 9.5 15.5 8.6 15.5 7.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 11V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.5 11V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="text-white font-medium">Console</h4>
              <p className="text-gray-400 text-sm">Xbox, PlayStation</p>
            </div>

            <div className="bg-graphik-grey p-6 rounded-xl">
              <div className="h-16 flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 10V9C22 5 21 4 17 4H7C3 4 2 5 2 9V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 13V15C22 19 21 20 17 20H7C3 20 2 19 2 15V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 4V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="text-white font-medium">Tablette</h4>
              <p className="text-gray-400 text-sm">iOS, Android</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Questions Fréquentes"
              description="Tout ce que vous devez savoir sur nos services IPTV"
            />

            <div className="max-w-3xl mx-auto grid gap-6">
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Qu'est-ce que l'IPTV ?
                </h3>
                <p className="text-gray-300">
                  L'IPTV (Internet Protocol Television) permet de regarder la télévision via Internet plutôt que par les méthodes traditionnelles comme l'antenne, le câble ou le satellite. Cela vous donne accès à des milliers de chaînes du monde entier sur n'importe quel appareil connecté.
                </p>
              </div>
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Quelle connexion internet est nécessaire ?
                </h3>
                <p className="text-gray-300">
                  Pour une expérience optimale, nous recommandons une connexion d'au moins 25 Mbps pour le contenu 4K. Pour le contenu HD, 10 Mbps suffisent généralement. Vous pouvez tester votre débit sur speedtest.net avant de vous abonner.
                </p>
              </div>
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Comment installer le service IPTV ?
                </h3>
                <p className="text-gray-300">
                  Après votre achat, vous recevrez un guide d'installation détaillé. L'installation est simple et rapide, généralement via une application dédiée comme IPTV Smarters, GSE Smart IPTV, ou directement via un navigateur web. Notre équipe support est disponible pour vous assister.
                </p>
              </div>
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Que faire en cas de problème technique ?
                </h3>
                <p className="text-gray-300">
                  Notre équipe de support technique est disponible 7j/7 via chat, email ou téléphone. Nous proposons également une base de connaissances complète avec des guides de dépannage pour les problèmes les plus courants.
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

export default IPTV;
