-- Reconcile the legacy livestock table with the livestock API store.
--
-- Databases created from 001_complete_schema.sql have:
--   * animal_type VARCHAR(100) NOT NULL  (and no `species` column)
--   * tag_number VARCHAR(50) UNIQUE      (globally unique across all users)
--
-- 017_livestock_api_persistence.sql only creates the table when it is absent, so
-- existing deployments kept the legacy shape and every insert from
-- services/livestockStore.js failed ("column species does not exist" /
-- null value in column "animal_type"). This migration is idempotent and safe on
-- both fresh and legacy databases.

ALTER TABLE livestock ADD COLUMN IF NOT EXISTS species VARCHAR(100);

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'livestock' AND column_name = 'animal_type'
    ) THEN
        UPDATE livestock
        SET species = animal_type
        WHERE (species IS NULL OR TRIM(species) = '')
          AND animal_type IS NOT NULL;

        -- New rows are written with `species` only.
        ALTER TABLE livestock ALTER COLUMN animal_type DROP NOT NULL;
    END IF;
END $$;

UPDATE livestock SET species = 'unknown' WHERE species IS NULL OR TRIM(species) = '';
ALTER TABLE livestock ALTER COLUMN species SET DEFAULT 'unknown';

-- A global unique tag blocks two farmers from using the same ear tag, and blocks
-- a second untagged animal. Replace it with a plain lookup index.
DO $$
DECLARE
    conname_to_drop TEXT;
    indexname_to_drop TEXT;
BEGIN
    FOR conname_to_drop IN
        SELECT c.conname
        FROM pg_constraint c
        JOIN pg_class t ON t.oid = c.conrelid
        WHERE t.relname = 'livestock'
          AND c.contype = 'u'
          AND pg_get_constraintdef(c.oid) ILIKE 'UNIQUE (tag_number)%'
    LOOP
        EXECUTE format('ALTER TABLE livestock DROP CONSTRAINT %I', conname_to_drop);
    END LOOP;

    FOR indexname_to_drop IN
        SELECT i.indexname
        FROM pg_indexes i
        WHERE i.tablename = 'livestock'
          AND i.indexdef ILIKE '%UNIQUE INDEX%(tag_number)%'
    LOOP
        EXECUTE format('DROP INDEX IF EXISTS %I', indexname_to_drop);
    END LOOP;
END $$;

CREATE INDEX IF NOT EXISTS idx_livestock_tag_number ON livestock(tag_number);

-- Columns the livestock API reads/writes, repeated here so legacy tables that
-- skipped 017's CREATE TABLE still get them.
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS location VARCHAR(255);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS value DECIMAL(12,2);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS production_purpose VARCHAR(100);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS lifecycle_stage VARCHAR(100);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS breeding_status VARCHAR(100);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS sire_tag VARCHAR(50);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS dam_tag VARCHAR(50);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS first_calving_date DATE;
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS last_calving_date DATE;
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS photo TEXT;

-- Legacy production_purpose/lifecycle_stage were VARCHAR(50); widen so longer
-- client values do not raise value_too_long on insert.
ALTER TABLE livestock ALTER COLUMN production_purpose TYPE VARCHAR(100);
ALTER TABLE livestock ALTER COLUMN lifecycle_stage TYPE VARCHAR(100);
