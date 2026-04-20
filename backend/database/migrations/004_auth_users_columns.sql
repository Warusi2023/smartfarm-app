-- Minimal columns for auth flows (trial on users, password reset tokens)
-- Safe to run on existing databases

ALTER TABLE users ADD COLUMN IF NOT EXISTS trial_end DATE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_expires TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);
