
import React from "react";
import PlatformCard from "@/components/PlatformCard";

interface PopularPlatformsProps {
  onSubscribe: (platform: string) => void;
}

const PopularPlatforms: React.FC<PopularPlatformsProps> = ({ onSubscribe }) => {
  const platforms = [
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png",
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
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
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
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/2560px-Amazon_Prime_Video_logo.svg.png",
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
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Apple_TV_Plus_logo.svg/2560px-Apple_TV_Plus_logo.svg.png",
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
