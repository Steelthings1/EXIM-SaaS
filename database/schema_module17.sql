-- EXIM.IM SaaS Platform - Module 17: Destination Country Knowledge Base & Market Specs
-- PostgreSQL Database Schemas (kb_sys extensions)

CREATE SCHEMA IF NOT EXISTS kb_sys;

-- 1. Country Profiles Table
CREATE TABLE IF NOT EXISTS kb_sys.country_profiles_v2 (
    profile_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_code VARCHAR(10) UNIQUE NOT NULL,
    country_name VARCHAR(100) NOT NULL,
    customs_authority VARCHAR(255) NOT NULL,
    avg_import_duty_pct NUMERIC(5, 2) DEFAULT 0.00,
    standard_vat_pct NUMERIC(5, 2) DEFAULT 0.00,
    dual_language_mandate VARCHAR(100) DEFAULT 'ENGLISH_ONLY',
    ispm15_pallet_required BOOLEAN DEFAULT TRUE,
    fta_agreements JSONB DEFAULT '[]'::jsonb,
    restricted_items JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX IF NOT EXISTS idx_country_code ON kb_sys.country_profiles_v2(country_code);
