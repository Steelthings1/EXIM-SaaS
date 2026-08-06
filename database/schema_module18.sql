-- EXIM.IM SaaS Platform - Module 18: Regulatory & Statutory License Vault
-- PostgreSQL Database Schemas (statutory_sys extensions)

CREATE SCHEMA IF NOT EXISTS statutory_sys;

-- 1. Statutory Licenses Table
CREATE TABLE IF NOT EXISTS statutory_sys.statutory_licenses_v2 (
    license_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_type VARCHAR(50) NOT NULL CHECK (license_type IN ('IEC', 'RCMC', 'AD_CODE', 'APEDA', 'FSSAI', 'ICEGATE_PORT')),
    license_number VARCHAR(100) UNIQUE NOT NULL,
    issuing_authority VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'EXPIRING_SOON', 'EXPIRED')),
    document_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. License Renewal Alerts Table
CREATE TABLE IF NOT EXISTS statutory_sys.license_renewal_alerts (
    alert_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_id UUID REFERENCES statutory_sys.statutory_licenses_v2(license_id) ON DELETE CASCADE,
    days_until_expiry INT NOT NULL,
    alert_level VARCHAR(20) DEFAULT 'WARNING' CHECK (alert_level font-bold IN ('INFO', 'WARNING', 'CRITICAL')),
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lic_type ON statutory_sys.statutory_licenses_v2(license_type);
CREATE INDEX IF NOT EXISTS idx_lic_status ON statutory_sys.statutory_licenses_v2(status);
