// Type definitions for Supabase extensions

export function isUserMFASettings(obj: any): obj is { email_mfa_enabled: boolean } {
  return obj && typeof obj.email_mfa_enabled === 'boolean';
}

export function isMFAVerificationCode(obj: any): obj is { id: number } {
  return obj && typeof obj.id === 'number';
}
