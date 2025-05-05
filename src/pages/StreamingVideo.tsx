
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SubscriptionDialog from "@/components/SubscriptionDialog";
import PlatformTabs from "@/components/streaming/PlatformTabs";
import ComparisonTable from "@/components/streaming/ComparisonTable";
import VideoFAQ from "@/components/streaming/VideoFAQ";

const StreamingVideo = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const handleSubscribe = (platform: string) => {
    setSelectedPlatform(platform);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="Streaming Vidéo"
          subtitle="Offres et abonnements"
          description="Accédez aux meilleures plateformes de streaming vidéo avec nos abonnements optimisés"
          backgroundImage="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1600"
        />

        <PlatformTabs onSubscribe={handleSubscribe} />
        <ComparisonTable />
        <VideoFAQ />

        {/* Subscription Dialog */}
        <SubscriptionDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen}
          serviceType={selectedPlatform}
        />
      </main>
      <Footer />
    </>
  );
};

export default StreamingVideo;
