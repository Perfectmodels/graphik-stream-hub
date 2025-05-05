
import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  alignment?: "left" | "center" | "right";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  alignment = "center",
}) => {
  const textAlign = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`max-w-3xl mx-auto mb-12 ${textAlign[alignment]}`}>
      {subtitle && (
        <h3 className="text-graphik-blue uppercase tracking-wider mb-2 font-medium">
          {subtitle}
        </h3>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
        {title}
      </h2>
      {description && (
        <p className="text-gray-300 text-lg md:text-xl">{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;
