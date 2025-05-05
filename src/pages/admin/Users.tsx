
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, UserCog } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
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
        
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setUsers(data || []);
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
    
    fetchUsers();
  }, [navigate, toast]);

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.toLowerCase().includes(searchTerm)
  );

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <UserCog className="mr-2 h-6 w-6 text-graphik-blue" />
        Gestion des utilisateurs
      </h2>

      <Card className="bg-graphik-grey border-graphik-light-grey mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Rechercher</CardTitle>
          <CardDescription className="text-gray-400">
            Filtrer les utilisateurs par nom, email ou téléphone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un utilisateur..."
              className="pl-10 bg-graphik-dark border-graphik-light-grey text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-graphik-grey border-graphik-light-grey overflow-hidden">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Liste des utilisateurs</span>
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
                  <TableHead className="text-white">Nom complet</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Téléphone</TableHead>
                  <TableHead className="text-white">Adresse</TableHead>
                  <TableHead className="text-white">Inscription</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-graphik-light-grey hover:bg-graphik-light-grey/10">
                    <TableCell className="font-medium text-white">{user.full_name}</TableCell>
                    <TableCell className="text-gray-300">{user.email}</TableCell>
                    <TableCell className="text-gray-300">{user.phone || "Non renseigné"}</TableCell>
                    <TableCell className="text-gray-300">{user.address || "Non renseignée"}</TableCell>
                    <TableCell className="text-gray-300">
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-graphik-blue text-graphik-blue hover:bg-graphik-blue/20"
                        onClick={() => navigate(`/admin/users/${user.id}`)}
                      >
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-400">
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
