import React from "react";
import PlatformCard from "@/components/PlatformCard";

interface PopularPlatformsProps {
  onSubscribe: (platform: string) => void;
}

const PopularPlatforms: React.FC<PopularPlatformsProps> = ({ onSubscribe }) => {
  const platforms = [
    {
      name: "Netflix",
      logo: "https://i.ibb.co/sdwfrdq3/pngegg-4.png",
      description: "Leader mondial avec un immense catalogue de séries, films et documentaires",
      price: "À partir de 2500 FCFA/mois",
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
      logo: "https://i.ibb.co/xq2Q75z5/pngegg-3.png",
      description: "Accès aux univers Disney, Pixar, Marvel, Star Wars et National Geographic",
      price: "À partir de 2500 FCFA/mois",
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
      logo: "https://i.ibb.co/CpjV0zcv/pngegg-2.png",
      description: "Challenger avec un catalogue en croissance et des productions originales",
      price: "À partir de 2500 FCFA/mois",
      features: [
        "Milliers de films et séries",
        "Productions originales Amazon",
        "Qualité HD et 4K",
        "Téléchargement pour visionnage hors ligne",
        "Inclus avec l'abonnement Amazon Prime",
      ],
    },
    {
      name: "Apple TV+",
      logo: "https://i.ibb.co/ptyt7Hh/pngegg-1.png",
      description: "Service premium avec des productions originales de haute qualité",
      price: "À partir de 2500 FCFA/mois",
      features: [
        "Productions originales exclusives",
        "Qualité 4K HDR et Dolby Atmos",
        "Partage familial inclus",
        "Sans publicités",
        "Téléchargement pour visionnage hors ligne",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {platforms.map((platform) => (
        <PlatformCard
          key={platform.name}
          name={platform.name}
          logo={platform.logo}
          description={platform.description}
          price={platform.price}
          features={platform.features}
          buttonAction={() => onSubscribe(platform.name)}
        />
      ))}
    </div>
  );
};

export default PopularPlatforms;
