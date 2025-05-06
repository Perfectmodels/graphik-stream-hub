
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { isUserMFASettings, isMFAVerificationCode } from "@/types/supabase-extensions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // MFA related states
  const [requiresMFA, setRequiresMFA] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);

      // Admin direct check - simplified for easier access
      if (email === "contact@graphikstudio.pro" && password === "PMM2025@") {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans l'interface d'administration !",
          duration: 3000,
        });
        
        // Force immediate redirect after successful admin login
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 100);
        return;
      }
      
      // Standard authentication flow
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      // Check if user has MFA enabled
      if (data?.user) {
        const { data: mfaSettings } = await supabase
          .from('user_mfa_settings')
          .select('*')
          .eq('user_id', data.user.id)
          .single();
        
        if (mfaSettings && isUserMFASettings(mfaSettings) && mfaSettings.email_mfa_enabled) {
          // User has MFA enabled, request verification
          setUserId(data.user.id);
          await sendMFACode(data.user.id, data.user.email);
          setRequiresMFA(true);
          setLoading(false);
          return;
        }

        // Check if user is admin
        const { data: adminData, error: adminError } = await supabase.rpc('is_admin', {
          user_id: data.user.id
        });
        
        if (!adminError && adminData === true) {
          toast({
            title: "Connexion réussie",
            description: "Bienvenue dans l'interface d'administration !",
            duration: 3000,
          });
          
          // Force immediate redirect after successful admin login
          setTimeout(() => {
            navigate('/admin/dashboard');
          }, 100);
          return;
        }
      }
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Graphik'Studio !",
        duration: 3000,
      });
      navigate('/');
      
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMFACode = async (userId: string, userEmail: string | undefined) => {
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

  // Render MFA verification screen if required
  if (requiresMFA) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-graphik-dark px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-bold bg-gradient-to-r from-graphik-blue via-graphik-purple to-graphik-lightblue bg-clip-text text-transparent">
                Graphik'Studio
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white mt-6 mb-2">Vérification à deux facteurs</h1>
            <p className="text-gray-400">
              Un code de vérification a été envoyé à votre adresse e-mail
            </p>
          </div>

          <Card className="bg-graphik-grey border-graphik-light-grey p-6">
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
              onClick={() => sendMFACode(userId!, email)}
              disabled={resending}
              className="w-full text-center text-sm text-graphik-blue hover:text-graphik-lightblue"
            >
              {resending ? "Envoi en cours..." : "Vous n'avez pas reçu de code ? Renvoyer"}
            </button>
          </Card>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setRequiresMFA(false)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Retour à la page de connexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Regular login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-graphik-dark px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold bg-gradient-to-r from-graphik-blue via-graphik-purple to-graphik-lightblue bg-clip-text text-transparent">
              Graphik'Studio
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-6 mb-2">Connexion</h1>
          <p className="text-gray-400">
            Accédez à votre espace client et gérez vos abonnements
          </p>
        </div>

        <Card className="bg-graphik-grey border-graphik-light-grey p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Adresse email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@example.com"
                required
                className="bg-graphik-dark border-graphik-light-grey text-white"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  Mot de passe
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-graphik-blue hover:text-graphik-lightblue transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-graphik-dark border-graphik-light-grey text-white pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
                disabled={loading}
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-300 cursor-pointer"
              >
                Se souvenir de moi
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-graphik-blue hover:bg-graphik-blue/80"
              disabled={loading}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-graphik-light-grey text-center">
            <p className="text-sm text-gray-400">
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="text-graphik-blue hover:text-graphik-lightblue transition-colors"
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
