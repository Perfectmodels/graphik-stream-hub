
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isUserMFASettings } from "@/types/supabase-extensions";

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres").optional()
});

export const useMFASettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [emailMFAEnabled, setEmailMFAEnabled] = useState(false);
  const [smsMFAEnabled, setSmsMFAEnabled] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return;
        }
        
        setUser(session.user);
        
        // Check if MFA is already enabled for this user
        const { data } = await supabase
          .from('user_mfa_settings')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        
        if (data && isUserMFASettings(data)) {
          setEmailMFAEnabled(data.email_mfa_enabled || false);
          setSmsMFAEnabled(data.sms_mfa_enabled || false);
          
          if (data.phone_number) {
            setUserPhoneNumber(data.phone_number);
            form.setValue('phoneNumber', data.phone_number);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error checking user:", error);
        navigate('/login');
      }
    };

    checkUser();
  }, [navigate, form]);

  const disableMFA = async (type: 'email' | 'sms') => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      let updateData = {};
      
      if (type === 'email') {
        updateData = {
          user_id: user.id,
          email_mfa_enabled: false,
          updated_at: new Date().toISOString(),
        };
      } else if (type === 'sms') {
        updateData = {
          user_id: user.id,
          sms_mfa_enabled: false,
          updated_at: new Date().toISOString(),
        };
      }
      
      const { error } = await supabase
        .from('user_mfa_settings')
        .update(updateData)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      if (type === 'email') {
        setEmailMFAEnabled(false);
      } else if (type === 'sms') {
        setSmsMFAEnabled(false);
      }
      
      toast({
        title: "MFA désactivé",
        description: type === 'email' 
          ? "La vérification par email a été désactivée pour votre compte" 
          : "La vérification par SMS a été désactivée pour votre compte",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de désactiver le MFA",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    emailMFAEnabled,
    setEmailMFAEnabled,
    smsMFAEnabled,
    setSmsMFAEnabled,
    userPhoneNumber,
    setUserPhoneNumber,
    form,
    disableMFA,
    navigate,
    toast
  };
};
