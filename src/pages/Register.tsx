
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMFADialog, setShowMFADialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions d'utilisation.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      // Inscription avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`
          }
        }
      });

      if (authError) throw authError;

      // Création du profil utilisateur
      if (authData.user) {
        const { error: profileError } = await supabase.from('user_profiles').insert({
          id: authData.user.id,
          full_name: `${firstName} ${lastName}`,
          email: email,
        });

        if (profileError) console.error("Erreur lors de la création du profil:", profileError);
        
        // Create default MFA settings (disabled by default)
        await supabase.from('user_mfa_settings').insert({
          user_id: authData.user.id,
          email_mfa_enabled: false,
        });
      }

      toast({
        title: "Inscription réussie",
        description: "Bienvenue sur Graphik'Studio !",
        duration: 3000,
      });

      // Show MFA setup dialog
      setShowMFADialog(true);
      
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-graphik-dark px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold bg-gradient-to-r from-graphik-blue via-graphik-purple to-graphik-lightblue bg-clip-text text-transparent">
              Graphik'Studio
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-6 mb-2">Créer un compte</h1>
          <p className="text-gray-400">
            Rejoignez-nous et accédez au meilleur du divertissement
          </p>
        </div>

        <Card className="bg-graphik-grey border-graphik-light-grey p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-white">
                  Prénom
                </label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Prénom"
                  required
                  className="bg-graphik-dark border-graphik-light-grey text-white"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-white">
                  Nom
                </label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Nom"
                  required
                  className="bg-graphik-dark border-graphik-light-grey text-white"
                  disabled={loading}
                />
              </div>
            </div>

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
              <label htmlFor="password" className="text-sm font-medium text-white">
                Mot de passe
              </label>
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
              <p className="text-xs text-gray-400">
                Le mot de passe doit contenir au moins 8 caractères
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-graphik-dark border-graphik-light-grey text-white pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2 mt-6">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                className="mt-1"
                disabled={loading}
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-300"
              >
                J'accepte les{" "}
                <Link
                  to="/terms"
                  className="text-graphik-blue hover:text-graphik-lightblue transition-colors"
                >
                  conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link
                  to="/privacy"
                  className="text-graphik-blue hover:text-graphik-lightblue transition-colors"
                >
                  politique de confidentialité
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-graphik-blue hover:bg-graphik-blue/80"
              disabled={loading}
            >
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-graphik-light-grey text-center">
            <p className="text-sm text-gray-400">
              Déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-graphik-blue hover:text-graphik-lightblue transition-colors"
              >
                Se connecter
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

      {/* MFA Setup Dialog */}
      <Dialog open={showMFADialog} onOpenChange={setShowMFADialog}>
        <DialogContent className="bg-graphik-grey border-graphik-light-grey text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-graphik-blue" />
              Sécurisez votre compte
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Activez l'authentification à deux facteurs pour une sécurité renforcée
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-white mb-4">
              L'authentification à deux facteurs (A2F) ajoute une couche de sécurité supplémentaire à votre compte en demandant une vérification supplémentaire lorsque vous vous connectez.
            </p>
            <p className="text-gray-400">
              Souhaitez-vous configurer l'authentification à deux facteurs maintenant ?
            </p>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowMFADialog(false);
                navigate('/login');
              }}
              className="border-graphik-light-grey text-white hover:bg-graphik-light-grey/10"
            >
              Pas maintenant
            </Button>
            <Button
              onClick={() => {
                setShowMFADialog(false);
                navigate('/mfa-setup');
              }}
              className="bg-graphik-blue hover:bg-graphik-blue/80"
            >
              Configurer l'A2F
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;
