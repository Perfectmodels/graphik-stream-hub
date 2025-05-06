
import React from "react";
import { Button } from "@/components/ui/button";

interface VerificationActionsProps {
  verifying: boolean;
  resending: boolean;
  isValidCode: boolean;
  onVerify: () => void;
  onResend: () => void;
}

const VerificationActions: React.FC<VerificationActionsProps> = ({
  verifying,
  resending,
  isValidCode,
  onVerify,
  onResend
}) => {
  return (
    <>
      <Button
        onClick={onVerify}
        disabled={!isValidCode || verifying}
        className="w-full bg-graphik-blue hover:bg-graphik-blue/80 mb-4"
      >
        {verifying ? "Vérification..." : "Vérifier"}
      </Button>
      
      <button
        type="button"
        onClick={onResend}
        disabled={resending}
        className="w-full text-center text-sm text-graphik-blue hover:text-graphik-lightblue"
      >
        {resending ? "Envoi en cours..." : "Vous n'avez pas reçu de code ? Renvoyer"}
      </button>
    </>
  );
};

export default VerificationActions;
