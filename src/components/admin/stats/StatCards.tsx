
import React from "react";
import StatCard from "./StatCard";
import DetailedStatCards from "./DetailedStatCards";
import { StatData } from "./useSubscriptionStats";

interface StatCardsProps {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  active: number;
  suspended: number;
  expired: number;
}

const StatCards: React.FC<Partial<StatData>> = ({
  total = 0,
  pending = 0,
  approved = 0,
  rejected = 0,
  active = 0,
  suspended = 0,
  expired = 0
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total abonnements" value={total} />
        <StatCard title="En attente" value={pending} color="text-amber-500" />
        <StatCard title="Approuvés" value={approved} color="text-green-500" />
        <StatCard title="Refusés" value={rejected} color="text-red-500" />
      </div>
      
      <div className="mt-6">
        <DetailedStatCards 
          total={total}
          pending={pending}
          approved={approved}
          rejected={rejected}
          active={active}
          suspended={suspended}
          expired={expired}
        />
      </div>
    </>
  );
};

export default StatCards;
