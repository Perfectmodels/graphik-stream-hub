
import React from "react";
import PlatformCard from "@/components/PlatformCard";

interface PopularPlatformsProps {
  onSubscribe: (platform: string) => void;
}

const PopularPlatforms: React.FC<PopularPlatformsProps> = ({ onSubscribe }) => {
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
