-- EXIM.IM SaaS Platform - Module 13: Marine Cargo Insurance & Policy Vault Engine
-- PostgreSQL Database Schemas (insurance_sys extensions)

CREATE SCHEMA IF NOT EXISTS insurance_sys;

-- 1. Marine Cargo Policies Table
CREATE TABLE IF NOT EXISTS insurance_sys.cargo_policies (
    policy_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    policy_number VARCHAR(100) NOT NULL UNIQUE,
    order_id UUID NOT NULL,
    insurer_name VARCHAR(255) NOT NULL, -- e.g. Lloyd's of London, ICICI Lombard, Allianz
    clause_type VARCHAR(20) NOT NULL DEFAULT 'CLAUSE_A' CHECK (clause_type IN ('CLAUSE_A', 'CLAUSE_B', 'CLAUSE_C')),
    cif_order_value_usd NUMERIC(14, 2) NOT NULL,
    sum_insured_usd NUMERIC(14, 2) NOT NULL, -- 110% of CIF value
    premium_rate_pct NUMERIC(5, 4) NOT NULL, -- e.g., 0.30%
    premium_amount_usd NUMERIC(12, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('DRAFT', 'ACTIVE', 'EXPIRED', 'CLAIM_PENDING', 'CANCELLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Cargo Damage Claims Table
CREATE TABLE IF NOT EXISTS insurance_sys.cargo_claims (
    claim_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_number VARCHAR(100) NOT NULL UNIQUE,
    policy_id UUID NOT NULL,
    surveyor_loss_description TEXT NOT NULL,
    claimed_amount_usd NUMERIC(12, 2) NOT NULL,
    settled_amount_usd NUMERIC(12, 2) DEFAULT 0,
    status VARCHAR(30) DEFAULT 'UNDER_SURVEY' CHECK (status IN ('LODGED', 'UNDER_SURVEY', 'APPROVED', 'SETTLED', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX IF NOT EXISTS idx_policy_number ON insurance_sys.cargo_policies(policy_number);
CREATE INDEX IF NOT EXISTS idx_claim_policy ON insurance_sys.cargo_claims(policy_id);
