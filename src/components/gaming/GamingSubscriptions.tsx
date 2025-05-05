
import React from "react";
import SectionHeader from "@/components/SectionHeader";
import PlatformCard from "@/components/PlatformCard";

interface GameSubscription {
  name: string;
  logo: string;
  description: string;
  price: string;
  features: string[];
}

interface GamingSubscriptionsProps {
  onSubscribe: (platform: string) => void;
}

const GamingSubscriptions: React.FC<GamingSubscriptionsProps> = ({ onSubscribe }) => {
  const subscriptions: GameSubscription[] = [
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
              buttonAction={() => onSubscribe(sub.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamingSubscriptions;
