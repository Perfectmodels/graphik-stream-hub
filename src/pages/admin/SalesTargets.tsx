
import React, { useState } from "react";
import { Target, Plus } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import SalesTargetsList from "@/components/admin/targets/SalesTargetsList";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSalesTargets, SalesTarget } from "@/hooks/admin/useSalesTargets";
import { useToast } from "@/hooks/use-toast";

const AdminSalesTargets = () => {
  const { createTarget } = useSalesTargets();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    target_name: '',
    target_description: '',
    target_value: '',
    current_value: '0',
    target_period: 'monthly',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.target_name || !formData.target_value || !formData.start_date || !formData.end_date) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }
    
    const target: Omit<SalesTarget, 'id' | 'created_at' | 'updated_at'> = {
      target_name: formData.target_name,
      target_description: formData.target_description || undefined,
      target_value: Number(formData.target_value),
      current_value: Number(formData.current_value),
      target_period: formData.target_period as any,
      start_date: formData.start_date,
      end_date: formData.end_date
    };
    
    const result = await createTarget(target);
    
    if (result) {
      setIsDialogOpen(false);
      setFormData({
        target_name: '',
        target_description: '',
        target_value: '',
        current_value: '0',
        target_period: 'monthly',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
      });
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Target className="mr-2 h-6 w-6 text-graphik-purple" />
        Objectifs de vente
      </h2>

      <SalesTargetsList onAddTarget={() => setIsDialogOpen(true)} />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-graphik-grey border-graphik-light-grey text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Créer un nouvel objectif</DialogTitle>
            <DialogDescription className="text-gray-400">
              Définissez un nouvel objectif commercial pour votre équipe
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target_name">Nom de l'objectif</Label>
              <Input
                id="target_name"
                name="target_name"
                value={formData.target_name}
                onChange={handleInputChange}
                placeholder="ex: Ventes mensuelles de NetflixCGI"
                className="bg-graphik-light-grey/20 border-graphik-light-grey"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target_description">Description (optionnel)</Label>
              <Textarea
                id="target_description"
                name="target_description"
                value={formData.target_description}
                onChange={handleInputChange}
                placeholder="Description détaillée de l'objectif"
                className="bg-graphik-light-grey/20 border-graphik-light-grey"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target_value">Valeur cible</Label>
                <Input
                  id="target_value"
                  name="target_value"
                  type="number"
                  value={formData.target_value}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="ex: 10000"
                  className="bg-graphik-light-grey/20 border-graphik-light-grey"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current_value">Valeur actuelle</Label>
                <Input
                  id="current_value"
                  name="current_value"
                  type="number"
                  value={formData.current_value}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="ex: 0"
                  className="bg-graphik-light-grey/20 border-graphik-light-grey"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target_period">Période</Label>
              <select
                id="target_period"
                name="target_period"
                value={formData.target_period}
                onChange={handleInputChange}
                className="w-full bg-graphik-light-grey/20 border-graphik-light-grey rounded-md p-2"
              >
                <option value="daily">Journalier</option>
                <option value="weekly">Hebdomadaire</option>
                <option value="monthly">Mensuel</option>
                <option value="quarterly">Trimestriel</option>
                <option value="yearly">Annuel</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Date de début</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="bg-graphik-light-grey/20 border-graphik-light-grey"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">Date de fin</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className="bg-graphik-light-grey/20 border-graphik-light-grey"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-graphik-blue hover:bg-graphik-blue/80">
                <Plus className="h-4 w-4 mr-2" />
                Créer l'objectif
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminSalesTargets;
