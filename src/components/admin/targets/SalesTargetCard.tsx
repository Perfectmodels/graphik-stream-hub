
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown } from "lucide-react";
import { SalesTarget } from "@/hooks/admin/useSalesTargets";

interface SalesTargetCardProps {
  target: SalesTarget;
}

const SalesTargetCard: React.FC<SalesTargetCardProps> = ({ target }) => {
  const progressPercentage = Math.min(Math.round((target.current_value / target.target_value) * 100), 100);
  const isCompleted = progressPercentage >= 100;
  const formattedStartDate = new Date(target.start_date).toLocaleDateString('fr-FR');
  const formattedEndDate = new Date(target.end_date).toLocaleDateString('fr-FR');
  
  const getRemainingDays = () => {
    const today = new Date();
    const endDate = new Date(target.end_date);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const remainingDays = getRemainingDays();
  const isExpired = remainingDays < 0;

  return (
    <Card className={`${isCompleted ? 'bg-green-900/20' : isExpired ? 'bg-red-900/20' : 'bg-graphik-grey'} border-graphik-light-grey`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-lg flex items-center justify-between">
          <span>{target.target_name}</span>
          <span className={`text-sm font-normal px-2 py-1 rounded ${
            isExpired ? 'bg-red-500/20 text-red-500' : 
            remainingDays <= 7 ? 'bg-amber-500/20 text-amber-500' :
            'bg-blue-500/20 text-blue-400'
          }`}>
            {isExpired 
              ? 'Expiré' 
              : `${remainingDays} jour${remainingDays > 1 ? 's' : ''} restant${remainingDays > 1 ? 's' : ''}`
            }
          </span>
        </CardTitle>
        {target.target_description && (
          <p className="text-sm text-gray-300">{target.target_description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Objectif: {target.target_value.toLocaleString('fr-FR')}</span>
            <span className="text-gray-300 text-sm">Période: {formattedStartDate} - {formattedEndDate}</span>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex items-center justify-between mt-2">
            <div className="text-sm text-gray-300">
              Progression: {progressPercentage}%
            </div>
            <div className="flex items-center">
              <span className={`text-base font-medium ${isCompleted ? 'text-green-500' : 'text-white'}`}>
                {target.current_value.toLocaleString('fr-FR')}
              </span>
              <span className="text-sm mx-2 text-gray-400">/</span>
              <span className="text-sm text-gray-400">{target.target_value.toLocaleString('fr-FR')}</span>
              {isCompleted ? (
                <ArrowUp className="ml-2 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="ml-2 h-4 w-4 text-amber-500" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesTargetCard;
