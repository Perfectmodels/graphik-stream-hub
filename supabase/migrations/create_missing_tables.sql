
-- Ce script crée les tables manquantes et les contraintes nécessaires
-- pour l'application de gestion d'abonnements

-- Table pour stocker les plans d'abonnement disponibles
CREATE TABLE IF NOT EXISTS subscription_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_months INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour stocker les configurations de prix spécifiques par service et durée
CREATE TABLE IF NOT EXISTS service_pricing (
  id SERIAL PRIMARY KEY,
  service_type VARCHAR(255) NOT NULL,
  duration_months INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  is_promo BOOLEAN DEFAULT false,
  promo_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(service_type, duration_months)
);

-- Table pour gérer les renouvellements d'abonnement
CREATE TABLE IF NOT EXISTS subscription_renewals (
  id SERIAL PRIMARY KEY,
  subscription_id INTEGER NOT NULL REFERENCES subscription_requests(id),
  renewal_date TIMESTAMP WITH TIME ZONE NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  is_processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMP WITH TIME ZONE,
  payment_id INTEGER REFERENCES payments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour suivre l'historique des statuts d'abonnement
CREATE TABLE IF NOT EXISTS subscription_status_history (
  id SERIAL PRIMARY KEY,
  subscription_id INTEGER NOT NULL REFERENCES subscription_requests(id),
  previous_status VARCHAR(50),
  new_status VARCHAR(50) NOT NULL,
  changed_by UUID,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour stocker les configurations de notifications
CREATE TABLE IF NOT EXISTS notification_settings (
  id SERIAL PRIMARY KEY,
  user_id UUID,
  notification_type VARCHAR(100) NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  channels JSONB DEFAULT '{"email": true, "whatsapp": true, "sms": false}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, notification_type)
);

-- Table pour stocker l'historique des notifications envoyées
CREATE TABLE IF NOT EXISTS notification_history (
  id SERIAL PRIMARY KEY,
  user_id UUID,
  subscription_id INTEGER REFERENCES subscription_requests(id),
  notification_type VARCHAR(100) NOT NULL,
  channel VARCHAR(50) NOT NULL,
  content TEXT,
  is_sent BOOLEAN DEFAULT false,
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ajouter des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_subscription_requests_status ON subscription_requests(status);
CREATE INDEX IF NOT EXISTS idx_subscription_requests_end_date ON subscription_requests(end_date);
CREATE INDEX IF NOT EXISTS idx_payments_subscription_id ON payments(subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscription_renewals_subscription_id ON subscription_renewals(subscription_id);
CREATE INDEX IF NOT EXISTS idx_notification_history_user_id ON notification_history(user_id);

-- Ajout de données de base pour les prix des services
INSERT INTO service_pricing (service_type, duration_months, price) 
VALUES 
  ('Netflix', 1, 8000),
  ('Netflix', 3, 22500),
  ('Netflix', 6, 42000),
  ('Netflix', 12, 78000),
  ('Disney+', 1, 6500),
  ('Disney+', 3, 18000),
  ('Disney+', 6, 34000),
  ('Disney+', 12, 65000),
  ('Spotify', 1, 5000),
  ('Spotify', 3, 13500),
  ('Spotify', 6, 25000),
  ('Spotify', 12, 48000),
  ('Xbox Game Pass', 1, 15000),
  ('Xbox Game Pass', 3, 42000),
  ('Xbox Game Pass', 6, 80000),
  ('Xbox Game Pass', 12, 150000)
ON CONFLICT (service_type, duration_months) DO NOTHING;

-- Fonction pour mettre à jour le champ updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Déclencheurs pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_subscription_plans_updated_at
BEFORE UPDATE ON subscription_plans
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_pricing_updated_at
BEFORE UPDATE ON service_pricing
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscription_renewals_updated_at
BEFORE UPDATE ON subscription_renewals
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_settings_updated_at
BEFORE UPDATE ON notification_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour enregistrer l'historique des changements de statut d'abonnement
CREATE OR REPLACE FUNCTION log_subscription_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status <> NEW.status THEN
    INSERT INTO subscription_status_history (subscription_id, previous_status, new_status, changed_by)
    VALUES (NEW.id, OLD.status, NEW.status, auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Déclencheur pour enregistrer les changements de statut
CREATE TRIGGER track_subscription_status_changes
AFTER UPDATE OF status ON subscription_requests
FOR EACH ROW EXECUTE FUNCTION log_subscription_status_change();
