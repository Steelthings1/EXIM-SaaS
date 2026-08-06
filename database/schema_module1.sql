-- EXIM.IM SaaS Platform - Module 1: Business Profile & Multi-Tenant Setup
-- PostgreSQL Database Schema (org_sys)

CREATE SCHEMA IF NOT EXISTS org_sys;

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Organizations Table (Tenants)
CREATE TABLE IF NOT EXISTS org_sys.organizations (
    org_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    legal_name VARCHAR(255) NOT NULL,
    trade_name VARCHAR(255),
    entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('PRIVATE_LIMITED', 'PUBLIC_LIMITED', 'PROPRIETORSHIP', 'PARTNERSHIP', 'LLP', 'FOREIGN_BRANCH')),
    tax_id_gstin VARCHAR(15) UNIQUE,
    iec_code VARCHAR(10) UNIQUE,
    eori_number VARCHAR(20) UNIQUE,
    pan_number VARCHAR(10) UNIQUE,
    default_currency VARCHAR(3) DEFAULT 'USD',
    subscription_tier VARCHAR(50) DEFAULT 'ENTERPRISE_TIER_1' CHECK (subscription_tier IN ('FREE_STARTER', 'GROWTH', 'ENTERPRISE_TIER_1', 'ENTERPRISE_CUSTOM')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Entities Table (Legal Entities under Organization)
CREATE TABLE IF NOT EXISTS org_sys.entities (
    entity_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES org_sys.organizations(org_id) ON DELETE CASCADE,
    legal_name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) NOT NULL,
    country VARCHAR(3) NOT NULL DEFAULT 'IND', -- ISO-3 country code
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Operating Branches Table
CREATE TABLE IF NOT EXISTS org_sys.branches (
    branch_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES org_sys.organizations(org_id) ON DELETE CASCADE,
    entity_id UUID REFERENCES org_sys.entities(entity_id) ON DELETE CASCADE,
    branch_code VARCHAR(20) NOT NULL,
    branch_name VARCHAR(255) NOT NULL,
    port_code VARCHAR(10), -- e.g., INNSA1 (Nhava Sheva), INMAA1 (Chennai)
    is_head_office BOOLEAN DEFAULT FALSE,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(3) NOT NULL DEFAULT 'IND',
    postal_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(org_id, branch_code)
);

-- 4. Warehouses & ICD Registry Table
CREATE TABLE IF NOT EXISTS org_sys.warehouses (
    warehouse_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES org_sys.organizations(org_id) ON DELETE CASCADE,
    branch_id UUID REFERENCES org_sys.branches(branch_id) ON DELETE SET NULL,
    warehouse_name VARCHAR(255) NOT NULL,
    warehouse_type VARCHAR(50) NOT NULL CHECK (warehouse_type IN ('BONDED_CUSTOMS', 'INLAND_CONTAINER_DEPOT', 'PRIVATE_COLD_STORAGE', 'GENERAL_CARGO', 'FTWZ')),
    icd_code VARCHAR(20), -- e.g., ICD Tughlakabad (INTKD6)
    port_code VARCHAR(10),
    is_bonded BOOLEAN DEFAULT FALSE,
    customs_registration_no VARCHAR(100),
    address VARCHAR(500) NOT NULL,
    storage_capacity_sqft NUMERIC(12, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Statutory Identity & License Vault Table
CREATE TABLE IF NOT EXISTS org_sys.statutory_licenses (
    license_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES org_sys.organizations(org_id) ON DELETE CASCADE,
    license_type VARCHAR(50) NOT NULL CHECK (license_type IN ('GSTIN', 'IEC', 'EORI', 'PAN', 'FSSAI', 'APEDA', 'REX_EU', 'CUSDEC_PERMIT')),
    license_number VARCHAR(100) NOT NULL,
    issuing_authority VARCHAR(255) NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    status VARCHAR(30) DEFAULT 'PENDING_VERIFICATION' CHECK (status IN ('VERIFIED', 'PENDING_VERIFICATION', 'EXPIRED', 'REJECTED')),
    document_url VARCHAR(1000),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(org_id, license_type, license_number)
);

-- 6. Organization Members Table (Users & Role Assignment)
CREATE TABLE IF NOT EXISTS org_sys.org_members (
    member_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES org_sys.organizations(org_id) ON DELETE CASCADE,
    user_id UUID NOT NULL, -- References auth.users(id)
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN (
        'SUPER_ADMIN', 'ORG_OWNER', 'EXPORT_MANAGER', 'IMPORT_MANAGER', 
        'COMPLIANCE_OFFICER', 'CUSTOMS_BROKER', 'FREIGHT_FORWARDER', 
        'ACCOUNTS_MANAGER', 'AUDITOR', 'WAREHOUSE_MANAGER', 'LOGISTICS_COORDINATOR', 
        'DOCUMENTATION_SPECIALIST', 'PROCUREMENT_OFFICER', 'SALES_MANAGER', 
        'LEGAL_COUNSEL', 'QUALITY_INSPECTOR', 'TRADE_CONSULTANT', 'BANK_LC_SPECIALIST', 'VIEWER'
    )),
    status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('INVITED', 'ACTIVE', 'SUSPENDED')),
    invited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    joined_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(org_id, email)
);

-- 7. Audit Trail Logs Table
CREATE TABLE IF NOT EXISTS org_sys.audit_logs (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES org_sys.organizations(org_id) ON DELETE CASCADE,
    user_id UUID,
    user_email VARCHAR(255),
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Automated updated_at Trigger Function
CREATE OR REPLACE FUNCTION org_sys.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply Triggers
CREATE TRIGGER trg_orgs_updated_at BEFORE UPDATE ON org_sys.organizations FOR EACH ROW EXECUTE FUNCTION org_sys.update_timestamp();
CREATE TRIGGER trg_entities_updated_at BEFORE UPDATE ON org_sys.entities FOR EACH ROW EXECUTE FUNCTION org_sys.update_timestamp();
CREATE TRIGGER trg_branches_updated_at BEFORE UPDATE ON org_sys.branches FOR EACH ROW EXECUTE FUNCTION org_sys.update_timestamp();
CREATE TRIGGER trg_warehouses_updated_at BEFORE UPDATE ON org_sys.warehouses FOR EACH ROW EXECUTE FUNCTION org_sys.update_timestamp();
CREATE TRIGGER trg_licenses_updated_at BEFORE UPDATE ON org_sys.statutory_licenses FOR EACH ROW EXECUTE FUNCTION org_sys.update_timestamp();
CREATE TRIGGER trg_members_updated_at BEFORE UPDATE ON org_sys.org_members FOR EACH ROW EXECUTE FUNCTION org_sys.update_timestamp();

-- Index Optimizations
CREATE INDEX IF NOT EXISTS idx_org_members_org_user ON org_sys.org_members(org_id, user_id);
CREATE INDEX IF NOT EXISTS idx_branches_org ON org_sys.branches(org_id);
CREATE INDEX IF NOT EXISTS idx_warehouses_org ON org_sys.warehouses(org_id);
CREATE INDEX IF NOT EXISTS idx_licenses_org ON org_sys.statutory_licenses(org_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_org_created ON org_sys.audit_logs(org_id, created_at DESC);
