
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface UserSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6 relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher un utilisateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 max-w-md bg-graphik-grey border-graphik-light-grey text-white"
        />
      </div>
    </div>
  );
};

export default UserSearchBar;
