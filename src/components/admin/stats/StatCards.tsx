
import React from "react";
import StatCard from "./StatCard";

interface StatCardsProps {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

const StatCards: React.FC<StatCardsProps> = ({
  total,
  pending,
  approved,
  rejected
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard title="Total abonnements" value={total} />
      <StatCard title="En attente" value={pending} color="text-amber-500" />
      <StatCard title="Approuvés" value={approved} color="text-green-500" />
      <StatCard title="Refusés" value={rejected} color="text-red-500" />
    </div>
  );
};

export default StatCards;
