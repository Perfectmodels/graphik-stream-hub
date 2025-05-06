
import React from "react";
import { Input } from "@/components/ui/input";

interface UserSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6">
      <Input
        placeholder="Rechercher un utilisateur..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md bg-graphik-dark border-graphik-light-grey text-white"
      />
    </div>
  );
};

export default UserSearchBar;
