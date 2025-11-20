-- Migration: Add email verification fields to users table
-- Run this migration to add email verification support

-- Add verification token and expiration fields
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS verification_expires TIMESTAMP;

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);

-- Update existing users to be unverified if they don't have verification status
UPDATE users 
SET is_verified = FALSE 
WHERE is_verified IS NULL;

-- Ensure is_verified has a default value
ALTER TABLE users 
ALTER COLUMN is_verified SET DEFAULT FALSE;

