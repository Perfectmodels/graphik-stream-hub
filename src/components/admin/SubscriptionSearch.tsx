
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SubscriptionSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SubscriptionSearch: React.FC<SubscriptionSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <Card className="bg-graphik-grey border-graphik-light-grey mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Rechercher</CardTitle>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionSearch;
