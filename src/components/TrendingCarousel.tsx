
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious
} from "@/components/ui/carousel";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TrendingItem {
  title: string;
  platform: string;
  image: string;
  description: string;
  type: 'series' | 'movie' | 'music' | 'game';
  link?: string;
}

interface TrendingCarouselProps {
  title: string;
  items: TrendingItem[];
}

const TrendingCarousel: React.FC<TrendingCarouselProps> = ({ title, items }) => {
  return (
    <div className="my-12">
      <div className="flex items-center mb-6 gap-2">
        <TrendingUp className="text-graphik-blue h-6 w-6" />
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      
      <div className="relative px-12">
        <Carousel className="w-full">
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="relative h-64 bg-graphik-grey rounded-xl overflow-hidden group card-gradient-hover">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center justify-between mb-1">
                      <span className="bg-graphik-blue px-2 py-0.5 text-xs rounded-full">
                        {item.platform}
                      </span>
                      <span className="bg-graphik-purple/60 px-2 py-0.5 text-xs rounded-full uppercase">
                        {item.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <Link to={item.link || "#"}>
                      <Button className="bg-graphik-blue hover:bg-graphik-blue/80 w-full">
                        Découvrir
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 text-white border-graphik-light-grey hover:bg-graphik-blue/20 hover:text-white" />
          <CarouselNext className="absolute right-0 text-white border-graphik-light-grey hover:bg-graphik-blue/20 hover:text-white" />
        </Carousel>
      </div>
    </div>
  );
};

export default TrendingCarousel;
