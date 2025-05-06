
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { isMFAVerificationCode } from "@/types/supabase-extensions";
import { useToast } from "@/hooks/use-toast";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface SmsMFACardProps {
  user: any;
  smsMFAEnabled: boolean;
  setSmsMFAEnabled: (value: boolean) => void;
  userPhoneNumber: string;
  setUserPhoneNumber: (value: string) => void;
  disableMFA: (type: 'email' | 'sms') => void;
  loading: boolean;
  form: UseFormReturn<{
    phoneNumber: string;
  }, any>;
}

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
});

const SmsMFACard: React.FC<SmsMFACardProps> = ({
  user,
  smsMFAEnabled,
  setSmsMFAEnabled,
  userPhoneNumber,
  setUserPhoneNumber,
  disableMFA,
  loading,
  form
}) => {
  const { toast } = useToast();
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const sendVerificationSMS = async (phoneNumber: string) => {
    if (!user?.id) return;
    
    try {
      setSending(true);
      
      // Generate a random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store the code in the database with an expiration time (10 minutes)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);
      
      const { error: dbError } = await supabase
        .from('mfa_verification_codes')
        .insert({
          user_id: user.id,
          code: code,
          type: 'sms',
          expires_at: expiresAt.toISOString(),
        });
      
      if (dbError) throw dbError;
      
      // Send SMS with the code using Twilio via our edge function
      const { error: smsError } = await supabase.functions.invoke('send-sms', {
        body: {
          phoneNumber: phoneNumber,
          message: `Votre code de vérification Graphik'Studio est : ${code}`,
        },
      });
      
      if (smsError) throw new Error("Erreur lors de l'envoi du SMS");
      
      toast({
        title: "Code de vérification envoyé",
        description: "Un SMS contenant votre code de vérification a été envoyé à votre téléphone",
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
        .eq('type', 'sms')
        .gt('expires_at', now)
        .single();
      
      if (error || !data || !isMFAVerificationCode(data)) {
        throw new Error("Code de vérification invalide ou expiré");
      }
      
      // Update user's MFA settings
      const updateData = {
        user_id: user.id,
        sms_mfa_enabled: true,
        phone_number: form.getValues().phoneNumber,
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
      setSmsMFAEnabled(true);
      setUserPhoneNumber(form.getValues().phoneNumber);
      
      toast({
        title: "MFA activé",
        description: "La vérification par SMS a été activée pour votre compte",
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

  const onSubmitPhoneForm = async (values: z.infer<typeof phoneSchema>) => {
    await sendVerificationSMS(values.phoneNumber);
  };

  return (
    <Card className="bg-graphik-grey border-graphik-light-grey">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Smartphone className="mr-2 h-5 w-5 text-graphik-blue" />
          Vérification par SMS
        </CardTitle>
        <CardDescription className="text-gray-400">
          Recevez un code de vérification par SMS à chaque connexion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white">
              {smsMFAEnabled ? "Activé" : "Désactivé"}
            </p>
            {userPhoneNumber && (
              <p className="text-sm text-gray-400 mt-1">
                Téléphone: {userPhoneNumber}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <Switch
              checked={smsMFAEnabled}
              onCheckedChange={() => {
                if (smsMFAEnabled) {
                  disableMFA('sms');
                } else {
                  // Just toggle the form on, don't send verification yet
                  setVerificationSent(false);
                }
              }}
              disabled={loading || sending || verificationSent}
            />
          </div>
        </div>

        {!smsMFAEnabled && !verificationSent && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitPhoneForm)} className="space-y-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Numéro de téléphone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+33612345678"
                        {...field}
                        className="bg-graphik-dark border-graphik-light-grey text-white"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      Entrez votre numéro au format international (ex: +33612345678)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit"
                className="bg-graphik-blue hover:bg-graphik-blue/90"
                disabled={sending}
              >
                {sending ? "Envoi..." : "Envoyer le code de vérification"}
              </Button>
            </form>
          </Form>
        )}

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
                onClick={() => sendVerificationSMS(form.getValues().phoneNumber)}
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

export default SmsMFACard;
