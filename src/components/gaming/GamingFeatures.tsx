
import React from "react";
import SectionHeader from "@/components/SectionHeader";
import { ShoppingCart, CreditCard, BadgeCheck, Gamepad2 } from "lucide-react";

const GamingFeatures: React.FC = () => {
  return (
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
  );
};

export default GamingFeatures;
