
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryButtonText = "Découvrir les offres",
  primaryButtonLink = "/streaming-video",
  secondaryButtonText,
  secondaryButtonLink,
  backgroundImage,
}) => {
  const bgStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <div 
      className={`min-h-[70vh] flex items-center relative ${backgroundImage ? "bg-no-repeat bg-cover bg-center" : "hero-gradient"}`}
      style={bgStyle}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {subtitle && (
            <h2 className="text-graphik-blue uppercase tracking-wider mb-2 font-medium">
              {subtitle}
            </h2>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {primaryButtonText && (
              <Link to={primaryButtonLink}>
                <Button size="lg" className="bg-graphik-blue hover:bg-graphik-blue/80">
                  {primaryButtonText} <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            {secondaryButtonText && secondaryButtonLink && (
              <Link to={secondaryButtonLink}>
                <Button size="lg" variant="outline" className="border-graphik-blue text-white hover:bg-graphik-blue/20">
                  {secondaryButtonText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
