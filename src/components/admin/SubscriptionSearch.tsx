
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Service } from "@/types/subscription";

interface SubscriptionSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  serviceFilter: string;
  setServiceFilter: (service: string) => void;
  services: Service[];
}

const SubscriptionSearch: React.FC<SubscriptionSearchProps> = ({ 
  searchTerm, 
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  serviceFilter,
  setServiceFilter,
  services
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const resetFilters = () => {
    setStatusFilter('');
    setServiceFilter('');
    setSearchTerm('');
  };

  const hasActiveFilters = statusFilter || serviceFilter || searchTerm;

  return (
    <Card className="bg-graphik-grey border-graphik-light-grey mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center justify-between">
          <span>Recherche avancée</span>
          <div className="flex space-x-2">
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={resetFilters}
              >
                <X className="h-4 w-4 mr-1" />
                Réinitialiser
              </Button>
            )}
            <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`${statusFilter || serviceFilter ? 'border-graphik-blue text-graphik-blue' : 'border-graphik-light-grey text-gray-300'}`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres {(statusFilter || serviceFilter) ? `(${(statusFilter ? 1 : 0) + (serviceFilter ? 1 : 0)})` : ''}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-graphik-dark border-graphik-light-grey p-4">
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Filtres avancés</h4>
                  
                  <div>
                    <label className="text-xs text-gray-400">Statut</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="bg-graphik-grey border-graphik-light-grey text-white mt-1">
                        <SelectValue placeholder="Tous les statuts" />
                      </SelectTrigger>
                      <SelectContent className="bg-graphik-dark border-graphik-light-grey text-white">
                        <SelectItem value="">Tous les statuts</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="approved">Approuvé</SelectItem>
                        <SelectItem value="rejected">Rejeté</SelectItem>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="expired">Expiré</SelectItem>
                        <SelectItem value="suspended">Suspendu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-400">Service</label>
                    <Select value={serviceFilter} onValueChange={setServiceFilter}>
                      <SelectTrigger className="bg-graphik-grey border-graphik-light-grey text-white mt-1">
                        <SelectValue placeholder="Tous les services" />
                      </SelectTrigger>
                      <SelectContent className="bg-graphik-dark border-graphik-light-grey text-white max-h-60">
                        <SelectItem value="">Tous les services</SelectItem>
                        {services.map(service => (
                          <SelectItem key={service.id} value={service.name}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      className="bg-graphik-blue hover:bg-graphik-blue/80"
                      onClick={() => setIsFiltersOpen(false)}
                    >
                      Appliquer
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Filtrer les demandes par nom, email, service ou statut
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher un abonnement..."
            className="pl-10 bg-graphik-dark border-graphik-light-grey text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent text-gray-400"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {(statusFilter || serviceFilter) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {statusFilter && (
              <div className="bg-graphik-blue/20 text-graphik-blue px-2 py-1 rounded-full text-xs flex items-center">
                Statut: {statusFilter === 'pending' ? 'En attente' : 
                         statusFilter === 'approved' ? 'Approuvé' : 
                         statusFilter === 'rejected' ? 'Rejeté' : 
                         statusFilter === 'active' ? 'Actif' : 
                         statusFilter === 'expired' ? 'Expiré' : 'Suspendu'}
              </div>
            )}
            {serviceFilter && (
              <div className="bg-graphik-blue/20 text-graphik-blue px-2 py-1 rounded-full text-xs flex items-center">
                Service: {serviceFilter}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionSearch;
