-- EXIM.IM SaaS Platform - Bundle F: AI Copilot, 10-Dashboard Analytics, Developer API & Ecosystem Marketplace
-- PostgreSQL Database Schemas (kb_sys, analytics_sys, api_sys, marketplace_sys)

CREATE SCHEMA IF NOT EXISTS kb_sys;
CREATE SCHEMA IF NOT EXISTS analytics_sys;
CREATE SCHEMA IF NOT EXISTS api_sys;
CREATE SCHEMA IF NOT EXISTS marketplace_sys;

-- 1. Destination Country Regulatory Profiles Table
CREATE TABLE IF NOT EXISTS kb_sys.country_profiles (
    profile_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_code VARCHAR(3) NOT NULL UNIQUE, -- e.g., ARE, USA, DEU, GBR
    country_name VARCHAR(100) NOT NULL,
    customs_authority VARCHAR(255) NOT NULL, -- e.g., Dubai Customs / US CBP / Zoll
    mandatory_certs JSONB DEFAULT '[]'::jsonb, -- ['PHYTOSANITARY', 'HALAL', 'CoA']
    food_labeling_rules TEXT NOT NULL,
    fta_agreements JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Developer API Keys Table
CREATE TABLE IF NOT EXISTS api_sys.api_keys (
    key_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    api_key_name VARCHAR(100) NOT NULL,
    api_key_prefix VARCHAR(20) NOT NULL, -- e.g., exim_live_...
    key_secret_hash VARCHAR(255) NOT NULL,
    rate_limit_per_min INT DEFAULT 120,
    status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'REVOKED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Webhook Subscriptions Table (HMAC SHA-256 Event Signatures)
CREATE TABLE IF NOT EXISTS api_sys.webhooks (
    webhook_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    target_url VARCHAR(1000) NOT NULL,
    secret_key VARCHAR(255) NOT NULL,
    subscribed_events JSONB DEFAULT '["order.created", "shipment.dispatched", "ebrc.issued"]'::jsonb,
    status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PAUSED', 'DISABLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Ecosystem Marketplace Directory Partners Table
CREATE TABLE IF NOT EXISTS marketplace_sys.partners (
    partner_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_name VARCHAR(255) NOT NULL,
    partner_type VARCHAR(50) NOT NULL CHECK (partner_type IN ('CHA_CUSTOMS_BROKER', 'FREIGHT_FORWARDER', 'NABL_TESTING_LAB', 'MARINE_INSURER', 'TRADE_FINANCE_BANK')),
    rating NUMERIC(3, 2) DEFAULT 4.90,
    service_locations JSONB DEFAULT '["INNSA", "INTKD", "AEDXB"]'::jsonb,
    contact_email VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_country_code ON kb_sys.country_profiles(country_code);
CREATE INDEX IF NOT EXISTS idx_api_key_org ON api_sys.api_keys(org_id);
CREATE INDEX IF NOT EXISTS idx_partner_type ON marketplace_sys.partners(partner_type);
