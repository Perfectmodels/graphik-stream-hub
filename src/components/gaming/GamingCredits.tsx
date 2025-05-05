
import React from "react";
import SectionHeader from "@/components/SectionHeader";
import PlatformCard from "@/components/PlatformCard";

interface GameCredit {
  name: string;
  logo: string;
  description: string;
  price: string;
  features: string[];
}

interface GamingCreditsProps {
  onSubscribe: (platform: string) => void;
}

const GamingCredits: React.FC<GamingCreditsProps> = ({ onSubscribe }) => {
  const games: GameCredit[] = [
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

  return (
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
            buttonAction={() => onSubscribe(game.name)}
          />
        ))}
      </div>
    </section>
  );
};

export default GamingCredits;
