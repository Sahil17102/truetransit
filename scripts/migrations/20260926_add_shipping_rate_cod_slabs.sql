BEGIN;

CREATE TABLE IF NOT EXISTS shipping_rate_cod_slabs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipping_rate_id UUID NOT NULL REFERENCES shipping_rates(id) ON DELETE CASCADE,
  amount_from NUMERIC(12, 2) NOT NULL,
  amount_to NUMERIC(12, 2),
  charge_type VARCHAR(20) NOT NULL,
  charge_value NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT shipping_rate_cod_slabs_charge_type_check
    CHECK (charge_type IN ('flat', 'percent'))
);

ALTER TABLE shipping_rate_cod_slabs
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

CREATE INDEX IF NOT EXISTS idx_shipping_rate_cod_slabs_rate_id
  ON shipping_rate_cod_slabs (shipping_rate_id);

CREATE INDEX IF NOT EXISTS idx_shipping_rate_cod_slabs_amount_range
  ON shipping_rate_cod_slabs (shipping_rate_id, amount_from, amount_to);

COMMIT;
