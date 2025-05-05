
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/SectionHeader";
import PopularPlatforms from "./PopularPlatforms";
import MorePlatforms from "./MorePlatforms";

interface PlatformTabsProps {
  onSubscribe: (platform: string) => void;
}

const PlatformTabs: React.FC<PlatformTabsProps> = ({ onSubscribe }) => {
  return (
    <section className="container mx-auto px-4 py-20">
      <SectionHeader
        title="Plateformes Populaires"
        description="Découvrez les services de streaming vidéo les plus recherchés"
      />

      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-graphik-grey">
          <TabsTrigger value="popular" className="data-[state=active]:bg-graphik-purple">
            Les plus populaires
          </TabsTrigger>
          <TabsTrigger value="more" className="data-[state=active]:bg-graphik-purple">
            Autres plateformes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="popular">
          <PopularPlatforms onSubscribe={onSubscribe} />
        </TabsContent>
        <TabsContent value="more">
          <MorePlatforms onSubscribe={onSubscribe} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default PlatformTabs;
