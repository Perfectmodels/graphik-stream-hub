
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/types/user";

interface UsersTableProps {
  users: UserProfile[];
  loading: boolean;
  searchTerm: string;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, loading, searchTerm }) => {
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-graphik-grey border-graphik-light-grey overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span>Utilisateurs</span>
          <span className="text-sm font-normal bg-graphik-blue/20 text-graphik-blue px-2 py-1 rounded">
            {filteredUsers.length} utilisateur(s)
          </span>
        </CardTitle>
      </CardHeader>
      
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Chargement des utilisateurs...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                <TableHead className="text-white">Nom</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Téléphone</TableHead>
                <TableHead className="text-white">Adresse</TableHead>
                <TableHead className="text-white">Date d'inscription</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                  <TableCell className="font-medium text-white">{user.full_name}</TableCell>
                  <TableCell className="text-gray-300">{user.email}</TableCell>
                  <TableCell className="text-gray-300">{user.phone || '-'}</TableCell>
                  <TableCell className="text-gray-300">{user.address || '-'}</TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                    {searchTerm ? "Aucun utilisateur ne correspond à votre recherche" : "Aucun utilisateur trouvé"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </Card>
  );
};

export default UsersTable;
