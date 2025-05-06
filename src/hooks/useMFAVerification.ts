
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UseMFAVerificationProps {
  userId: string;
  userEmail: string;
  onBack: () => void;
}

export const useMFAVerification = ({ userId, userEmail, onBack }: UseMFAVerificationProps) => {
  const [mfaCode, setMfaCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [activeMethod, setActiveMethod] = useState<"email" | "sms">("email");
  const [userPhoneNumber, setUserPhoneNumber] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user has SMS MFA enabled
  useEffect(() => {
    const checkMFASettings = async () => {
      if (!userId) return;
      
      try {
        const { data } = await supabase
          .from('user_mfa_settings')
          .select('*')
          .eq('user_id', userId)
          .single();
        
        if (data && data.sms_mfa_enabled && data.phone_number) {
          setUserPhoneNumber(data.phone_number);
        }
      } catch (error) {
        console.error("Error checking MFA settings:", error);
      }
    };
    
    checkMFASettings();
  }, [userId]);

  // Initial code send for email MFA
  useEffect(() => {
    if (userId && userEmail) {
      sendMFACode("email");
    }
  }, [userId, userEmail]);

  const sendMFACode = async (method: "email" | "sms" = "email") => {
    if (!userId) return;
    
    try {
      setResending(true);
      setActiveMethod(method);
      
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
          type: method,
          expires_at: expiresAt.toISOString(),
        });
      
      if (error) throw error;
      
      if (method === "email") {
        // Send email with the code (in a real app, this would use an edge function)
        // For demo purposes, we'll just show the code in a toast
        toast({
          title: "Code de vérification envoyé",
          description: `À des fins de démonstration, votre code est : ${code}`,
        });
      } else if (method === "sms" && userPhoneNumber) {
        // Send SMS with the code using the edge function
        const { error: smsError } = await supabase.functions.invoke('send-sms', {
          body: {
            phoneNumber: userPhoneNumber,
            message: `Votre code de vérification Graphik'Studio est : ${code}`,
          },
        });
        
        if (smsError) {
          throw new Error("Erreur lors de l'envoi du SMS");
        }
        
        toast({
          title: "Code de vérification envoyé",
          description: "Un SMS contenant votre code a été envoyé à votre téléphone",
        });
      }
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
        .eq('type', activeMethod)
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

  return {
    mfaCode,
    setMfaCode,
    verifying,
    resending,
    activeMethod,
    setActiveMethod,
    userPhoneNumber,
    sendMFACode,
    verifyMFACode
  };
};

// Type guard for verification codes
const isMFAVerificationCode = (obj: any): obj is { id: string } => {
  return obj && typeof obj.id === 'string';
};
