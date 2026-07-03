-- Migration: optional trade-product fields on regulatory overlay
-- Date: 2026-07-03
--
-- Populated when MAAF Gazette exports or label verification provide product-level provenance.

ALTER TABLE crop_chemical_regulatory_status
    ADD COLUMN IF NOT EXISTS product_name TEXT,
    ADD COLUMN IF NOT EXISTS registration_number TEXT;

CREATE INDEX IF NOT EXISTS idx_chem_regulatory_reg_number
    ON crop_chemical_regulatory_status(region_code, registration_number)
    WHERE registration_number IS NOT NULL;
