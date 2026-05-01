-- Ensure one active subscription row per user for upsert logic.
-- This migration is idempotent and safely removes historical duplicates
-- by keeping the newest row (highest created_at, then id).

WITH ranked_subscriptions AS (
    SELECT
        ctid,
        ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY created_at DESC NULLS LAST, id DESC
        ) AS rn
    FROM subscriptions
    WHERE user_id IS NOT NULL
)
DELETE FROM subscriptions s
USING ranked_subscriptions r
WHERE s.ctid = r.ctid
  AND r.rn > 1;

CREATE UNIQUE INDEX IF NOT EXISTS uq_subscriptions_user_id
ON subscriptions(user_id);
