-- Additional tables for advanced SmartFarm features
-- Run after 001_complete_schema.sql

-- =====================================================================
-- WEEDING MANAGEMENT
-- =====================================================================

CREATE TABLE IF NOT EXISTS weeding_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_id UUID REFERENCES crops(id) ON DELETE CASCADE,
    field_id UUID REFERENCES fields(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    task_date DATE NOT NULL,
    area_weeded DECIMAL(8,2), -- hectares
    method VARCHAR(50), -- manual, mechanical, chemical
    herbicide_used VARCHAR(255),
    notes TEXT,
    status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_weeding_tasks_crop_id ON weeding_tasks(crop_id);
CREATE INDEX IF NOT EXISTS idx_weeding_tasks_task_date ON weeding_tasks(task_date);

CREATE TRIGGER update_weeding_tasks_updated_at BEFORE UPDATE ON weeding_tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================================
-- PESTICIDE MANAGEMENT
-- =====================================================================

CREATE TABLE IF NOT EXISTS pesticide_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_id UUID REFERENCES crops(id) ON DELETE CASCADE,
    field_id UUID REFERENCES fields(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    application_date DATE NOT NULL,
    pesticide_name VARCHAR(255) NOT NULL,
    active_ingredient VARCHAR(255),
    amount_applied DECIMAL(10,2),
    unit VARCHAR(50) DEFAULT 'ml',
    target_pest VARCHAR(255),
    application_method VARCHAR(50), -- spray, dust, granular
    safety_interval_days INTEGER, -- Days until safe to harvest
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pesticide_applications_crop_id ON pesticide_applications(crop_id);
CREATE INDEX IF NOT EXISTS idx_pesticide_applications_date ON pesticide_applications(application_date);

CREATE TRIGGER update_pesticide_applications_updated_at BEFORE UPDATE ON pesticide_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================================
-- SUPPLY CHAIN & BYPRODUCTS
-- =====================================================================

CREATE TABLE IF NOT EXISTS byproducts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    product_type VARCHAR(100) NOT NULL, -- crop_byproduct, livestock_byproduct
    source_crop_id UUID REFERENCES crops(id) ON DELETE SET NULL,
    source_livestock_id UUID REFERENCES livestock(id) ON DELETE SET NULL,
    batch_number VARCHAR(100) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    harvest_date DATE,
    location VARCHAR(255),
    certifications TEXT[],
    farmer_name VARCHAR(255),
    qr_code_id UUID REFERENCES qr_codes(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_byproducts_farm_id ON byproducts(farm_id);
CREATE INDEX IF NOT EXISTS idx_byproducts_batch_number ON byproducts(batch_number);
CREATE INDEX IF NOT EXISTS idx_byproducts_qr_code_id ON byproducts(qr_code_id);

CREATE TRIGGER update_byproducts_updated_at BEFORE UPDATE ON byproducts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================================
-- ANALYTICS & REPORTS
-- =====================================================================

CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    report_type VARCHAR(100) NOT NULL, -- crop_yield, financial, livestock_health, etc.
    report_name VARCHAR(255) NOT NULL,
    date_range_start DATE,
    date_range_end DATE,
    report_data JSONB, -- Store report data as JSON
    file_path VARCHAR(500), -- Path to generated PDF/Excel file
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_farm_id ON reports(farm_id);
CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(report_type);

-- =====================================================================
-- NOTIFICATIONS
-- =====================================================================

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- task_due, weather_alert, health_warning, etc.
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    related_entity_type VARCHAR(50), -- crop, livestock, task, etc.
    related_entity_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- =====================================================================
-- USER PREFERENCES
-- =====================================================================

CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    currency VARCHAR(3) DEFAULT 'FJD',
    language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'Pacific/Fiji',
    measurement_unit VARCHAR(20) DEFAULT 'metric', -- metric, imperial
    notification_email BOOLEAN DEFAULT TRUE,
    notification_sms BOOLEAN DEFAULT FALSE,
    notification_push BOOLEAN DEFAULT TRUE,
    theme VARCHAR(20) DEFAULT 'light', -- light, dark
    preferences JSONB, -- Store additional preferences as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

