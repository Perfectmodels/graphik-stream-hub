
// Type guard for MFA verification codes
export const isMFAVerificationCode = (obj: any): obj is { id: number } => {
  return obj && typeof obj.id === 'number';
};

// Type guard for user MFA settings
export const isUserMFASettings = (obj: any): obj is { 
  email_mfa_enabled: boolean, 
  sms_mfa_enabled?: boolean,
  phone_number?: string 
} => {
  return obj && typeof obj.email_mfa_enabled === 'boolean';
};
