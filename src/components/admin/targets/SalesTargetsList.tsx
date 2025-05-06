
import React, { useEffect, useState } from "react";
import { useSalesTargets } from "@/hooks/admin/useSalesTargets";
import SalesTargetCard from "./SalesTargetCard";
import { Button } from "@/components/ui/button";
import { Plus, RotateCcw } from "lucide-react";

interface SalesTargetsListProps {
  onAddTarget?: () => void;
}

const SalesTargetsList: React.FC<SalesTargetsListProps> = ({ onAddTarget }) => {
  const { loading, targets, fetchTargets } = useSalesTargets();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'expired'>('active');
  
  const filteredTargets = targets.filter(target => {
    const today = new Date();
    const endDate = new Date(target.end_date);
    const isExpired = endDate < today;
    const isCompleted = target.current_value >= target.target_value;
    
    switch (filter) {
      case 'active':
        return !isExpired && !isCompleted;
      case 'completed':
        return isCompleted;
      case 'expired':
        return isExpired && !isCompleted;
      default:
        return true;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-graphik-blue hover:bg-graphik-blue/80' : ''}
          >
            Tous
          </Button>
          <Button
            variant={filter === 'active' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'bg-graphik-blue hover:bg-graphik-blue/80' : ''}
          >
            En cours
          </Button>
          <Button
            variant={filter === 'completed' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'bg-graphik-blue hover:bg-graphik-blue/80' : ''}
          >
            Complétés
          </Button>
          <Button
            variant={filter === 'expired' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter('expired')}
            className={filter === 'expired' ? 'bg-graphik-blue hover:bg-graphik-blue/80' : ''}
          >
            Expirés
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchTargets()}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          {onAddTarget && (
            <Button
              variant="default"
              size="sm"
              onClick={onAddTarget}
              className="bg-graphik-purple hover:bg-graphik-purple/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvel objectif
            </Button>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-400">Chargement des objectifs...</p>
        </div>
      ) : filteredTargets.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTargets.map((target) => (
            <SalesTargetCard key={target.id} target={target} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed border-graphik-light-grey rounded-md">
          <p className="text-gray-400">Aucun objectif trouvé</p>
          {onAddTarget && (
            <Button
              variant="link"
              onClick={onAddTarget}
              className="text-graphik-blue hover:text-graphik-blue/80 mt-2"
            >
              Créer un nouvel objectif
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SalesTargetsList;
