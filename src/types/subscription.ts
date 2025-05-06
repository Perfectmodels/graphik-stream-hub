
export type Service = {
  id: number;
  name: string;
  description: string | null;
  base_price: number;
  category_id: number | null;
};

export type Subscription = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'expired' | 'suspended';
  total_price: number;
  created_at: string;
  start_date: string;
  end_date: string;
  duration_months: number;
  payment_method?: string;
  has_payment?: boolean;
  payment_status?: string | null;
  has_notes?: boolean;
};
