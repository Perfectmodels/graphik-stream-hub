
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return (
    <div className="service-card card-gradient-hover">
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <Link to={link}>
          <Button variant="secondary" className="w-full bg-graphik-purple hover:bg-graphik-violet">
            Découvrir
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
