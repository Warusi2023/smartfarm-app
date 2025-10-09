-- Subscription System Migration
-- This migration creates tables for subscription management, payments, and refunds

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    plan TEXT NOT NULL CHECK (plan IN ('free', 'professional', 'enterprise')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'refunded')),
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    paymentMethod TEXT,
    billingInfo TEXT, -- JSON string with billing information
    refundEligible INTEGER DEFAULT 1,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    subscriptionId TEXT NOT NULL,
    userId TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    paymentMethod TEXT NOT NULL,
    transactionId TEXT,
    gatewayResponse TEXT, -- JSON string with payment gateway response
    createdAt TEXT NOT NULL,
    FOREIGN KEY (subscriptionId) REFERENCES subscriptions(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Refunds table
CREATE TABLE IF NOT EXISTS refunds (
    id TEXT PRIMARY KEY,
    subscriptionId TEXT NOT NULL,
    userId TEXT NOT NULL,
    amount REAL NOT NULL,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    processedAt TEXT,
    processedBy TEXT, -- Admin user who processed the refund
    notes TEXT, -- Admin notes about the refund
    createdAt TEXT NOT NULL,
    FOREIGN KEY (subscriptionId) REFERENCES subscriptions(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- API Usage tracking table
CREATE TABLE IF NOT EXISTS api_usage (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL,
    month TEXT NOT NULL, -- Format: YYYY-MM
    count INTEGER DEFAULT 1,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Subscription limits table (for tracking limits per user)
CREATE TABLE IF NOT EXISTS subscription_limits (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    plan TEXT NOT NULL,
    maxFarms INTEGER,
    maxUsers INTEGER,
    maxApiCallsPerMonth INTEGER,
    currentFarms INTEGER DEFAULT 0,
    currentUsers INTEGER DEFAULT 0,
    currentApiCalls INTEGER DEFAULT 0,
    resetDate TEXT, -- When limits reset (monthly)
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_userId ON subscriptions(userId);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_payments_subscriptionId ON payments(subscriptionId);
CREATE INDEX IF NOT EXISTS idx_payments_userId ON payments(userId);
CREATE INDEX IF NOT EXISTS idx_refunds_subscriptionId ON refunds(subscriptionId);
CREATE INDEX IF NOT EXISTS idx_refunds_userId ON refunds(userId);
CREATE INDEX IF NOT EXISTS idx_api_usage_userId ON api_usage(userId);
CREATE INDEX IF NOT EXISTS idx_api_usage_month ON api_usage(month);
CREATE INDEX IF NOT EXISTS idx_subscription_limits_userId ON subscription_limits(userId);

-- Insert default subscription limits for each plan
INSERT OR IGNORE INTO subscription_limits (id, userId, plan, maxFarms, maxUsers, maxApiCallsPerMonth, resetDate, createdAt, updatedAt)
SELECT 
    'default-free-' || id,
    id,
    'free',
    2,
    1,
    1000,
    strftime('%Y-%m-01', 'now', '+1 month'),
    datetime('now'),
    datetime('now')
FROM users;

-- Create a view for subscription analytics
CREATE VIEW IF NOT EXISTS subscription_analytics AS
SELECT 
    s.plan,
    COUNT(*) as total_subscriptions,
    COUNT(CASE WHEN s.status = 'active' THEN 1 END) as active_subscriptions,
    COUNT(CASE WHEN s.status = 'cancelled' THEN 1 END) as cancelled_subscriptions,
    COUNT(CASE WHEN s.status = 'refunded' THEN 1 END) as refunded_subscriptions,
    AVG(p.amount) as average_revenue,
    SUM(p.amount) as total_revenue
FROM subscriptions s
LEFT JOIN payments p ON s.id = p.subscriptionId AND p.status = 'completed'
GROUP BY s.plan;

-- Create a view for refund analytics
CREATE VIEW IF NOT EXISTS refund_analytics AS
SELECT 
    DATE(createdAt) as refund_date,
    COUNT(*) as total_refunds,
    SUM(amount) as total_refund_amount,
    AVG(amount) as average_refund_amount
FROM refunds
WHERE status = 'completed'
GROUP BY DATE(createdAt);

-- Create a trigger to update subscription limits when farms are created/deleted
CREATE TRIGGER IF NOT EXISTS update_farm_count_insert
AFTER INSERT ON farms
BEGIN
    UPDATE subscription_limits 
    SET currentFarms = currentFarms + 1, updatedAt = datetime('now')
    WHERE userId = NEW.ownerId;
END;

CREATE TRIGGER IF NOT EXISTS update_farm_count_delete
AFTER DELETE ON farms
BEGIN
    UPDATE subscription_limits 
    SET currentFarms = currentFarms - 1, updatedAt = datetime('now')
    WHERE userId = OLD.ownerId;
END;

-- Create a trigger to track API usage
CREATE TRIGGER IF NOT EXISTS track_api_usage
AFTER INSERT ON api_usage
BEGIN
    UPDATE subscription_limits 
    SET currentApiCalls = currentApiCalls + NEW.count, updatedAt = datetime('now')
    WHERE userId = NEW.userId AND month = NEW.month;
END;

-- Create a function to reset monthly limits (to be called by a cron job)
-- This would typically be handled by the application, but we can create a view for it
CREATE VIEW IF NOT EXISTS monthly_reset_needed AS
SELECT 
    userId,
    plan,
    resetDate
FROM subscription_limits
WHERE resetDate <= date('now')
AND (currentApiCalls > 0 OR currentFarms > 0 OR currentUsers > 0);
