-- EXIM.IM SaaS Platform - Module 25: Settings, Tenant System Configuration & Audit Logs
-- PostgreSQL Database Schemas (org_sys extensions)

CREATE SCHEMA IF NOT EXISTS org_sys;

-- 1. Workspace Settings Table
CREATE TABLE IF NOT EXISTS org_sys.workspace_settings (
    setting_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL,
    default_currency VARCHAR(10) DEFAULT 'INR',
    system_timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
    default_language VARCHAR(10) DEFAULT 'en',
    custom_domain VARCHAR(255),
    logo_url TEXT,
    document_header_text TEXT,
    document_footer_text TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Security Audit Trail Table
CREATE TABLE IF NOT EXISTS org_sys.security_audit_trail (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    modified_fields JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(50) NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audit_user ON org_sys.security_audit_trail(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON org_sys.security_audit_trail(user_action);
