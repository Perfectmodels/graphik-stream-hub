
import React from "react";
import SectionHeader from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard } from "lucide-react";

interface GiftCardsProps {
  onBuyCard: (cardName: string) => void;
}

const GiftCards: React.FC<GiftCardsProps> = ({ onBuyCard }) => {
  const cardValues = [5000, 10000, 15000, 25000, 50000];
  
  const renderCardGrid = (platform: string) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {cardValues.map((value) => (
        <Card key={value} className="bg-graphik-grey border border-graphik-light-grey hover:border-graphik-blue transition-colors p-6 text-center cursor-pointer">
          <div className="mb-4 h-10 flex items-center justify-center">
            <CreditCard className="text-graphik-blue h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{value.toLocaleString()} FCFA</h3>
          <p className="text-gray-300 text-sm mb-4">{platform} Store</p>
          <button
            onClick={() => onBuyCard(`${platform} Card ${value} FCFA`)}
            className="w-full py-2 px-4 bg-graphik-blue hover:bg-graphik-blue/80 text-white rounded-md transition"
          >
            Acheter
          </button>
        </Card>
      ))}
    </div>
  );

  return (
    <section className="container mx-auto px-4 py-20">
      <SectionHeader
        title="Cartes Cadeaux"
        description="Offrez du crédit pour les principales plateformes"
      />

      <Tabs defaultValue="playstation" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-graphik-grey">
          <TabsTrigger value="playstation" className="data-[state=active]:bg-graphik-blue">
            PlayStation
          </TabsTrigger>
          <TabsTrigger value="xbox" className="data-[state=active]:bg-graphik-blue">
            Xbox
          </TabsTrigger>
          <TabsTrigger value="nintendo" className="data-[state=active]:bg-graphik-blue">
            Nintendo
          </TabsTrigger>
          <TabsTrigger value="steam" className="data-[state=active]:bg-graphik-blue">
            Steam
          </TabsTrigger>
        </TabsList>

        <TabsContent value="playstation">
          {renderCardGrid("PlayStation")}
        </TabsContent>

        <TabsContent value="xbox">
          {renderCardGrid("Xbox")}
        </TabsContent>

        <TabsContent value="nintendo">
          {renderCardGrid("Nintendo eShop")}
        </TabsContent>

        <TabsContent value="steam">
          {renderCardGrid("Steam Wallet")}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default GiftCards;
