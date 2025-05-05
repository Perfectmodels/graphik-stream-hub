
import React from "react";
import SectionHeader from "@/components/SectionHeader";

const ComparisonTable: React.FC = () => {
  return (
    <section className="bg-graphik-grey py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Comparatif des plateformes"
          description="Trouvez la plateforme qui correspond le mieux à vos besoins"
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b border-graphik-light-grey">
                <th className="py-4 px-6 text-left text-white">Plateforme</th>
                <th className="py-4 px-6 text-left text-white">Prix</th>
                <th className="py-4 px-6 text-left text-white">Qualité Max</th>
                <th className="py-4 px-6 text-left text-white">Écrans simultanés</th>
                <th className="py-4 px-6 text-left text-white">Mode hors ligne</th>
                <th className="py-4 px-6 text-left text-white">Contenu original</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                <td className="py-4 px-6 text-white">Netflix</td>
                <td className="py-4 px-6 text-gray-300">5000 - 15000 FCFA</td>
                <td className="py-4 px-6 text-gray-300">4K HDR</td>
                <td className="py-4 px-6 text-gray-300">1-4</td>
                <td className="py-4 px-6 text-gray-300">✓</td>
                <td className="py-4 px-6 text-gray-300">✓✓✓</td>
              </tr>
              <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                <td className="py-4 px-6 text-white">Disney+</td>
                <td className="py-4 px-6 text-gray-300">4000 - 8000 FCFA</td>
                <td className="py-4 px-6 text-gray-300">4K HDR</td>
                <td className="py-4 px-6 text-gray-300">4</td>
                <td className="py-4 px-6 text-gray-300">✓</td>
                <td className="py-4 px-6 text-gray-300">✓✓</td>
              </tr>
              <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                <td className="py-4 px-6 text-white">Prime Video</td>
                <td className="py-4 px-6 text-gray-300">3500 FCFA (Prime)</td>
                <td className="py-4 px-6 text-gray-300">4K HDR</td>
                <td className="py-4 px-6 text-gray-300">3</td>
                <td className="py-4 px-6 text-gray-300">✓</td>
                <td className="py-4 px-6 text-gray-300">✓✓</td>
              </tr>
              <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                <td className="py-4 px-6 text-white">Canal+</td>
                <td className="py-4 px-6 text-gray-300">15000+ FCFA</td>
                <td className="py-4 px-6 text-gray-300">4K HDR</td>
                <td className="py-4 px-6 text-gray-300">2</td>
                <td className="py-4 px-6 text-gray-300">✓</td>
                <td className="py-4 px-6 text-gray-300">✓✓</td>
              </tr>
              <tr className="border-b border-graphik-light-grey hover:bg-graphik-dark/50">
                <td className="py-4 px-6 text-white">Apple TV+</td>
                <td className="py-4 px-6 text-gray-300">4500 FCFA</td>
                <td className="py-4 px-6 text-gray-300">4K HDR</td>
                <td className="py-4 px-6 text-gray-300">6 (partage familial)</td>
                <td className="py-4 px-6 text-gray-300">✓</td>
                <td className="py-4 px-6 text-gray-300">✓✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
