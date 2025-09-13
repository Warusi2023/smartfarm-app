-- Quick test queries (post-deploy)

-- Create a farm, user, and membership
INSERT INTO users (email, display_name) VALUES ('owner@example.com','Owner') RETURNING id\gset
INSERT INTO farms (name, country) VALUES ('Green Valley Farm','Fiji') RETURNING id\gset
SELECT id FROM roles WHERE name='owner'\gset
INSERT INTO farm_members (farm_id, user_id, role_id) VALUES (:id, :'id_1', :'id_2');

-- Create a field and a planting
INSERT INTO fields (farm_id, name, area_ha, latitude, longitude)
VALUES (:'id', 'Block A', 1.25, -18.1416, 178.4419) RETURNING id\gset

INSERT INTO crops (common_name, category) VALUES ('Capsicum','vegetable')
ON CONFLICT (common_name) DO UPDATE SET category=EXCLUDED.category RETURNING id\gset

INSERT INTO plantings (farm_id, field_id, crop_id, planting_date, population_per_ha)
VALUES (:'id', :'id_3', :'id_4', CURRENT_DATE, 35000);
