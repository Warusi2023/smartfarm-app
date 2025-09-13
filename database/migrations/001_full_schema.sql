-- === Extensions ===
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";
-- Optional (if your PG allows): PostGIS
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- === Helper updated_at trigger ===
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- === Enums (idempotent) ===
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='role_name') THEN
    CREATE TYPE role_name AS ENUM ('owner','admin','manager','worker','viewer');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='task_status') THEN
    CREATE TYPE task_status AS ENUM ('todo','in_progress','blocked','done','cancelled');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='unit_type') THEN
    CREATE TYPE unit_type AS ENUM ('kg','g','ton','l','ml','unit','bag','box','m','m2','ha');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='inventory_movement_type') THEN
    CREATE TYPE inventory_movement_type AS ENUM ('in','out','adjustment');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='animal_sex') THEN
    CREATE TYPE animal_sex AS ENUM ('male','female','unknown');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='order_status') THEN
    CREATE TYPE order_status AS ENUM ('draft','confirmed','packed','shipped','delivered','cancelled');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='invoice_status') THEN
    CREATE TYPE invoice_status AS ENUM ('draft','issued','paid','void');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='payment_status') THEN
    CREATE TYPE payment_status AS ENUM ('pending','completed','failed','refunded','cancelled');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='shipment_status') THEN
    CREATE TYPE shipment_status AS ENUM ('pending','in_transit','delivered','failed','returned');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='alert_severity') THEN
    CREATE TYPE alert_severity AS ENUM ('info','warning','critical');
  END IF;
END$$;

-- =====================================================================
-- 1) users
CREATE TABLE IF NOT EXISTS users (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email           citext UNIQUE NOT NULL,
  password_hash   text,
  display_name    text,
  phone           text,
  is_active       boolean NOT NULL DEFAULT true,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER tg_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 2) roles
CREATE TABLE IF NOT EXISTS roles (
  id    uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name  role_name NOT NULL UNIQUE
);
INSERT INTO roles (id,name)
SELECT uuid_generate_v4(), x
FROM unnest(ARRAY['owner','admin','manager','worker','viewer']::role_name[]) t(x)
ON CONFLICT DO NOTHING;

-- 3) farms
CREATE TABLE IF NOT EXISTS farms (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        text NOT NULL,
  description text,
  country     text,
  region      text,
  latitude    numeric(9,6),
  longitude   numeric(9,6),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER tg_farms_updated_at BEFORE UPDATE ON farms
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 4) farm_members
CREATE TABLE IF NOT EXISTS farm_members (
  id        uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id   uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  user_id   uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id   uuid NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
  UNIQUE (farm_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_farm_members_farm ON farm_members(farm_id);

-- 5) fields
CREATE TABLE IF NOT EXISTS fields (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id     uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  name        text NOT NULL,
  area_ha     numeric(12,4),
  latitude    numeric(9,6),
  longitude   numeric(9,6),
  soil_type   text,
  irrigation  text,
  notes       text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (farm_id, name)
);
CREATE INDEX IF NOT EXISTS idx_fields_farm ON fields(farm_id);
CREATE TRIGGER tg_fields_updated_at BEFORE UPDATE ON fields
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 6) crops
CREATE TABLE IF NOT EXISTS crops (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  common_name   text NOT NULL,
  scientific    text,
  category      text,
  optimal_pH_lo numeric(4,2),
  optimal_pH_hi numeric(4,2),
  UNIQUE (common_name)
);

-- 7) crop_varieties
CREATE TABLE IF NOT EXISTS crop_varieties (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  crop_id       uuid NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
  name          text NOT NULL,
  maturity_days int,
  seed_supplier text,
  notes         text,
  UNIQUE (crop_id, name)
);
CREATE INDEX IF NOT EXISTS idx_varieties_crop ON crop_varieties(crop_id);

-- 8) plantings
CREATE TABLE IF NOT EXISTS plantings (
  id                        uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id                   uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  field_id                  uuid NOT NULL REFERENCES fields(id) ON DELETE RESTRICT,
  crop_id                   uuid NOT NULL REFERENCES crops(id) ON DELETE RESTRICT,
  variety_id                uuid REFERENCES crop_varieties(id) ON DELETE SET NULL,
  planting_date             date NOT NULL,
  expected_harvest_start    date,
  expected_harvest_end      date,
  population_per_ha         numeric(12,2),
  row_spacing_cm            numeric(10,2),
  plant_spacing_cm          numeric(10,2),
  notes                     text,
  created_by                uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_plantings_farm_field ON plantings(farm_id, field_id);
CREATE INDEX IF NOT EXISTS idx_plantings_crop ON plantings(crop_id);
CREATE TRIGGER tg_plantings_updated_at BEFORE UPDATE ON plantings
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 9) irrigation_events
CREATE TABLE IF NOT EXISTS irrigation_events (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  planting_id   uuid NOT NULL REFERENCES plantings(id) ON DELETE CASCADE,
  event_time    timestamptz NOT NULL DEFAULT now(),
  method        text,
  volume_l      numeric(14,3),
  pressure_bar  numeric(8,3),
  notes         text
);
CREATE INDEX IF NOT EXISTS idx_irrigation_planting_time ON irrigation_events(planting_id, event_time);

-- 10) fertilization_events
CREATE TABLE IF NOT EXISTS fertilization_events (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  planting_id   uuid NOT NULL REFERENCES plantings(id) ON DELETE CASCADE,
  event_time    timestamptz NOT NULL DEFAULT now(),
  product_name  text NOT NULL,
  nutrient_n    numeric(10,2),
  nutrient_p    numeric(10,2),
  nutrient_k    numeric(10,2),
  amount        numeric(14,3),
  unit          unit_type NOT NULL DEFAULT 'kg',
  application_method text,
  notes         text
);
CREATE INDEX IF NOT EXISTS idx_fert_planting_time ON fertilization_events(planting_id, event_time);

-- 11) pest_disease_events
CREATE TABLE IF NOT EXISTS pest_disease_events (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  planting_id   uuid NOT NULL REFERENCES plantings(id) ON DELETE CASCADE,
  event_time    timestamptz NOT NULL DEFAULT now(),
  type          text,
  severity_0_5  int CHECK (severity_0_5 BETWEEN 0 AND 5),
  action_taken  text,
  product_name  text,
  notes         text
);
CREATE INDEX IF NOT EXISTS idx_pd_planting_time ON pest_disease_events(planting_id, event_time);

-- 12) harvests
CREATE TABLE IF NOT EXISTS harvests (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  planting_id     uuid NOT NULL REFERENCES plantings(id) ON DELETE CASCADE,
  harvest_time    timestamptz NOT NULL DEFAULT now(),
  quantity        numeric(14,3) NOT NULL,
  unit            unit_type NOT NULL DEFAULT 'kg',
  quality_grade   text,
  destination     text,
  lot_code        text,
  notes           text
);
CREATE INDEX IF NOT EXISTS idx_harvests_planting ON harvests(planting_id, harvest_time);

-- 13) storage_units
CREATE TABLE IF NOT EXISTS storage_units (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  name          text NOT NULL,
  type          text,
  latitude      numeric(9,6),
  longitude     numeric(9,6),
  capacity      numeric(16,3),
  capacity_unit unit_type DEFAULT 'kg',
  UNIQUE (farm_id, name)
);

-- 14) inventory_items
CREATE TABLE IF NOT EXISTS inventory_items (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  sku           text,
  name          text NOT NULL,
  category      text,
  unit          unit_type NOT NULL DEFAULT 'unit',
  min_stock     numeric(14,3) DEFAULT 0,
  barcode       text,
  metadata      jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (farm_id, sku),
  UNIQUE (farm_id, name, category)
);
CREATE INDEX IF NOT EXISTS idx_inventory_items_farm ON inventory_items(farm_id);

-- 15) inventory_locations
CREATE TABLE IF NOT EXISTS inventory_locations (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  name          text NOT NULL,
  description   text,
  latitude      numeric(9,6),
  longitude     numeric(9,6),
  UNIQUE (farm_id, name)
);

-- 16) inventory_balances
CREATE TABLE IF NOT EXISTS inventory_balances (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id         uuid NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE,
  location_id     uuid NOT NULL REFERENCES inventory_locations(id) ON DELETE CASCADE,
  quantity        numeric(16,3) NOT NULL DEFAULT 0,
  UNIQUE (item_id, location_id)
);

-- 17) inventory_movements
CREATE TABLE IF NOT EXISTS inventory_movements (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id         uuid NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE,
  location_id     uuid REFERENCES inventory_locations(id) ON DELETE SET NULL,
  movement_time   timestamptz NOT NULL DEFAULT now(),
  movement_type   inventory_movement_type NOT NULL,
  quantity        numeric(16,3) NOT NULL,
  reference       text,
  notes           text
);
CREATE INDEX IF NOT EXISTS idx_inv_mov_item_time ON inventory_movements(item_id, movement_time);

-- 18) livestock_groups
CREATE TABLE IF NOT EXISTS livestock_groups (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  species       text NOT NULL,
  group_name    text NOT NULL,
  count         int NOT NULL DEFAULT 0,
  housing       text,
  notes         text,
  UNIQUE (farm_id, group_name, species)
);

-- 19) animals
CREATE TABLE IF NOT EXISTS animals (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  group_id      uuid REFERENCES livestock_groups(id) ON DELETE SET NULL,
  tag_number    text UNIQUE,
  birth_date    date,
  sex           animal_sex DEFAULT 'unknown',
  breed         text,
  sire_tag      text,
  dam_tag       text,
  notes         text
);
CREATE INDEX IF NOT EXISTS idx_animals_farm ON animals(farm_id);

-- 20) animal_health_events
CREATE TABLE IF NOT EXISTS animal_health_events (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id     uuid NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  event_time    timestamptz NOT NULL DEFAULT now(),
  event_type    text,
  description   text,
  product_name  text,
  dosage        text
);
CREATE INDEX IF NOT EXISTS idx_animal_health_time ON animal_health_events(animal_id, event_time);

-- 21) tasks
CREATE TABLE IF NOT EXISTS tasks (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  title         text NOT NULL,
  description   text,
  status        task_status NOT NULL DEFAULT 'todo',
  priority_1_5  int CHECK (priority_1_5 BETWEEN 1 AND 5),
  due_at        timestamptz,
  created_by    uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_tasks_farm_status ON tasks(farm_id, status);
CREATE TRIGGER tg_tasks_updated_at BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 22) task_assignees
CREATE TABLE IF NOT EXISTS task_assignees (
  id        uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id   uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id   uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (task_id, user_id)
);

-- 23) sensors
CREATE TABLE IF NOT EXISTS sensors (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  name          text NOT NULL,
  kind          text,
  field_id      uuid REFERENCES fields(id) ON DELETE SET NULL,
  latitude      numeric(9,6),
  longitude     numeric(9,6),
  meta          jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (farm_id, name)
);

-- 24) sensor_readings
CREATE TABLE IF NOT EXISTS sensor_readings (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sensor_id     uuid NOT NULL REFERENCES sensors(id) ON DELETE CASCADE,
  reading_time  timestamptz NOT NULL,
  value_num     numeric(18,6),
  value_text    text,
  meta          jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_time ON sensor_readings(sensor_id, reading_time);

-- 25) weather_observations
CREATE TABLE IF NOT EXISTS weather_observations (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  observed_at   timestamptz NOT NULL,
  source        text,
  temperature_c numeric(6,2),
  humidity_pct  numeric(5,2),
  rainfall_mm   numeric(8,2),
  wind_m_s      numeric(6,2),
  solar_w_m2    numeric(8,2),
  meta          jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (farm_id, observed_at, source)
);
CREATE INDEX IF NOT EXISTS idx_weather_farm_time ON weather_observations(farm_id, observed_at);

-- 26) documents
CREATE TABLE IF NOT EXISTS documents (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  linked_table  text,
  linked_id     uuid,
  title         text NOT NULL,
  url           text NOT NULL,
  mime_type     text,
  uploaded_by   uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_documents_farm ON documents(farm_id);
CREATE INDEX IF NOT EXISTS idx_documents_link ON documents(linked_table, linked_id);

-- 27) suppliers
CREATE TABLE IF NOT EXISTS suppliers (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  name          text NOT NULL,
  email         citext,
  phone         text,
  address       text,
  tax_id        text,
  UNIQUE (farm_id, name)
);
CREATE INDEX IF NOT EXISTS idx_suppliers_farm ON suppliers(farm_id);

-- 28) customers
CREATE TABLE IF NOT EXISTS customers (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  name          text NOT NULL,
  email         citext,
  phone         text,
  billing_addr  text,
  shipping_addr text,
  tax_id        text,
  UNIQUE (farm_id, name)
);
CREATE INDEX IF NOT EXISTS idx_customers_farm ON customers(farm_id);

-- 29) sales_orders
CREATE TABLE IF NOT EXISTS sales_orders (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  customer_id   uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  order_no      text NOT NULL,
  status        order_status NOT NULL DEFAULT 'draft',
  order_date    date NOT NULL DEFAULT CURRENT_DATE,
  due_date      date,
  notes         text,
  UNIQUE (farm_id, order_no)
);
CREATE INDEX IF NOT EXISTS idx_so_farm_cust ON sales_orders(farm_id, customer_id);

-- 30) sales_order_items
CREATE TABLE IF NOT EXISTS sales_order_items (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sales_order_id uuid NOT NULL REFERENCES sales_orders(id) ON DELETE CASCADE,
  item_id       uuid NOT NULL REFERENCES inventory_items(id) ON DELETE RESTRICT,
  description   text,
  quantity      numeric(16,3) NOT NULL CHECK (quantity > 0),
  unit          unit_type NOT NULL,
  unit_price    numeric(16,4) NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_so_items_so ON sales_order_items(sales_order_id);

-- 31) purchase_orders
CREATE TABLE IF NOT EXISTS purchase_orders (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  supplier_id   uuid NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
  po_no         text NOT NULL,
  status        order_status NOT NULL DEFAULT 'draft',
  order_date    date NOT NULL DEFAULT CURRENT_DATE,
  expected_date date,
  notes         text,
  UNIQUE (farm_id, po_no)
);
CREATE INDEX IF NOT EXISTS idx_po_farm_supp ON purchase_orders(farm_id, supplier_id);

-- 32) purchase_order_items
CREATE TABLE IF NOT EXISTS purchase_order_items (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  purchase_order_id uuid NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
  item_id          uuid NOT NULL REFERENCES inventory_items(id) ON DELETE RESTRICT,
  description      text,
  quantity         numeric(16,3) NOT NULL CHECK (quantity > 0),
  unit             unit_type NOT NULL,
  unit_cost        numeric(16,4) NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_po_items_po ON purchase_order_items(purchase_order_id);

-- 33) shipments
CREATE TABLE IF NOT EXISTS shipments (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id         uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  sales_order_id  uuid REFERENCES sales_orders(id) ON DELETE SET NULL,
  carrier         text,
  tracking_no     text,
  status          shipment_status NOT NULL DEFAULT 'pending',
  shipped_at      timestamptz,
  delivered_at    timestamptz,
  notes           text
);
CREATE INDEX IF NOT EXISTS idx_shipments_farm ON shipments(farm_id);

-- 34) shipment_items
CREATE TABLE IF NOT EXISTS shipment_items (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id   uuid NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  item_id       uuid NOT NULL REFERENCES inventory_items(id) ON DELETE RESTRICT,
  quantity      numeric(16,3) NOT NULL CHECK (quantity > 0),
  unit          unit_type NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_shipment_items_shipment ON shipment_items(shipment_id);

-- 35) invoices
CREATE TABLE IF NOT EXISTS invoices (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  sales_order_id uuid REFERENCES sales_orders(id) ON DELETE SET NULL,
  invoice_no    text NOT NULL,
  status        invoice_status NOT NULL DEFAULT 'draft',
  issue_date    date NOT NULL DEFAULT CURRENT_DATE,
  due_date      date,
  currency      text DEFAULT 'FJD',
  notes         text,
  UNIQUE (farm_id, invoice_no)
);
CREATE INDEX IF NOT EXISTS idx_invoices_farm ON invoices(farm_id);

-- 36) invoice_items
CREATE TABLE IF NOT EXISTS invoice_items (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id   uuid NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description  text NOT NULL,
  item_id      uuid REFERENCES inventory_items(id) ON DELETE SET NULL,
  quantity     numeric(16,3) NOT NULL CHECK (quantity > 0),
  unit         unit_type NOT NULL,
  unit_price   numeric(16,4) NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice ON invoice_items(invoice_id);

-- 37) payments
CREATE TABLE IF NOT EXISTS payments (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  invoice_id    uuid REFERENCES invoices(id) ON DELETE SET NULL,
  amount        numeric(16,2) NOT NULL CHECK (amount >= 0),
  status        payment_status NOT NULL DEFAULT 'pending',
  method        text,
  reference     text,
  paid_at       timestamptz,
  notes         text
);
CREATE INDEX IF NOT EXISTS idx_payments_farm ON payments(farm_id);

-- 38) greenhouses
CREATE TABLE IF NOT EXISTS greenhouses (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  name          text NOT NULL,
  type          text, -- tunnel, glass, poly, etc.
  area_m2       numeric(12,2),
  latitude      numeric(9,6),
  longitude     numeric(9,6),
  UNIQUE (farm_id, name)
);
CREATE INDEX IF NOT EXISTS idx_greenhouses_farm ON greenhouses(farm_id);

-- 39) greenhouse_zones
CREATE TABLE IF NOT EXISTS greenhouse_zones (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  greenhouse_id   uuid NOT NULL REFERENCES greenhouses(id) ON DELETE CASCADE,
  name            text NOT NULL,
  target_temp_c   numeric(6,2),
  target_humidity numeric(5,2),
  target_ec       numeric(6,3),
  target_ph       numeric(4,2),
  UNIQUE (greenhouse_id, name)
);

-- 40) greenhouse_readings
CREATE TABLE IF NOT EXISTS greenhouse_readings (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  zone_id       uuid NOT NULL REFERENCES greenhouse_zones(id) ON DELETE CASCADE,
  reading_time  timestamptz NOT NULL,
  temp_c        numeric(6,2),
  humidity_pct  numeric(5,2),
  co2_ppm       numeric(10,2),
  vpd_kpa       numeric(6,3),
  ec            numeric(6,3),
  ph            numeric(4,2),
  meta          jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_gh_readings_zone_time ON greenhouse_readings(zone_id, reading_time);

-- 41) nutrient_recipes
CREATE TABLE IF NOT EXISTS nutrient_recipes (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  name          text NOT NULL,
  description   text,
  target_ec     numeric(6,3),
  target_ph     numeric(4,2),
  UNIQUE (farm_id, name)
);

-- 42) nutrient_recipe_components
CREATE TABLE IF NOT EXISTS nutrient_recipe_components (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id        uuid NOT NULL REFERENCES nutrient_recipes(id) ON DELETE CASCADE,
  component_name   text NOT NULL, -- e.g., Calcium Nitrate
  amount_per_100l  numeric(12,3) NOT NULL,
  unit             unit_type NOT NULL DEFAULT 'kg'
);
CREATE INDEX IF NOT EXISTS idx_recipe_components_recipe ON nutrient_recipe_components(recipe_id);

-- 43) soil_tests
CREATE TABLE IF NOT EXISTS soil_tests (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  field_id      uuid REFERENCES fields(id) ON DELETE SET NULL,
  sampled_at    date NOT NULL,
  lab_name      text,
  ph            numeric(4,2),
  ec_dS_m       numeric(6,3),
  n_pct         numeric(6,3),
  p_ppm         numeric(10,2),
  k_ppm         numeric(10,2),
  organic_matter_pct numeric(5,2),
  cec_cmol_kg   numeric(8,2),
  report_url    text,
  notes         text
);
CREATE INDEX IF NOT EXISTS idx_soil_tests_farm_field ON soil_tests(farm_id, field_id);

-- 44) water_tests
CREATE TABLE IF NOT EXISTS water_tests (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  source        text, -- bore, river, tank, etc.
  sampled_at    date NOT NULL,
  ph            numeric(4,2),
  ec            numeric(6,3),
  alkalinity_mg_l numeric(10,2),
  hardness_mg_l numeric(10,2),
  sodium_mg_l   numeric(10,2),
  chloride_mg_l numeric(10,2),
  report_url    text,
  notes         text
);
CREATE INDEX IF NOT EXISTS idx_water_tests_farm ON water_tests(farm_id);

-- 45) compliance_audits
CREATE TABLE IF NOT EXISTS compliance_audits (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  standard      text NOT NULL, -- e.g., GlobalG.A.P, Organic
  audit_date    date NOT NULL,
  auditor       text,
  score_pct     numeric(5,2),
  status        text, -- pass/fail/observations
  report_url    text,
  notes         text
);
CREATE INDEX IF NOT EXISTS idx_compliance_farm ON compliance_audits(farm_id);

-- 46) alerts
CREATE TABLE IF NOT EXISTS alerts (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       uuid NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  source        text, -- sensor, greenhouse, inventory, task, etc.
  linked_table  text,
  linked_id     uuid,
  severity      alert_severity NOT NULL DEFAULT 'info',
  title         text NOT NULL,
  message       text,
  is_read       boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  read_at       timestamptz
);
CREATE INDEX IF NOT EXISTS idx_alerts_farm_time ON alerts(farm_id, created_at);
CREATE INDEX IF NOT EXISTS idx_alerts_link ON alerts(linked_table, linked_id);
