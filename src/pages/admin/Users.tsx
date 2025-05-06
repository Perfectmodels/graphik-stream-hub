
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Users as UsersIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  created_at: string;
}

const AdminUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        navigate("/login");
        return;
      }
      
      const { data: adminData, error: adminError } = await supabase.rpc('is_admin', {
        user_id: session.session.user.id
      });
      
      if (adminError || adminData !== true) {
        toast({
          title: "Accès non autorisé",
          description: "Vous n'avez pas les droits d'administrateur",
          variant: "destructive",
        });
        navigate("/");
        return;
      }
      
      // Récupérer les profils utilisateurs depuis les demandes d'abonnement
      const { data: subscriptions, error: subError } = await supabase
        .from('subscription_requests')
        .select('id, full_name, email, phone, address, created_at')
        .order('created_at', { ascending: false });
        
      if (subError) throw subError;
      
      if (subscriptions) {
        // Convertir les données des abonnements en profils d'utilisateurs uniques
        const uniqueUsers: Record<string, UserProfile> = {};
        
        subscriptions.forEach(sub => {
          // Utiliser l'email comme clé unique
          if (!uniqueUsers[sub.email]) {
            uniqueUsers[sub.email] = {
              id: sub.id.toString(),
              full_name: sub.full_name,
              email: sub.email,
              phone: sub.phone,
              address: sub.address || '',
              created_at: sub.created_at
            };
          }
        });
        
        setUsers(Object.values(uniqueUsers));
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des utilisateurs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtre les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <UsersIcon className="mr-2 h-6 w-6 text-graphik-purple" />
        Gestion des utilisateurs
      </h2>

      <div className="mb-6">
        <Input
          placeholder="Rechercher un utilisateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md bg-graphik-dark border-graphik-light-grey text-white"
        />
      </div>

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
    </AdminLayout>
  );
};

export default AdminUsers;
