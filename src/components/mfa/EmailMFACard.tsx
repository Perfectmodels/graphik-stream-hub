
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Switch } from "@/components/ui/switch";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { isMFAVerificationCode } from "@/types/supabase-extensions";
import { useToast } from "@/hooks/use-toast";

interface EmailMFACardProps {
  user: any;
  emailMFAEnabled: boolean;
  setEmailMFAEnabled: (value: boolean) => void;
  disableMFA: (type: 'email' | 'sms') => void;
  loading: boolean;
}

const EmailMFACard: React.FC<EmailMFACardProps> = ({
  user,
  emailMFAEnabled,
  setEmailMFAEnabled,
  disableMFA,
  loading
}) => {
  const { toast } = useToast();
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const sendVerificationEmail = async () => {
    if (!user?.email) return;
    
    try {
      setSending(true);
      
      // Generate a random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store the code in the database with an expiration time (10 minutes)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);
      
      const { error } = await supabase
        .from('mfa_verification_codes')
        .insert({
          user_id: user.id,
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
      
      setVerificationSent(true);
    } catch (error: any) {
      toast({
        title: "Erreur d'envoi",
        description: error.message || "Impossible d'envoyer le code de vérification",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const verifyCode = async () => {
    if (!user?.id || !verificationCode) return;
    
    try {
      setVerifying(true);
      
      // Check if the verification code is valid
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('mfa_verification_codes')
        .select('*')
        .eq('user_id', user.id)
        .eq('code', verificationCode)
        .eq('type', 'email')
        .gt('expires_at', now)
        .single();
      
      if (error || !data || !isMFAVerificationCode(data)) {
        throw new Error("Code de vérification invalide ou expiré");
      }
      
      // Update user's MFA settings
      const updateData = {
        user_id: user.id,
        email_mfa_enabled: true,
        updated_at: new Date().toISOString(),
      };
      
      const { error: updateError } = await supabase
        .from('user_mfa_settings')
        .upsert(updateData);
      
      if (updateError) throw updateError;
      
      // Delete the used verification code
      await supabase
        .from('mfa_verification_codes')
        .delete()
        .eq('id', data.id);
      
      setVerificationSent(false);
      setVerificationCode("");
      setEmailMFAEnabled(true);
      
      toast({
        title: "MFA activé",
        description: "La vérification par email a été activée pour votre compte",
      });
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
    <Card className="bg-graphik-grey border-graphik-light-grey">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Mail className="mr-2 h-5 w-5 text-graphik-blue" />
          Vérification par email
        </CardTitle>
        <CardDescription className="text-gray-400">
          Recevez un code de vérification par email à chaque connexion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white">
              {emailMFAEnabled ? "Activé" : "Désactivé"}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Email: {user?.email}
            </p>
          </div>
          <div className="flex items-center">
            <Switch
              checked={emailMFAEnabled}
              onCheckedChange={() => {
                if (emailMFAEnabled) {
                  disableMFA('email');
                } else {
                  sendVerificationEmail();
                }
              }}
              disabled={loading || sending || verificationSent}
            />
          </div>
        </div>

        {verificationSent && (
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="verification-code" className="text-white">
                Code de vérification
              </label>
              <div className="mt-2">
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={setVerificationCode}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot 
                          key={index} 
                          index={index} 
                          className="bg-graphik-dark border-graphik-light-grey text-white"
                        />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={verifyCode}
                disabled={verificationCode.length !== 6 || verifying}
                className="bg-graphik-blue hover:bg-graphik-blue/90"
              >
                {verifying ? "Vérification..." : "Vérifier"}
              </Button>
              <Button
                variant="outline"
                onClick={sendVerificationEmail}
                disabled={sending}
                className="border-graphik-light-grey text-white hover:bg-graphik-light-grey/10"
              >
                {sending ? "Envoi..." : "Renvoyer le code"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailMFACard;
