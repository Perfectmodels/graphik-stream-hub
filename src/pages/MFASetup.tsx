
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMFASettings } from "@/hooks/useMFASettings";
import EmailMFACard from "@/components/mfa/EmailMFACard";
import SmsMFACard from "@/components/mfa/SmsMFACard";
import AppMFACard from "@/components/mfa/AppMFACard";

const MFASetup = () => {
  const {
    user,
    loading,
    emailMFAEnabled,
    setEmailMFAEnabled,
    smsMFAEnabled,
    setSmsMFAEnabled,
    userPhoneNumber,
    setUserPhoneNumber,
    form,
    disableMFA,
    navigate
  } = useMFASettings();

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
          <EmailMFACard 
            user={user}
            emailMFAEnabled={emailMFAEnabled}
            setEmailMFAEnabled={setEmailMFAEnabled}
            disableMFA={disableMFA}
            loading={loading}
          />

          <SmsMFACard 
            user={user}
            smsMFAEnabled={smsMFAEnabled}
            setSmsMFAEnabled={setSmsMFAEnabled}
            userPhoneNumber={userPhoneNumber}
            setUserPhoneNumber={setUserPhoneNumber}
            disableMFA={disableMFA}
            loading={loading}
            form={form}
          />

          <AppMFACard />

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
