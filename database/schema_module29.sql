-- EXIM.IM SaaS Platform - Module 29: API Center & Developer Portal Schema
-- Creates schema extensions and tables for developer_api_keys_v3 and webhook_event_subscriptions_v3

CREATE SCHEMA IF NOT EXISTS api_sys;

-- Developer API Keys V3 Table
CREATE TABLE IF NOT EXISTS api_sys.developer_api_keys_v3 (
    key_id VARCHAR(64) PRIMARY KEY,
    key_name VARCHAR(255) NOT NULL,
    key_prefix VARCHAR(32) NOT NULL, -- e.g. exim_live_9041...
    key_hash VARCHAR(64) NOT NULL,
    rate_limit_per_min INT NOT NULL DEFAULT 1000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP WITH TIME ZONE
);

-- Webhook Event Subscriptions V3 Table
CREATE TABLE IF NOT EXISTS api_sys.webhook_event_subscriptions_v3 (
    subscription_id VARCHAR(64) PRIMARY KEY,
    target_url TEXT NOT NULL,
    events JSONB NOT NULL DEFAULT '["shipment.updated", "customs.cleared", "ebrc.issued"]'::jsonb,
    hmac_secret VARCHAR(64) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_api_keys_prefix ON api_sys.developer_api_keys_v3(key_prefix);
CREATE INDEX IF NOT EXISTS idx_webhooks_active ON api_sys.webhook_event_subscriptions_v3(is_active);
