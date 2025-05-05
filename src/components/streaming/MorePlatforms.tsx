
import React from "react";
import PlatformCard from "@/components/PlatformCard";

interface MorePlatformsProps {
  onSubscribe: (platform: string) => void;
}

const MorePlatforms: React.FC<MorePlatformsProps> = ({ onSubscribe }) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {morePlatforms.map((platform) => (
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

export default MorePlatforms;
