
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Mail, Smartphone, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const MFASetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailMFAEnabled, setEmailMFAEnabled] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

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
        const { data, error } = await supabase
          .from('user_mfa_settings')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        
        if (data) {
          setEmailMFAEnabled(data.email_mfa_enabled || false);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error checking user:", error);
        navigate('/login');
      }
    };

    checkUser();
  }, [navigate]);

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
        .upsert({
          user_id: user.id,
          code: code,
          type: 'email',
          expires_at: expiresAt.toISOString(),
        });
      
      if (error) throw error;
      
      // Send email with the code (in a real app, this would use an edge function)
      // For demo purposes, we'll just show the code in a toast
      toast({
        title: "Verification Code Sent",
        description: `For demo purposes, your code is: ${code}`,
      });
      
      setVerificationSent(true);
    } catch (error: any) {
      toast({
        title: "Error Sending Verification",
        description: error.message || "Something went wrong",
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
      
      if (error || !data) {
        throw new Error("Invalid or expired verification code");
      }
      
      // Update user's MFA settings
      const { error: updateError } = await supabase
        .from('user_mfa_settings')
        .upsert({
          user_id: user.id,
          email_mfa_enabled: true,
          updated_at: new Date().toISOString(),
        });
      
      if (updateError) throw updateError;
      
      // Delete the used verification code
      await supabase
        .from('mfa_verification_codes')
        .delete()
        .eq('id', data.id);
      
      setEmailMFAEnabled(true);
      setVerificationSent(false);
      setVerificationCode("");
      
      toast({
        title: "MFA Enabled",
        description: "Email verification has been enabled for your account",
      });
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Failed to verify the code",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  const disableEmailMFA = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('user_mfa_settings')
        .update({
          email_mfa_enabled: false,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setEmailMFAEnabled(false);
      
      toast({
        title: "MFA Disabled",
        description: "Email verification has been disabled for your account",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to disable MFA",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
                        disableEmailMFA();
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
                    <Label htmlFor="verification-code" className="text-white">
                      Code de vérification
                    </Label>
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

          <Card className="bg-graphik-grey border-graphik-light-grey opacity-70">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Smartphone className="mr-2 h-5 w-5 text-gray-500" />
                Vérification par SMS
              </CardTitle>
              <CardDescription className="text-gray-400">
                Recevez un code de vérification par SMS à chaque connexion
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
