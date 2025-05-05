
// This file extends the Supabase types with the new tables we've added
// until the official types get updated

export type MFAVerificationCode = {
  id: string;
  user_id: string;
  code: string;
  type: string;
  created_at: string;
  expires_at: string;
  used: boolean;
}

export type UserMFASettings = {
  id: string;
  user_id: string;
  email_mfa_enabled: boolean;
  sms_mfa_enabled: boolean;
  totp_mfa_enabled: boolean;
  created_at: string;
  updated_at: string;
}

// Type guard functions to help with type checking
export function isUserMFASettings(obj: any): obj is UserMFASettings {
  return obj && 
    typeof obj === 'object' && 
    'email_mfa_enabled' in obj;
}

export function isMFAVerificationCode(obj: any): obj is MFAVerificationCode {
  return obj && 
    typeof obj === 'object' && 
    'code' in obj && 
    'expires_at' in obj;
}
