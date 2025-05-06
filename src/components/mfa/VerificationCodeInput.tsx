
import React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface VerificationCodeInputProps {
  code: string;
  onChange: (value: string) => void;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({ code, onChange }) => {
  return (
    <div className="mb-6">
      <InputOTP
        maxLength={6}
        value={code}
        onChange={onChange}
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
  );
};

export default VerificationCodeInput;
