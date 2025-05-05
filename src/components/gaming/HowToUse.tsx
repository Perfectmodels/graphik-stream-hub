
import React from "react";
import SectionHeader from "@/components/SectionHeader";

const HowToUse: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <SectionHeader
        title="Comment utiliser nos codes et crédits ?"
        description="Un processus simple en trois étapes"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey text-center relative">
          <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-graphik-blue flex items-center justify-center text-xl font-bold">
            1
          </div>
          <div className="h-24 flex items-center justify-center mb-4">
            <svg className="w-16 h-16 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.9094 7.84088L7.71941 13.0309C7.51941 13.2309 7.31941 13.6209 7.28941 13.9009L7.00941 15.8809C6.90941 16.6009 7.40941 17.1009 8.12941 17.0009L10.1094 16.7209C10.3894 16.6909 10.7794 16.4909 10.9794 16.2909L16.1694 11.1009C17.0594 10.2109 17.4994 9.17088 16.1694 7.84088C14.8494 6.51088 13.7994 6.94088 12.9094 7.84088Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.1699 8.58008C12.6099 10.1501 13.8399 11.3901 15.4199 11.8301" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Sélectionnez et achetez</h3>
          <p className="text-gray-300">
            Choisissez votre jeu, plateforme ou service et procédez au paiement sécurisé
          </p>
        </div>

        <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey text-center relative">
          <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-graphik-blue flex items-center justify-center text-xl font-bold">
            2
          </div>
          <div className="h-24 flex items-center justify-center mb-4">
            <svg className="w-16 h-16 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.08997 9.00008C9.32997 8.33008 9.95997 7.80008 10.73 7.80008H13.27C14.34 7.80008 15.2 8.66008 15.2 9.73008C15.2 10.8001 14.34 11.6601 13.27 11.6601H10.73C9.66997 11.6601 8.80997 12.5201 8.80997 13.5901C8.80997 14.6601 9.66997 15.5201 10.73 15.5201H13.27C14.34 15.5201 15.2 14.6601 15.2 13.5901" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 18V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Recevez votre code</h3>
          <p className="text-gray-300">
            Obtenez instantanément votre code par email et dans votre espace client
          </p>
        </div>

        <div className="bg-graphik-grey p-6 rounded-xl border border-graphik-light-grey text-center relative">
          <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-graphik-blue flex items-center justify-center text-xl font-bold">
            3
          </div>
          <div className="h-24 flex items-center justify-center mb-4">
            <svg className="w-16 h-16 text-graphik-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.0002 8.38v8.25c0 1.06-.86 1.92-1.91 1.92H7.92024c-1.05 0-1.92-0.86-1.92-1.91V7.91c0-1.05 0.86-1.91 1.91-1.91h8.17c1.05 0 1.91 0.86 1.91 1.91" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.9998 16.63V8.38c0-1.05-0.86-1.91-1.91-1.91H7.91979c-1.05 0-1.91 0.86-1.91 1.91v8.17c0 1.05 0.86 1.91 1.91 1.91h8.17c1.04 0 1.9-0.86 1.9-1.91z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.90006 13.11l1.04 0.96 2.55-2.55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.0999 11.75h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.0999 15.25h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Activez votre code</h3>
          <p className="text-gray-300">
            Suivez nos guides simples pour activer votre code ou crédit sur votre plateforme
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
