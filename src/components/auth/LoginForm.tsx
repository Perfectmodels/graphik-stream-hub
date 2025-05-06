
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LoginFormProps {
  onMfaRequired: (userId: string, email: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onMfaRequired }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
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
          onMfaRequired(data.user.id, email);
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

  return (
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
  );
};

// Type guard for MFA settings
const isUserMFASettings = (obj: any): obj is { email_mfa_enabled: boolean } => {
  return obj && typeof obj.email_mfa_enabled === 'boolean';
};

export default LoginForm;
