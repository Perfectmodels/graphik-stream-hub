
import React from "react";
import { useMFAVerification } from "@/hooks/useMFAVerification";
import VerificationMethodTabs from "@/components/mfa/VerificationMethodTabs";
import VerificationCodeInput from "@/components/mfa/VerificationCodeInput";
import VerificationActions from "@/components/mfa/VerificationActions";

interface MFAVerificationFormProps {
  userId: string;
  userEmail: string;
  onBack: () => void;
}

const MFAVerificationForm: React.FC<MFAVerificationFormProps> = ({ 
  userId, 
  userEmail,
  onBack
}) => {
  const {
    mfaCode,
    setMfaCode,
    verifying,
    resending,
    activeMethod,
    setActiveMethod,
    userPhoneNumber,
    sendMFACode,
    verifyMFACode
  } = useMFAVerification({ userId, userEmail, onBack });

  return (
    <div>
      <VerificationMethodTabs
        activeMethod={activeMethod}
        onMethodChange={setActiveMethod}
        userPhoneNumber={userPhoneNumber}
      />
      
      <VerificationCodeInput 
        code={mfaCode}
        onChange={setMfaCode}
      />
      
      <VerificationActions
        verifying={verifying}
        resending={resending}
        isValidCode={mfaCode.length === 6}
        onVerify={verifyMFACode}
        onResend={() => sendMFACode(activeMethod)}
      />
    </div>
  );
};

export default MFAVerificationForm;
