
import { supabase } from "@/integrations/supabase/client";

export enum ActivityType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  REGISTRATION = 'registration',
  SUBSCRIPTION_VIEW = 'subscription_view',
  SUBSCRIPTION_CREATE = 'subscription_create',
  SUBSCRIPTION_STATUS_CHANGE = 'subscription_status_change',
  PAYMENT = 'payment',
  PROFILE_UPDATE = 'profile_update',
  PASSWORD_RESET = 'password_reset',
  MFA_SETUP = 'mfa_setup'
}

export const logUserActivity = async (
  userId: string,
  activityType: ActivityType | string,
  activityData?: any,
  ipAddress?: string,
  deviceInfo?: string
) => {
  try {
    if (!userId) {
      console.error("logUserActivity: userId is required");
      return;
    }

    const { error } = await supabase
      .from('user_activities')
      .insert({
        user_id: userId,
        activity_type: activityType,
        activity_data: activityData,
        ip_address: ipAddress,
        device_info: deviceInfo || navigator.userAgent
      });
    
    if (error) {
      console.error("Error logging user activity:", error);
    }
  } catch (error) {
    console.error("Failed to log user activity:", error);
  }
};

/**
 * Récupère l'adresse IP d'un utilisateur via un service externe
 * À utiliser avec prudence et uniquement si nécessaire pour des raisons de confidentialité
 */
export const getUserIpAddress = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching user IP:", error);
    return null;
  }
};
