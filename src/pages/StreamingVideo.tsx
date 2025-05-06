
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PlatformTabs from "@/components/streaming/PlatformTabs";
import ComparisonTable from "@/components/streaming/ComparisonTable";
import VideoFAQ from "@/components/streaming/VideoFAQ";
import { useNavigate } from "react-router-dom";

const StreamingVideo = () => {
  const navigate = useNavigate();

  const handleSubscribe = (platform: string) => {
    navigate("/subscribe", { state: { serviceType: platform } });
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="Streaming Vidéo"
          subtitle="Offres et abonnements"
          description="Accédez aux meilleures plateformes de streaming vidéo avec nos abonnements optimisés"
          backgroundImage="https://resize.prod.femina.ladmedia.fr/rblr/652,438/img/var/2020-06/plateformes-streaming.jpg"
        />

        <PlatformTabs onSubscribe={handleSubscribe} />
        <ComparisonTable />
        <VideoFAQ />
      </main>
      <Footer />
    </>
  );
};

export default StreamingVideo;
