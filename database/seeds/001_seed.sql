-- Safe, idempotent-ish seeds (ON CONFLICT where possible)

INSERT INTO users (email, display_name, is_active)
VALUES ('owner@smartfarm.test','SmartFarm Owner', true)
ON CONFLICT (email) DO UPDATE SET display_name=EXCLUDED.display_name;

INSERT INTO farms (name, country, region, latitude, longitude)
VALUES ('Green Valley Farm','Fiji','Rewa', -18.141600, 178.441900)
ON CONFLICT DO NOTHING;

-- Attach user to farm as owner
WITH u AS (
  SELECT id AS user_id FROM users WHERE email='owner@smartfarm.test'
),
f AS (
  SELECT id AS farm_id FROM farms WHERE name='Green Valley Farm'
),
r AS (
  SELECT id AS role_id FROM roles WHERE name='owner'
)
INSERT INTO farm_members (farm_id, user_id, role_id)
SELECT f.farm_id, u.user_id, r.role_id FROM u,f,r
ON CONFLICT (farm_id, user_id) DO NOTHING;

-- A field
WITH f AS (SELECT id AS farm_id FROM farms WHERE name='Green Valley Farm')
INSERT INTO fields (farm_id, name, area_ha, latitude, longitude, soil_type)
SELECT farm_id, 'Block A', 1.25, -18.141800, 178.442300, 'loam'
FROM f
ON CONFLICT DO NOTHING;

-- A crop and variety
INSERT INTO crops (common_name, category) VALUES ('Capsicum','vegetable')
ON CONFLICT (common_name) DO UPDATE SET category=EXCLUDED.category;

WITH c AS (SELECT id FROM crops WHERE common_name='Capsicum')
INSERT INTO crop_varieties (crop_id, name, maturity_days)
SELECT id, 'California Wonder', 75 FROM c
ON CONFLICT (crop_id, name) DO NOTHING;

-- Sample inventory items
WITH f AS (SELECT id AS farm_id FROM farms WHERE name='Green Valley Farm')
INSERT INTO inventory_items (farm_id, name, category, unit, min_stock)
SELECT farm_id, 'Capsicum Seeds', 'seed', 'unit', 10 FROM f
ON CONFLICT (farm_id, name, category) DO NOTHING;

WITH f AS (SELECT id AS farm_id FROM farms WHERE name='Green Valley Farm')
INSERT INTO inventory_items (farm_id, name, category, unit, min_stock)
SELECT farm_id, 'NPK Fertilizer', 'fertilizer', 'kg', 50 FROM f
ON CONFLICT (farm_id, name, category) DO NOTHING;

-- Sample inventory location
WITH f AS (SELECT id AS farm_id FROM farms WHERE name='Green Valley Farm')
INSERT INTO inventory_locations (farm_id, name, description)
SELECT farm_id, 'Main Storage', 'Primary storage facility' FROM f
ON CONFLICT (farm_id, name) DO NOTHING;

-- Sample sensor
WITH f AS (SELECT id AS farm_id FROM farms WHERE name='Green Valley Farm')
INSERT INTO sensors (farm_id, name, kind, latitude, longitude)
SELECT farm_id, 'Soil Moisture Sensor 1', 'soil_moisture', -18.141800, 178.442300 FROM f
ON CONFLICT (farm_id, name) DO NOTHING;

-- Sample task
WITH f AS (SELECT id AS farm_id FROM farms WHERE name='Green Valley Farm'),
     u AS (SELECT id AS user_id FROM users WHERE email='owner@smartfarm.test')
INSERT INTO tasks (farm_id, title, description, status, priority_1_5, created_by)
SELECT f.farm_id, 'Prepare Field for Planting', 'Clear weeds and prepare soil for capsicum planting', 'todo', 3, u.user_id
FROM f, u
ON CONFLICT DO NOTHING;
