-- EXIM.IM SaaS Platform - Module 19: Developer API Center & Webhooks
-- PostgreSQL Database Schemas (api_sys extensions)

CREATE SCHEMA IF NOT EXISTS api_sys;

-- 1. Developer Keys Table
CREATE TABLE IF NOT EXISTS api_sys.developer_keys_v2 (
    key_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key_name VARCHAR(100) NOT NULL,
    key_prefix VARCHAR(30) NOT NULL,
    key_hash VARCHAR(255) NOT NULL,
    rate_limit_per_min INT DEFAULT 1000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP WITH TIME ZONE
);

-- 2. Webhook Subscriptions Table
CREATE TABLE IF NOT EXISTS api_sys.webhook_subscriptions_v2 (
    subscription_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    target_url VARCHAR(500) NOT NULL,
    subscribed_events JSONB DEFAULT '["shipment.updated", "customs.cleared", "ebrc.issued"]'::jsonb,
    secret_hmac_key VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_dev_key_prefix ON api_sys.developer_keys_v2(key_prefix);
CREATE INDEX IF NOT EXISTS idx_wh_active ON api_sys.webhook_subscriptions_v2(is_active);
