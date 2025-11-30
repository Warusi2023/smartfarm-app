-- Migration: Add Weather Alerts System
-- Feature: Weather-Based Smart Alerts
-- Date: 2024-01-01

-- Weather alerts table
CREATE TABLE IF NOT EXISTS weather_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL, -- 'heavy_rain', 'frost', 'heat_stress', 'strong_wind', 'drought'
    severity VARCHAR(20) NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    expected_time TIMESTAMP NOT NULL,
    location_lat DECIMAL(10,8),
    location_lng DECIMAL(11,8),
    location_name VARCHAR(255),
    weather_data JSONB, -- Store the weather data that triggered the alert
    is_read BOOLEAN DEFAULT FALSE,
    is_dismissed BOOLEAN DEFAULT FALSE,
    action_taken BOOLEAN DEFAULT FALSE,
    action_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_weather_alerts_user_id ON weather_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_weather_alerts_farm_id ON weather_alerts(farm_id);
CREATE INDEX IF NOT EXISTS idx_weather_alerts_expected_time ON weather_alerts(expected_time);
CREATE INDEX IF NOT EXISTS idx_weather_alerts_is_read ON weather_alerts(is_read);
CREATE INDEX IF NOT EXISTS idx_weather_alerts_created_at ON weather_alerts(created_at DESC);

-- Alert preferences table (for future customization)
CREATE TABLE IF NOT EXISTS alert_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    enable_heavy_rain BOOLEAN DEFAULT TRUE,
    enable_frost BOOLEAN DEFAULT TRUE,
    enable_heat_stress BOOLEAN DEFAULT TRUE,
    enable_strong_wind BOOLEAN DEFAULT TRUE,
    enable_drought BOOLEAN DEFAULT TRUE,
    min_severity VARCHAR(20) DEFAULT 'medium', -- Only show alerts of this severity or higher
    notification_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alert metrics table (for tracking engagement)
CREATE TABLE IF NOT EXISTS alert_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_id UUID REFERENCES weather_alerts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'viewed', 'dismissed', 'action_taken'
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_alert_metrics_alert_id ON alert_metrics(alert_id);
CREATE INDEX IF NOT EXISTS idx_alert_metrics_user_id ON alert_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_alert_metrics_event_type ON alert_metrics(event_type);

