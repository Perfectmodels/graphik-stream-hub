
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Save, X } from "lucide-react";
import { toast } from "sonner";
import { fetchServicePrices, updateServicePrice, ServicePrice } from "@/utils/serviceUtils";

const ServicePricingTable = () => {
  const [prices, setPrices] = useState<ServicePrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  useEffect(() => {
    loadPrices();
  }, []);

  const loadPrices = async () => {
    setLoading(true);
    const data = await fetchServicePrices();
    setPrices(data);
    setLoading(false);
  };

  const handleEdit = (price: ServicePrice) => {
    setEditingId(price.id);
    setEditValue(price.price);
  };

  const handleSave = async (id: number) => {
    try {
      const success = await updateServicePrice(id, editValue);
      
      if (success) {
        toast.success("Prix mis à jour avec succès");
        setEditingId(null);
        loadPrices();
      } else {
        throw new Error("La mise à jour a échoué");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du prix:", error);
      toast.error("Erreur lors de la mise à jour du prix");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const getUniqueServices = (): string[] => {
    const services = new Set<string>();
    prices.forEach(price => services.add(price.service_type));
    return Array.from(services);
  };

  const getDurations = (): number[] => {
    const durations = new Set<number>();
    prices.forEach(price => durations.add(price.duration_months));
    return Array.from(durations).sort((a, b) => a - b);
  };

  const renderPriceCell = (service: string, duration: number) => {
    const price = prices.find(p => p.service_type === service && p.duration_months === duration);
    
    if (!price) return <TableCell className="text-center">-</TableCell>;
    
    return (
      <TableCell className="text-center">
        {editingId === price.id ? (
          <div className="flex items-center space-x-2">
            <Input 
              type="number" 
              value={editValue} 
              onChange={(e) => setEditValue(Number(e.target.value))}
              className="w-24 text-center"
            />
            <Button size="icon" variant="ghost" onClick={() => handleSave(price.id)}>
              <Save className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span>{price.price.toLocaleString()} FCFA</span>
            <Button size="icon" variant="ghost" onClick={() => handleEdit(price)}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        )}
      </TableCell>
    );
  };

  const services = getUniqueServices();
  const durations = getDurations();

  if (loading) {
    return <div>Chargement des prix...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarifs des services</CardTitle>
        <CardDescription>Gérez les prix des différents services par durée d'abonnement</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Tableau des tarifs par service et durée</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Service</TableHead>
              {durations.map(duration => (
                <TableHead key={duration} className="text-center">
                  {duration} {duration === 1 ? "mois" : "mois"}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map(service => (
              <TableRow key={service}>
                <TableCell className="font-medium">{service}</TableCell>
                {durations.map(duration => (
                  renderPriceCell(service, duration)
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ServicePricingTable;
