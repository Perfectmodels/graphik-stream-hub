
import React, { useState } from "react";
import { Users as UsersIcon } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import UserSearchBar from "@/components/admin/users/UserSearchBar";
import UsersTable from "@/components/admin/users/UsersTable";
import { useUsers } from "@/hooks/useUsers";

const AdminUsers = () => {
  const { users, loading } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

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

      <UsersTable 
        users={users}
        loading={loading}
        searchTerm={searchTerm}
      />
    </AdminLayout>
  );
};

export default AdminUsers;
