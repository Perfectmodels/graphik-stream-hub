
// src/types/subscription.ts
export type SubscriptionStatus = 'pending' | 'approved' | 'rejected' | 'active' | 'expired' | 'suspended';
export type PaymentMethod = 'Mobile Money' | 'Bank Transfer' | 'Credit Card' | 'PayPal' | string;
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded' | null;

export interface Subscription {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  address?: string;
  service_type: string;
  status: SubscriptionStatus;
  total_price: number;
  created_at: string;
  start_date: string;
  end_date: string;
  duration_months: number;
  has_payment: boolean;
  payment_status: PaymentStatus;
  has_notes: boolean;
  payment_method: PaymentMethod;
}

export interface AdminNote {
  id: number;
  note: string;
  created_at: string;
  admin_id: string;
  subscription_id: number;
}

export interface Service {
  id: number;
  name: string;
  description?: string;
  base_price: number;
  category_id?: number;
  active?: boolean;
  featured?: boolean;
  image_url?: string;
}
