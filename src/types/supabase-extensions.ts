
// Type guard for MFA verification codes
export const isMFAVerificationCode = (obj: any): obj is { id: string } => {
  return obj && typeof obj.id === 'string';
};

// Type guard for user MFA settings
export const isUserMFASettings = (obj: any): obj is { 
  email_mfa_enabled: boolean, 
  sms_mfa_enabled: boolean,
  totp_mfa_enabled: boolean,
  phone_number?: string,
  id: string,
  created_at: string,
  updated_at: string,
  user_id: string
} => {
  return obj && typeof obj.email_mfa_enabled === 'boolean';
};
