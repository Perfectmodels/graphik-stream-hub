
import React from "react";
import SectionHeader from "@/components/SectionHeader";

const VideoFAQ: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <SectionHeader
        title="Questions Fréquentes"
        description="Tout ce que vous devez savoir sur nos offres de streaming vidéo"
      />

      <div className="max-w-3xl mx-auto grid gap-6">
        <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey">
          <h3 className="text-xl font-bold text-white mb-2">
            Comment fonctionnent les abonnements ?
          </h3>
          <p className="text-gray-300">
            Nous vous fournissons un accès aux plateformes de streaming via des comptes optimisés. Après votre paiement, vous recevez immédiatement vos identifiants de connexion par email.
          </p>
        </div>
        <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey">
          <h3 className="text-xl font-bold text-white mb-2">
            Les abonnements sont-ils partagés ?
          </h3>
          <p className="text-gray-300">
            Nos abonnements sont personnels et ne doivent pas être partagés. Pour une utilisation familiale, nous proposons des forfaits spécifiques permettant l'utilisation sur plusieurs appareils.
          </p>
        </div>
        <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey">
          <h3 className="text-xl font-bold text-white mb-2">
            Quelle est la durée des abonnements ?
          </h3>
          <p className="text-gray-300">
            Nous proposons des durées flexibles : mensuel, trimestriel ou annuel. Plus la période est longue, plus vous bénéficiez de réductions avantageuses.
          </p>
        </div>
        <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey">
          <h3 className="text-xl font-bold text-white mb-2">
            Comment regarder sur ma TV ?
          </h3>
          <p className="text-gray-300">
            Vous pouvez accéder à votre compte sur tous les appareils compatibles : Smart TV, boîtiers TV connectés (Apple TV, Android TV, Fire Stick), consoles de jeux ou simplement via votre navigateur web.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoFAQ;
