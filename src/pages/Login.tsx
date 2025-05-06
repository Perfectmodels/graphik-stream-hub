
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import MFAVerificationForm from "@/components/auth/MFAVerificationForm";

const Login = () => {
  // MFA related states
  const [requiresMFA, setRequiresMFA] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");

  const handleMfaRequired = (userId: string, email: string) => {
    setUserId(userId);
    setUserEmail(email);
    setRequiresMFA(true);
    // The sendMFACode is now handled inside the MFAVerificationForm component
  };

  // Render MFA verification screen if required
  if (requiresMFA) {
    return (
      <AuthLayout
        title="Vérification à deux facteurs"
        subtitle="Un code de vérification a été envoyé à votre adresse e-mail"
        backLink={{
          to: "#",
          label: "Retour à la page de connexion"
        }}
      >
        <MFAVerificationForm 
          userId={userId!} 
          userEmail={userEmail}
          onBack={() => setRequiresMFA(false)}
        />
      </AuthLayout>
    );
  }

  // Regular login form
  return (
    <AuthLayout
      title="Connexion"
      subtitle="Accédez à votre espace client et gérez vos abonnements"
      footerAction={
        <p className="text-sm text-gray-400">
          Pas encore de compte ?{" "}
          <Link
            to="/register"
            className="text-graphik-blue hover:text-graphik-lightblue transition-colors"
          >
            S'inscrire
          </Link>
        </p>
      }
      backLink={{
        to: "/",
        label: "Retour à l'accueil"
      }}
    >
      <LoginForm onMfaRequired={handleMfaRequired} />
    </AuthLayout>
  );
};

export default Login;
