
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MFAVerificationFormProps {
  userId: string;
  userEmail: string;
  onBack: () => void;
}

const MFAVerificationForm: React.FC<MFAVerificationFormProps> = ({ 
  userId, 
  userEmail,
  onBack
}) => {
  const [mfaCode, setMfaCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const sendMFACode = async () => {
    if (!userId || !userEmail) return;
    
    try {
      setResending(true);
      
      // Generate a random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store the code in the database with an expiration time (10 minutes)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);
      
      const { error } = await supabase
        .from('mfa_verification_codes')
        .insert({
          user_id: userId,
          code: code,
          type: 'email',
          expires_at: expiresAt.toISOString(),
        });
      
      if (error) throw error;
      
      // Send email with the code (in a real app, this would use an edge function)
      // For demo purposes, we'll just show the code in a toast
      toast({
        title: "Code de vérification envoyé",
        description: `À des fins de démonstration, votre code est : ${code}`,
      });
    } catch (error: any) {
      toast({
        title: "Erreur d'envoi",
        description: error.message || "Impossible d'envoyer le code de vérification",
        variant: "destructive",
      });
    } finally {
      setResending(false);
    }
  };

  const verifyMFACode = async () => {
    if (!userId || !mfaCode) return;
    
    try {
      setVerifying(true);
      
      // Check if the verification code is valid
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('mfa_verification_codes')
        .select('*')
        .eq('user_id', userId)
        .eq('code', mfaCode)
        .eq('type', 'email')
        .gt('expires_at', now)
        .single();
      
      if (error || !data || !isMFAVerificationCode(data)) {
        throw new Error("Code de vérification invalide ou expiré");
      }
      
      // Delete the used verification code
      await supabase
        .from('mfa_verification_codes')
        .delete()
        .eq('id', data.id);
      
      // Check if user is admin
      const { data: adminData, error: adminError } = await supabase.rpc('is_admin', {
        user_id: userId
      });
      
      if (!adminError && adminData === true) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans l'interface d'administration !",
          duration: 3000,
        });
        navigate('/admin/dashboard');
        return;
      }
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Graphik'Studio !",
        duration: 3000,
      });
      navigate('/');
      
    } catch (error: any) {
      toast({
        title: "Erreur de vérification",
        description: error.message || "Impossible de vérifier le code",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center text-graphik-blue mb-6">
        <Mail className="h-16 w-16" />
      </div>
      
      <p className="text-center text-white mb-6">
        Veuillez saisir le code à 6 chiffres envoyé à votre adresse e-mail
      </p>
      
      <div className="mb-6">
        <InputOTP
          maxLength={6}
          value={mfaCode}
          onChange={setMfaCode}
          render={({ slots }) => (
            <InputOTPGroup className="justify-center">
              {slots.map((slot, index) => (
                <InputOTPSlot 
                  key={index} 
                  index={index} 
                  className="bg-graphik-dark border-graphik-light-grey text-white w-12 h-12 text-xl"
                />
              ))}
            </InputOTPGroup>
          )}
        />
      </div>
      
      <Button
        onClick={verifyMFACode}
        disabled={mfaCode.length !== 6 || verifying}
        className="w-full bg-graphik-blue hover:bg-graphik-blue/80 mb-4"
      >
        {verifying ? "Vérification..." : "Vérifier"}
      </Button>
      
      <button
        type="button"
        onClick={sendMFACode}
        disabled={resending}
        className="w-full text-center text-sm text-graphik-blue hover:text-graphik-lightblue"
      >
        {resending ? "Envoi en cours..." : "Vous n'avez pas reçu de code ? Renvoyer"}
      </button>
    </div>
  );
};

// Type guard for verification codes
const isMFAVerificationCode = (obj: any): obj is { id: number } => {
  return obj && typeof obj.id === 'number';
};

export default MFAVerificationForm;
