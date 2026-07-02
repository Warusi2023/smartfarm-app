-- Migration: IPM reference data — pests, beneficials, chemical options (Phase 1 schema)
-- Date: 2026-07-02
--
-- Reference catalog keyed by crop_key (species-level), NOT farm planting rows (crops.id).
-- Farm plantings resolve crop name → crop_key at query time (same pattern as soil intelligence).
--
-- Rollback (manual, after backup):
--   DROP TABLE IF EXISTS crop_chemical_targets;
--   DROP TABLE IF EXISTS crop_chemical_regulatory_status;
--   DROP TABLE IF EXISTS crop_chemical_options;
--   DROP TABLE IF EXISTS crop_beneficials;
--   DROP TABLE IF EXISTS crop_ipm_field_signs;
--   DROP TABLE IF EXISTS crop_pests;
--   DROP TABLE IF EXISTS ipm_crop_catalog;

-- =====================================================================
-- REFERENCE: IPM CROP CATALOG (species / template level)
-- =====================================================================

CREATE TABLE IF NOT EXISTS ipm_crop_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_key TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    crop_group TEXT,
    is_default_template BOOLEAN NOT NULL DEFAULT FALSE,
    population_status TEXT NOT NULL DEFAULT 'planned'
        CHECK (population_status IN ('planned', 'partial', 'complete')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ipm_crop_catalog_group ON ipm_crop_catalog(crop_group);

DROP TRIGGER IF EXISTS update_ipm_crop_catalog_updated_at ON ipm_crop_catalog;
CREATE TRIGGER update_ipm_crop_catalog_updated_at BEFORE UPDATE ON ipm_crop_catalog
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================================
-- FIELD SIGNS (symptom-first cues — maps to damageToLookFor in UI)
-- =====================================================================

CREATE TABLE IF NOT EXISTS crop_ipm_field_signs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_key TEXT NOT NULL REFERENCES ipm_crop_catalog(crop_key) ON DELETE CASCADE,
    sign_text TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    region_codes TEXT[] NOT NULL DEFAULT ARRAY['*'],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crop_ipm_field_signs_crop ON crop_ipm_field_signs(crop_key, sort_order);

-- =====================================================================
-- PESTS & DISEASES
-- =====================================================================

CREATE TABLE IF NOT EXISTS crop_pests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_key TEXT NOT NULL REFERENCES ipm_crop_catalog(crop_key) ON DELETE CASCADE,
    pest_name_common TEXT NOT NULL,
    pest_type TEXT NOT NULL
        CHECK (pest_type IN ('insect', 'fungus', 'bacterium', 'nematode', 'weed', 'virus', 'mite', 'other')),
    scientific_name TEXT,
    stage_targeted TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    region_codes TEXT[] NOT NULL DEFAULT ARRAY['*'],
    damage_description TEXT,
    notes TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crop_pests_crop ON crop_pests(crop_key, sort_order);
CREATE INDEX IF NOT EXISTS idx_crop_pests_type ON crop_pests(pest_type);

DROP TRIGGER IF EXISTS update_crop_pests_updated_at ON crop_pests;
CREATE TRIGGER update_crop_pests_updated_at BEFORE UPDATE ON crop_pests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================================
-- BENEFICIAL ORGANISMS & BIOLOGICAL OPTIONS
-- =====================================================================

CREATE TABLE IF NOT EXISTS crop_beneficials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_key TEXT NOT NULL REFERENCES ipm_crop_catalog(crop_key) ON DELETE CASCADE,
    beneficial_name_common TEXT NOT NULL,
    beneficial_type TEXT NOT NULL
        CHECK (beneficial_type IN (
            'predator', 'parasitoid', 'pollinator', 'microbial_antagonist', 'biological_product'
        )),
    scientific_name TEXT,
    targets TEXT,
    deployment_method TEXT,
    description TEXT,
    region_codes TEXT[] NOT NULL DEFAULT ARRAY['*'],
    notes TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crop_beneficials_crop ON crop_beneficials(crop_key, sort_order);

DROP TRIGGER IF EXISTS update_crop_beneficials_updated_at ON crop_beneficials;
CREATE TRIGGER update_crop_beneficials_updated_at BEFORE UPDATE ON crop_beneficials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================================
-- CHEMICAL OPTIONS (generic actives — filter by region before display)
-- =====================================================================

CREATE TABLE IF NOT EXISTS crop_chemical_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_key TEXT NOT NULL REFERENCES ipm_crop_catalog(crop_key) ON DELETE CASCADE,
    active_ingredient TEXT NOT NULL,
    product_class TEXT NOT NULL
        CHECK (product_class IN (
            'fungicide', 'insecticide', 'herbicide', 'acaricide',
            'molluscicide', 'nematicide', 'bactericide', 'other'
        )),
    region_codes TEXT[] NOT NULL DEFAULT ARRAY['*'],
    application_rate_min NUMERIC,
    application_rate_max NUMERIC,
    rate_unit TEXT,
    timing TEXT,
    phi_days INT,
    reentry_interval_hours NUMERIC,
    hazard_notes TEXT,
    is_example_only BOOLEAN NOT NULL DEFAULT TRUE,
    main_pest_groups TEXT,
    safety_note TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crop_chemical_options_crop ON crop_chemical_options(crop_key, sort_order);
CREATE INDEX IF NOT EXISTS idx_crop_chemical_options_class ON crop_chemical_options(product_class);

DROP TRIGGER IF EXISTS update_crop_chemical_options_updated_at ON crop_chemical_options;
CREATE TRIGGER update_crop_chemical_options_updated_at BEFORE UPDATE ON crop_chemical_options
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Optional link: chemical option → specific pest rows (or free-text via target_description)
CREATE TABLE IF NOT EXISTS crop_chemical_targets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_chemical_id UUID NOT NULL REFERENCES crop_chemical_options(id) ON DELETE CASCADE,
    crop_pest_id UUID REFERENCES crop_pests(id) ON DELETE SET NULL,
    target_description TEXT,
    CHECK (crop_pest_id IS NOT NULL OR NULLIF(TRIM(target_description), '') IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_crop_chemical_targets_chemical ON crop_chemical_targets(crop_chemical_id);

-- =====================================================================
-- REGULATORY OVERLAY (country/region allowlist — constrains UI display)
-- =====================================================================

CREATE TABLE IF NOT EXISTS crop_chemical_regulatory_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region_code TEXT NOT NULL,
    active_ingredient TEXT NOT NULL,
    crop_key TEXT REFERENCES ipm_crop_catalog(crop_key) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'unknown'
        CHECK (status IN ('allowed', 'restricted', 'banned', 'requires_license', 'unknown')),
    source_ref TEXT,
    effective_from DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (region_code, active_ingredient, crop_key)
);

CREATE INDEX IF NOT EXISTS idx_crop_pests_region ON crop_pests USING GIN (region_codes);
CREATE INDEX IF NOT EXISTS idx_crop_beneficials_region ON crop_beneficials USING GIN (region_codes);
CREATE INDEX IF NOT EXISTS idx_crop_chemical_options_region ON crop_chemical_options USING GIN (region_codes);
CREATE INDEX IF NOT EXISTS idx_crop_ipm_field_signs_region ON crop_ipm_field_signs USING GIN (region_codes);
CREATE INDEX IF NOT EXISTS idx_chem_regulatory_region ON crop_chemical_regulatory_status(region_code, active_ingredient);
CREATE INDEX IF NOT EXISTS idx_chem_regulatory_crop ON crop_chemical_regulatory_status(crop_key, region_code);

-- =====================================================================
-- SEED: catalog rows (content populated progressively via scripts / admin)
-- =====================================================================

INSERT INTO ipm_crop_catalog (crop_key, display_name, crop_group, is_default_template, population_status, notes)
VALUES
    ('vegetable_default', 'Vegetable crop (general template)', 'vegetable', TRUE, 'complete',
     'Fallback IPM panel when crop_key is unknown'),
    ('tomato', 'Tomato', 'vegetable', FALSE, 'complete', 'Shipped in cropPestProtection.js — migrate to DB'),
    ('capsicum', 'Capsicum (bell pepper)', 'vegetable', FALSE, 'complete', 'Shipped in cropPestProtection.js — migrate to DB'),
    ('lettuce', 'Lettuce', 'vegetable', FALSE, 'complete', 'Shipped in cropPestProtection.js — migrate to DB'),
    ('maize', 'Maize', 'cereal', FALSE, 'planned', 'Priority crop — fall armyworm, leaf blight, rusts, stalk/ear rots'),
    ('rice', 'Rice', 'cereal', FALSE, 'planned', 'Priority crop'),
    ('wheat', 'Wheat', 'cereal', FALSE, 'planned', 'Priority crop'),
    ('soybean', 'Soybean', 'legume', FALSE, 'planned', 'Priority crop'),
    ('potato', 'Potato', 'root', FALSE, 'planned', 'Priority crop'),
    ('cassava', 'Cassava', 'root', FALSE, 'planned', 'Priority crop'),
    ('sweet_potato', 'Sweet potato', 'root', FALSE, 'planned', 'Priority crop'),
    ('sorghum', 'Sorghum', 'cereal', FALSE, 'planned', 'Priority crop'),
    ('yam', 'Yam', 'root', FALSE, 'planned', 'Priority crop'),
    ('plantain', 'Plantain', 'fruit', FALSE, 'planned', 'Priority crop')
ON CONFLICT (crop_key) DO NOTHING;
