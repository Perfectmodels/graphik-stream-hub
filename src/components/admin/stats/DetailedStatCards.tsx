
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, CircleX, Clock, BadgeCheck, Pause, CalendarClock } from "lucide-react";

interface DetailedStatCardsProps {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  active: number;
  suspended: number;
  expired: number;
}

const DetailedStatCards: React.FC<DetailedStatCardsProps> = ({
  total,
  pending,
  approved,
  rejected,
  active,
  suspended,
  expired
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-graphik-grey border-graphik-light-grey">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg flex justify-between items-center">
            <span>Total des demandes</span>
            <span className="bg-graphik-blue/20 text-graphik-blue px-2 py-1 rounded text-sm">{total}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-gray-300 text-sm">En attente:</span>
            </div>
            <span className="text-amber-500">{pending}</span>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              <CircleCheck className="h-4 w-4 text-emerald-500 mr-2" />
              <span className="text-gray-300 text-sm">Approuvées:</span>
            </div>
            <span className="text-emerald-500">{approved}</span>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              <CircleX className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-gray-300 text-sm">Rejetées:</span>
            </div>
            <span className="text-red-500">{rejected}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-graphik-grey border-graphik-light-grey">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg flex justify-between items-center">
            <span>Abonnements actifs</span>
            <span className="bg-blue-500/20 text-blue-500 px-2 py-1 rounded text-sm">{active}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-400 mt-2">
            <p>Ces abonnements sont actuellement en cours et disponibles pour les clients.</p>
          </div>
          <div className="mt-4 pt-2 border-t border-graphik-light-grey/30">
            <div className="flex items-center">
              <BadgeCheck className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-gray-300 text-sm">Taux de conversion: {total > 0 ? Math.round((active / total) * 100) : 0}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-graphik-grey border-graphik-light-grey">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg flex justify-between items-center">
            <span>Abonnements suspendus</span>
            <span className="bg-purple-500/20 text-purple-500 px-2 py-1 rounded text-sm">{suspended}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-400 mt-2">
            <p>Ces abonnements ont été temporairement suspendus.</p>
          </div>
          <div className="mt-4 pt-2 border-t border-graphik-light-grey/30">
            <div className="flex items-center">
              <Pause className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-gray-300 text-sm">Pourcentage: {active > 0 ? Math.round((suspended / (active + suspended)) * 100) : 0}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-graphik-grey border-graphik-light-grey">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg flex justify-between items-center">
            <span>Abonnements expirés</span>
            <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-sm">{expired}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-400 mt-2">
            <p>Ces abonnements ont atteint leur date d'expiration.</p>
          </div>
          <div className="mt-4 pt-2 border-t border-graphik-light-grey/30">
            <div className="flex items-center">
              <CalendarClock className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-gray-300 text-sm">Taux de renouvellement à suivre</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedStatCards;
