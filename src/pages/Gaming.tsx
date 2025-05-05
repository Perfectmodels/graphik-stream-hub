
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import PlatformCard from "@/components/PlatformCard";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, BadgeCheck, ShoppingCart, Gamepad2 } from "lucide-react";
import SubscriptionDialog from "@/components/SubscriptionDialog";

const Gaming = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const handleSubscribe = (platform: string) => {
    setSelectedPlatform(platform);
    setIsDialogOpen(true);
  };

  const games = [
    {
      name: "Call of Duty",
      logo: "/placeholder.svg",
      description: "Crédits pour acheter des packs, skins et passes de combat",
      price: "À partir de 6000 FCFA",
      features: [
        "Points CoD pour Modern Warfare",
        "Crédits pour Warzone",
        "Battle Pass",
        "Skins exclusifs",
        "Livraison instantanée",
      ],
    },
    {
      name: "Fortnite",
      logo: "/placeholder.svg",
      description: "V-Bucks pour acheter des cosmétiques et le Battle Pass",
      price: "À partir de 5000 FCFA",
      features: [
        "V-Bucks pour tous les modes",
        "Battle Pass",
        "Packs de skins",
        "Emotes et accessoires",
        "Utilisation cross-platform",
      ],
    },
    {
      name: "PUBG",
      logo: "/placeholder.svg",
      description: "UC (Unknown Cash) pour personnaliser votre expérience",
      price: "À partir de 3000 FCFA",
      features: [
        "UC pour PUBG Mobile et PC",
        "Royal Pass",
        "Crates et skins",
        "Armes et véhicules",
        "Livraison sécurisée",
      ],
    },
    {
      name: "Roblox",
      logo: "/placeholder.svg",
      description: "Robux pour acheter des objets, vêtements et expériences",
      price: "À partir de 3000 FCFA",
      features: [
        "Robux pour toute la plateforme",
        "Objets et accessoires",
        "Premium Passes",
        "Expériences exclusives",
        "Livraison instantanée",
      ],
    },
  ];

  const subscriptions = [
    {
      name: "Xbox Game Pass",
      logo: "/placeholder.svg",
      description: "Accès à une bibliothèque de jeux Xbox et PC",
      price: "À partir de 7000 FCFA/mois",
      features: [
        "+100 jeux de haute qualité",
        "Nouvelles sorties day one",
        "Réductions exclusives",
        "EA Play inclus",
        "Multijoueur en ligne",
      ],
    },
    {
      name: "PlayStation Plus",
      logo: "/placeholder.svg",
      description: "Abonnement premium pour les joueurs PlayStation",
      price: "À partir de 6000 FCFA/mois",
      features: [
        "Jeux mensuels offerts",
        "Multijoueur en ligne",
        "Réductions exclusives",
        "Stockage cloud",
        "Contenu exclusif",
      ],
    },
    {
      name: "Nintendo Switch Online",
      logo: "/placeholder.svg",
      description: "Service en ligne pour Nintendo Switch",
      price: "À partir de 2500 FCFA/mois",
      features: [
        "Jeu en ligne",
        "Jeux NES et SNES",
        "Sauvegarde dans le cloud",
        "Offres spéciales",
        "Application mobile",
      ],
    },
    {
      name: "EA Play",
      logo: "/placeholder.svg",
      description: "Abonnement aux jeux Electronic Arts",
      price: "À partir de 3500 FCFA/mois",
      features: [
        "Accès aux jeux EA",
        "Essais anticipés",
        "10% de réduction",
        "Récompenses exclusives",
        "Contenu exclusif",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="Gaming & Jeux Vidéo"
          subtitle="Crédits et Abonnements"
          description="Boostez votre expérience de jeu avec nos cartes, crédits et abonnements pour les plateformes les plus populaires"
          backgroundImage="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600"
        />

        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Crédits de Jeu"
            description="Achetez des crédits pour vos jeux préférés"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {games.map((game) => (
              <PlatformCard
                key={game.name}
                name={game.name}
                logo={game.logo}
                description={game.description}
                price={game.price}
                features={game.features}
                buttonText="Acheter"
                buttonAction={() => handleSubscribe(game.name)}
              />
            ))}
          </div>
        </section>

        {/* Subscriptions */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Abonnements Gaming"
              description="Accédez à des centaines de jeux avec un seul abonnement"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {subscriptions.map((sub) => (
                <PlatformCard
                  key={sub.name}
                  name={sub.name}
                  logo={sub.logo}
                  description={sub.description}
                  price={sub.price}
                  features={sub.features}
                  buttonText="S'abonner"
                  buttonAction={() => handleSubscribe(sub.name)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Gift Cards */}
        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Cartes Cadeaux"
            description="Offrez du crédit pour les principales plateformes"
          />

          <Tabs defaultValue="playstation" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-graphik-grey">
              <TabsTrigger value="playstation" className="data-[state=active]:bg-graphik-blue">
                PlayStation
              </TabsTrigger>
              <TabsTrigger value="xbox" className="data-[state=active]:bg-graphik-blue">
                Xbox
              </TabsTrigger>
              <TabsTrigger value="nintendo" className="data-[state=active]:bg-graphik-blue">
                Nintendo
              </TabsTrigger>
              <TabsTrigger value="steam" className="data-[state=active]:bg-graphik-blue">
                Steam
              </TabsTrigger>
            </TabsList>

            <TabsContent value="playstation">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[5000, 10000, 15000, 25000, 50000].map((value) => (
                  <Card key={value} className="bg-graphik-grey border border-graphik-light-grey hover:border-graphik-blue transition-colors p-6 text-center cursor-pointer">
                    <div className="mb-4 h-10 flex items-center justify-center">
                      <CreditCard className="text-graphik-blue h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{value.toLocaleString()} FCFA</h3>
                    <p className="text-gray-300 text-sm mb-4">PlayStation Store</p>
                    <button
                      onClick={() => handleSubscribe(`PlayStation Card ${value} FCFA`)}
                      className="w-full py-2 px-4 bg-graphik-blue hover:bg-graphik-blue/80 text-white rounded-md transition"
                    >
                      Acheter
                    </button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="xbox">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[5000, 10000, 15000, 25000, 50000].map((value) => (
                  <Card key={value} className="bg-graphik-grey border border-graphik-light-grey hover:border-graphik-blue transition-colors p-6 text-center cursor-pointer">
                    <div className="mb-4 h-10 flex items-center justify-center">
                      <CreditCard className="text-graphik-blue h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{value.toLocaleString()} FCFA</h3>
                    <p className="text-gray-300 text-sm mb-4">Xbox Store</p>
                    <button
                      onClick={() => handleSubscribe(`Xbox Card ${value} FCFA`)}
                      className="w-full py-2 px-4 bg-graphik-blue hover:bg-graphik-blue/80 text-white rounded-md transition"
                    >
                      Acheter
                    </button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nintendo">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[5000, 10000, 15000, 25000, 50000].map((value) => (
                  <Card key={value} className="bg-graphik-grey border border-graphik-light-grey hover:border-graphik-blue transition-colors p-6 text-center cursor-pointer">
                    <div className="mb-4 h-10 flex items-center justify-center">
                      <CreditCard className="text-graphik-blue h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{value.toLocaleString()} FCFA</h3>
                    <p className="text-gray-300 text-sm mb-4">Nintendo eShop</p>
                    <button
                      onClick={() => handleSubscribe(`Nintendo Card ${value} FCFA`)}
                      className="w-full py-2 px-4 bg-graphik-blue hover:bg-graphik-blue/80 text-white rounded-md transition"
                    >
                      Acheter
                    </button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="steam">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[5000, 10000, 15000, 25000, 50000].map((value) => (
                  <Card key={value} className="bg-graphik-grey border border-graphik-light-grey hover:border-graphik-blue transition-colors p-6 text-center cursor-pointer">
                    <div className="mb-4 h-10 flex items-center justify-center">
                      <CreditCard className="text-graphik-blue h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{value.toLocaleString()} FCFA</h3>
                    <p className="text-gray-300 text-sm mb-4">Steam Wallet</p>
                    <button
                      onClick={() => handleSubscribe(`Steam Card ${value} FCFA`)}
                      className="w-full py-2 px-4 bg-graphik-blue hover:bg-graphik-blue/80 text-white rounded-md transition"
                    >
                      Acheter
                    </button>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Features */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Pourquoi Choisir Graphik'Studio ?"
              description="Des avantages exclusifs pour tous les gamers"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <div className="bg-graphik-blue/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <ShoppingCart className="text-graphik-blue w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Livraison Instantanée</h3>
                <p className="text-gray-300">
                  Recevez vos codes et crédits immédiatement après le paiement par email
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <div className="bg-graphik-purple/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <CreditCard className="text-graphik-purple w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Paiements Sécurisés</h3>
                <p className="text-gray-300">
                  Multiples méthodes de paiement sécurisées : carte, Mobile Money, virement bancaire
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <div className="bg-graphik-blue/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <BadgeCheck className="text-graphik-blue w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">100% Fiable</h3>
                <p className="text-gray-300">
                  Codes garantis fonctionnels ou remboursés, service client disponible 24/7
                </p>
              </div>

              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <div className="bg-graphik-purple/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Gamepad2 className="text-graphik-purple w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Compatibilité Maximale</h3>
                <p className="text-gray-300">
                  Compatible avec toutes les consoles et plateformes de jeu actuelles
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How To Use */}
        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Comment utiliser nos codes et crédits ?"
            description="Un processus simple en trois étapes"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey text-center relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-graphik-blue flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="h-24 flex items-center justify-center mb-4">
                <svg className="w-16 h-16 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.9094 7.84088L7.71941 13.0309C7.51941 13.2309 7.31941 13.6209 7.28941 13.9009L7.00941 15.8809C6.90941 16.6009 7.40941 17.1009 8.12941 17.0009L10.1094 16.7209C10.3894 16.6909 10.7794 16.4909 10.9794 16.2909L16.1694 11.1009C17.0594 10.2109 17.4994 9.17088 16.1694 7.84088C14.8494 6.51088 13.7994 6.94088 12.9094 7.84088Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.1699 8.58008C12.6099 10.1501 13.8399 11.3901 15.4199 11.8301" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sélectionnez et achetez</h3>
              <p className="text-gray-300">
                Choisissez votre jeu, plateforme ou service et procédez au paiement sécurisé
              </p>
            </div>

            <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey text-center relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-graphik-blue flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="h-24 flex items-center justify-center mb-4">
                <svg className="w-16 h-16 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.08997 9.00008C9.32997 8.33008 9.95997 7.80008 10.73 7.80008H13.27C14.34 7.80008 15.2 8.66008 15.2 9.73008C15.2 10.8001 14.34 11.6601 13.27 11.6601H10.73C9.66997 11.6601 8.80997 12.5201 8.80997 13.5901C8.80997 14.6601 9.66997 15.5201 10.73 15.5201H13.27C14.34 15.5201 15.2 14.6601 15.2 13.5901" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Recevez votre code</h3>
              <p className="text-gray-300">
                Obtenez instantanément votre code par email et dans votre espace client
              </p>
            </div>

            <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey text-center relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-graphik-blue flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="h-24 flex items-center justify-center mb-4">
                <svg className="w-16 h-16 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.0002 8.38v8.25c0 1.06-.86 1.92-1.91 1.92H7.92024c-1.05 0-1.92-0.86-1.92-1.91V7.91c0-1.05 0.86-1.91 1.91-1.91h8.17c1.05 0 1.91 0.86 1.91 1.91" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.9998 16.63V8.38c0-1.05-0.86-1.91-1.91-1.91H7.91979c-1.05 0-1.91 0.86-1.91 1.91v8.17c0 1.05 0.86 1.91 1.91 1.91h8.17c1.04 0 1.9-0.86 1.9-1.91z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.90006 13.11l1.04 0.96 2.55-2.55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.0999 11.75h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.0999 15.25h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Activez votre code</h3>
              <p className="text-gray-300">
                Suivez nos guides simples pour activer votre code ou crédit sur votre plateforme
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Questions Fréquentes"
              description="Tout ce que vous devez savoir sur nos offres gaming"
            />

            <div className="max-w-3xl mx-auto grid gap-6">
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Combien de temps faut-il pour recevoir mon code ?
                </h3>
                <p className="text-gray-300">
                  La livraison est instantanée. Vous recevrez votre code par email immédiatement après la confirmation de votre paiement. Il sera également disponible dans votre espace client.
                </p>
              </div>
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Les codes sont-ils régionaux ou internationaux ?
                </h3>
                <p className="text-gray-300">
                  La plupart de nos codes sont utilisables dans toute l'Afrique. Certains sont spécifiques à des régions. L'information est clairement indiquée sur la page de chaque produit avant l'achat.
                </p>
              </div>
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Que faire si mon code ne fonctionne pas ?
                </h3>
                <p className="text-gray-300">
                  Tous nos codes sont garantis. Si vous rencontrez un problème, contactez immédiatement notre service client via WhatsApp au +241 62 70 89 98. Nous résoudrons le problème ou vous rembourserons intégralement.
                </p>
              </div>
              <div className="bg-graphik-dark p-6 rounded-xl border border-graphik-light-grey">
                <h3 className="text-xl font-bold text-white mb-2">
                  Est-il possible d'offrir un code en cadeau ?
                </h3>
                <p className="text-gray-300">
                  Absolument ! Lors de votre achat, vous pouvez choisir l'option "Offrir en cadeau" et indiquer l'adresse email du destinataire. Vous pourrez même personnaliser le message et programmer la date d'envoi.
                </p>
              </div>
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

export default Gaming;
