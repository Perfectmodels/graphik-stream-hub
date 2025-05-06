
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface UserSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6">
      <div className="bg-graphik-grey rounded-lg border border-graphik-light-grey p-4">
        <h3 className="text-white font-medium mb-2">Recherche utilisateur</h3>
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-graphik-dark border-graphik-light-grey text-white flex-1"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 hover:bg-transparent text-gray-400"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="mt-2 text-xs text-gray-400">
          Recherchez par nom, email ou numéro de téléphone
        </div>
      </div>
    </div>
  );
};

export default UserSearchBar;
