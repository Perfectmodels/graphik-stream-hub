
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Smartphone, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { isUserMFASettings, isMFAVerificationCode } from "@/types/supabase-extensions";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
});

const MFASetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationType, setVerificationType] = useState<'email' | 'sms'>('email');
  const [verificationCode, setVerificationCode] = useState("");
  const [emailMFAEnabled, setEmailMFAEnabled] = useState(false);
  const [smsMFAEnabled, setSmsMFAEnabled] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  
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
          setUserPhoneNumber(data.phone_number || "");
          
          if (data.phone_number) {
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
      
      setVerificationType('email');
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
      
      setVerificationType('sms');
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
        .eq('type', verificationType)
        .gt('expires_at', now)
        .single();
      
      if (error || !data || !isMFAVerificationCode(data)) {
        throw new Error("Code de vérification invalide ou expiré");
      }
      
      // Update user's MFA settings
      let updateData = {};
      
      if (verificationType === 'email') {
        updateData = {
          user_id: user.id,
          email_mfa_enabled: true,
          updated_at: new Date().toISOString(),
        };
        setEmailMFAEnabled(true);
      } else if (verificationType === 'sms') {
        updateData = {
          user_id: user.id,
          sms_mfa_enabled: true,
          phone_number: form.getValues().phoneNumber,
          updated_at: new Date().toISOString(),
        };
        setSmsMFAEnabled(true);
        setUserPhoneNumber(form.getValues().phoneNumber);
      }
      
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
      
      toast({
        title: "MFA activé",
        description: verificationType === 'email' 
          ? "La vérification par email a été activée pour votre compte" 
          : "La vérification par SMS a été activée pour votre compte",
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

  const disableMFA = async (type: 'email' | 'sms') => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      let updateData = {};
      
      if (type === 'email') {
        updateData = {
          email_mfa_enabled: false,
          updated_at: new Date().toISOString(),
        };
      } else if (type === 'sms') {
        updateData = {
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

  const onSubmitPhoneForm = async (values: z.infer<typeof phoneSchema>) => {
    await sendVerificationSMS(values.phoneNumber);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-graphik-dark">
        <p className="text-white">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-graphik-dark py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Sécurité du compte</h1>
          <p className="text-gray-400 mt-2">
            Configurez l'authentification à deux facteurs pour renforcer la sécurité de votre compte
          </p>
        </div>

        <div className="space-y-6">
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
                    disabled={loading || sending || (verificationSent && verificationType === 'email')}
                  />
                </div>
              </div>

              {verificationSent && verificationType === 'email' && (
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
                    disabled={loading || sending || (verificationSent && verificationType === 'sms')}
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

              {verificationSent && verificationType === 'sms' && (
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

          <Card className="bg-graphik-grey border-graphik-light-grey opacity-70">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 h-5 w-5 text-gray-500" />
                Application d'authentification
              </CardTitle>
              <CardDescription className="text-gray-400">
                Utilisez Google Authenticator, Authy ou une autre application TOTP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Bientôt disponible</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Cette fonctionnalité sera disponible prochainement
                  </p>
                </div>
                <div className="flex items-center">
                  <Switch disabled={true} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-graphik-light-grey text-white hover:bg-graphik-light-grey/10"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MFASetup;
