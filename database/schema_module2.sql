-- EXIM.IM SaaS Platform - Module 2: Compliance, HS Code & Regulatory Engine
-- PostgreSQL Database Schema (compliance_sys)

CREATE SCHEMA IF NOT EXISTS compliance_sys;

-- 1. HS Tariff Codes Table (WCO 6-digit base + National Sub-headings)
CREATE TABLE IF NOT EXISTS compliance_sys.hs_codes (
    hs_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hs_code VARCHAR(12) NOT NULL UNIQUE, -- e.g., 0901.21.00 (Coffee), 8517.13.00 (Smartphones)
    chapter VARCHAR(2) NOT NULL, -- e.g., 09, 85
    heading VARCHAR(4) NOT NULL, -- e.g., 0901, 8517
    subheading VARCHAR(6) NOT NULL, -- e.g., 090121, 851713
    description TEXT NOT NULL,
    uom VARCHAR(20) DEFAULT 'KGS', -- Unit of Measure
    std_duty_rate NUMERIC(5, 2) DEFAULT 7.50, -- Standard BCD %
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Country Regulatory Rules & Mandates Table
CREATE TABLE IF NOT EXISTS compliance_sys.country_regulatory_rules (
    rule_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_code VARCHAR(3) NOT NULL, -- ISO 3-letter (e.g., UAE, USA, DEU, GBR, AUS)
    hs_code_prefix VARCHAR(6) NOT NULL, -- Matched against HS Subheading
    mandatory_certificates JSONB NOT NULL, -- ["Phytosanitary", "Certificate of Analysis", "Halal"]
    packaging_mandates TEXT NOT NULL,
    labeling_rules TEXT NOT NULL,
    restricted_status VARCHAR(30) DEFAULT 'PERMITTED' CHECK (restricted_status IN ('PERMITTED', 'RESTRICTED_PERMIT_REQUIRED', 'PROHIBITED')),
    issuing_authority VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Trade Agreements Table (FTAs)
CREATE TABLE IF NOT EXISTS compliance_sys.trade_agreements (
    agreement_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agreement_code VARCHAR(50) NOT NULL UNIQUE, -- e.g., INDIA_UAE_CEPA, IND_AUS_ECTA, ASEAN_AIFTA
    agreement_name VARCHAR(255) NOT NULL,
    exporter_country VARCHAR(3) NOT NULL,
    importer_country VARCHAR(3) NOT NULL,
    effective_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 4. Preferential Tariffs Schedule Table
CREATE TABLE IF NOT EXISTS compliance_sys.preferential_tariffs (
    pref_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agreement_code VARCHAR(50) NOT NULL REFERENCES compliance_sys.trade_agreements(agreement_code) ON DELETE CASCADE,
    hs_code VARCHAR(12) NOT NULL,
    preferential_duty_rate NUMERIC(5, 2) NOT NULL, -- e.g., 0.00% under CEPA
    rule_of_origin TEXT NOT NULL, -- e.g., "Wholly Obtained or CTH with 40% Value Addition"
    coo_certificate_type VARCHAR(100) NOT NULL -- e.g., "Preferential Certificate of Origin Form A"
);

-- 5. Sanctions & Denied Parties Registry Table
CREATE TABLE IF NOT EXISTS compliance_sys.sanctions_denied_parties (
    entity_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_name VARCHAR(255) NOT NULL,
    aliases JSONB DEFAULT '[]'::jsonb,
    registry_source VARCHAR(50) NOT NULL CHECK (registry_source IN ('OFAC_SDN', 'UN_SECURITY_COUNCIL', 'EU_SANCTIONS', 'UK_HMT', 'DGFT_DENIED')),
    program_type VARCHAR(100), -- e.g., "CYBER", "RUSSIA-EO14024", "COUNTER-NARCOTICS"
    country VARCHAR(3),
    address VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Compliance Screening Audit Logs Table
CREATE TABLE IF NOT EXISTS compliance_sys.compliance_audit_logs (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    user_id UUID,
    query_type VARCHAR(50) NOT NULL CHECK (query_type IN ('HS_CLASSIFY', 'REGULATORY_CHECK', 'DUTY_CALC', 'SANCTIONS_SCREEN')),
    query_payload JSONB NOT NULL,
    response_summary JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_hs_codes_prefix ON compliance_sys.hs_codes(subheading);
CREATE INDEX IF NOT EXISTS idx_country_rules_lookup ON compliance_sys.country_regulatory_rules(country_code, hs_code_prefix);
CREATE INDEX IF NOT EXISTS idx_preferential_tariffs_hs ON compliance_sys.preferential_tariffs(agreement_code, hs_code);
CREATE INDEX IF NOT EXISTS idx_sanctions_name ON compliance_sys.sanctions_denied_parties(entity_name);
