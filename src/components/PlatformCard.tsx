
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PlatformCardProps {
  name: string;
  logo: string;
  description: string;
  price?: string;
  features?: string[];
  buttonText?: string;
  buttonAction?: () => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({
  name,
  logo,
  description,
  price,
  features,
  buttonText = "S'abonner",
  buttonAction,
}) => {
  const navigate = useNavigate();
  
  // Fonction pour convertir le prix en FCFA si nécessaire
  const formatPrice = (priceStr: string | undefined) => {
    if (!priceStr) return '';
    
    // Si le prix contient déjà "FCFA", on le retourne tel quel
    if (priceStr.includes('FCFA')) return priceStr;
    
    // Sinon on remplace € par FCFA
    return priceStr.replace('€', 'FCFA');
  };
  
  // Fonction pour gérer le clic sur le bouton
  const handleButtonClick = () => {
    if (buttonAction) {
      // Si une action personnalisée est fournie, on l'utilise
      buttonAction();
    } else {
      // Sinon on navigue vers la page d'abonnement avec le service présélectionné
      navigate("/subscribe", { state: { serviceType: name } });
    }
  };

  return (
    <div className="service-card h-full flex flex-col">
      <div className="p-6 flex items-center justify-center bg-graphik-dark/50">
        <img src={logo} alt={name} className="h-16 object-contain" />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        {price && <p className="text-graphik-blue font-bold mb-4">{formatPrice(price)}</p>}
        {features && (
          <ul className="mb-4 space-y-2 flex-grow">
            {features.map((feature, index) => (
              <li key={index} className="text-gray-300 text-sm flex items-start">
                <span className="text-graphik-blue mr-2">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <Button 
          className="w-full bg-graphik-blue hover:bg-graphik-blue/80 mt-auto"
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PlatformCard;
