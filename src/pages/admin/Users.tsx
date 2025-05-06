
import React, { useEffect, useState } from "react";
import { Users as UsersIcon } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import UserSearchBar from "@/components/admin/users/UserSearchBar";
import UsersTable from "@/components/admin/users/UsersTable";
import { useUsers } from "@/hooks/useUsers";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const AdminUsers = () => {
  const { users, loading, fetchUsers } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(searchLower) || 
      user.email?.toLowerCase().includes(searchLower) || 
      (user.phone && user.phone.toLowerCase().includes(searchLower))
    );
  });

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <UsersIcon className="mr-2 h-6 w-6 text-graphik-purple" />
        Gestion des utilisateurs
      </h2>

      <UserSearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <Card className="bg-graphik-grey border-graphik-light-grey overflow-hidden">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Liste des utilisateurs</span>
            <span className="text-sm font-normal bg-graphik-blue/20 text-graphik-blue px-2 py-1 rounded">
              {filteredUsers.length} utilisateur(s)
            </span>
          </CardTitle>
        </CardHeader>
        <UsersTable 
          users={filteredUsers}
          loading={loading}
          searchTerm={searchTerm}
        />
      </Card>
    </AdminLayout>
  );
};

export default AdminUsers;
