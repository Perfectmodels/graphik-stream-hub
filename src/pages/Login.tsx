
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur Graphik'Studio !",
      duration: 3000,
    });
    navigate('/');
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
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
            >
              Se connecter
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
