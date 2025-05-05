
import React from "react";
import SectionHeader from "@/components/SectionHeader";

const GamingFAQ: React.FC = () => {
  return (
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
  );
};

export default GamingFAQ;
