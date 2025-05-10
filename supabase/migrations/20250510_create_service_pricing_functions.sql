
-- Function to get all service prices
CREATE OR REPLACE FUNCTION get_service_prices()
RETURNS TABLE (
  id int,
  service_type text,
  duration_months int,
  price numeric,
  is_promo boolean
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sp.id, 
    sp.service_type, 
    sp.duration_months, 
    sp.price, 
    sp.is_promo
  FROM service_pricing sp
  ORDER BY sp.service_type, sp.duration_months;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get a specific service price
CREATE OR REPLACE FUNCTION get_service_price(p_service_type text, p_duration_months int)
RETURNS TABLE (price numeric) AS $$
BEGIN
  RETURN QUERY
  SELECT sp.price
  FROM service_pricing sp
  WHERE sp.service_type = p_service_type
  AND sp.duration_months = p_duration_months;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update a service price
CREATE OR REPLACE FUNCTION update_service_price(p_id int, p_price numeric)
RETURNS void AS $$
BEGIN
  UPDATE service_pricing
  SET price = p_price, updated_at = NOW()
  WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Set up RLS policies for service_pricing
ALTER TABLE service_pricing ENABLE ROW LEVEL SECURITY;

-- Allow read access for all authenticated users
CREATE POLICY service_pricing_read_policy
  ON service_pricing
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow updates only for admin users
CREATE POLICY service_pricing_update_policy
  ON service_pricing
  FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_pricing_service_type 
ON service_pricing(service_type);

CREATE INDEX IF NOT EXISTS idx_service_pricing_duration 
ON service_pricing(duration_months);
