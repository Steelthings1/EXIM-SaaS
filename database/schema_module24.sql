-- EXIM.IM SaaS Platform - Module 24: Notifications & In-App Alerts Engine
-- PostgreSQL Database Schemas (notification_sys)

CREATE SCHEMA IF NOT EXISTS notification_sys;

-- 1. In-App Notifications Table
CREATE TABLE IF NOT EXISTS notification_sys.in_app_notifications (
    notification_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('SHIPMENT_STATUS', 'CUSTOMS_ALERT', 'LC_EXPIRY', 'APPROVALS_NEEDED', 'INCENTIVE_SCROLLS')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link_url VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Notification Preferences Table
CREATE TABLE IF NOT EXISTS notification_sys.notification_preferences (
    preference_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL,
    enable_in_app BOOLEAN DEFAULT TRUE,
    enable_email BOOLEAN DEFAULT TRUE,
    enable_sms BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_notif_user ON notification_sys.in_app_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notif_read ON notification_sys.in_app_notifications(is_read);
