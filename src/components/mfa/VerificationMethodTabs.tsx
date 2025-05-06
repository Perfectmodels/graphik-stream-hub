
import React from "react";
import { Mail, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VerificationMethodTabsProps {
  activeMethod: "email" | "sms";
  onMethodChange: (value: "email" | "sms") => void;
  userPhoneNumber: string | null;
}

const VerificationMethodTabs: React.FC<VerificationMethodTabsProps> = ({ 
  activeMethod, 
  onMethodChange,
  userPhoneNumber
}) => {
  return (
    <Tabs 
      defaultValue={activeMethod} 
      onValueChange={(value) => onMethodChange(value as "email" | "sms")}
    >
      <TabsList className="grid grid-cols-2 mb-6 bg-graphik-dark">
        <TabsTrigger 
          value="email" 
          className="data-[state=active]:bg-graphik-blue"
        >
          <Mail className="mr-2 h-4 w-4" />
          Email
        </TabsTrigger>
        <TabsTrigger 
          value="sms" 
          disabled={!userPhoneNumber} 
          className="data-[state=active]:bg-graphik-blue"
        >
          <Smartphone className="mr-2 h-4 w-4" />
          SMS
        </TabsTrigger>
      </TabsList>

      <TabsContent value="email">
        <div className="flex items-center justify-center text-graphik-blue mb-6">
          <Mail className="h-16 w-16" />
        </div>
        <p className="text-center text-white mb-6">
          Veuillez saisir le code à 6 chiffres envoyé à votre adresse e-mail
        </p>
      </TabsContent>

      <TabsContent value="sms">
        <div className="flex items-center justify-center text-graphik-blue mb-6">
          <Smartphone className="h-16 w-16" />
        </div>
        <p className="text-center text-white mb-6">
          Veuillez saisir le code à 6 chiffres envoyé à votre téléphone
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default VerificationMethodTabs;
