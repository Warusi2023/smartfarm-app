-- Migration: IPM maturity notes on crop catalog
-- Date: 2026-07-03

ALTER TABLE ipm_crop_catalog
    ADD COLUMN IF NOT EXISTS maturity_notes TEXT;
