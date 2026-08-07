-- EXIM.IM SaaS Platform - Module 27: Workspace Settings, Branding & System Configuration Schema
-- Creates workspace_config_v2 table under org_sys schema

CREATE SCHEMA IF NOT EXISTS org_sys;

-- Workspace Config V2 Table
CREATE TABLE IF NOT EXISTS org_sys.workspace_config_v2 (
    config_id VARCHAR(64) PRIMARY KEY DEFAULT 'cfg-v2-main',
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'org-main',
    default_currency VARCHAR(8) NOT NULL DEFAULT 'INR',
    system_timezone VARCHAR(64) NOT NULL DEFAULT 'Asia/Kolkata',
    regional_tax_system VARCHAR(32) NOT NULL DEFAULT 'INDIA_GST', -- INDIA_GST, UAE_VAT, US_SALES_TAX, UK_EU_VAT
    custom_subdomain VARCHAR(128) DEFAULT 'trade.steelthings.com',
    logo_url TEXT,
    letterhead_header_text TEXT,
    letterhead_footer_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
