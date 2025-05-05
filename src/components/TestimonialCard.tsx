
import React from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role?: string;
  content: string;
  rating?: number;
  avatar?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  rating = 5,
  avatar,
}) => {
  return (
    <Card className="bg-graphik-grey border border-graphik-light-grey p-6 shadow-lg h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-graphik-blue flex items-center justify-center">
            <span className="text-white text-lg font-bold">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h4 className="text-white font-medium">{name}</h4>
          {role && <p className="text-gray-400 text-sm">{role}</p>}
        </div>
      </div>

      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
            }`}
          />
        ))}
      </div>

      <p className="text-gray-300 italic flex-grow">{content}</p>
    </Card>
  );
};

export default TestimonialCard;
