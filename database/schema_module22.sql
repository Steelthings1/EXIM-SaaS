-- EXIM.IM SaaS Platform - Module 22: Export Incentive Realization Ledger
-- PostgreSQL Database Schemas (incentive_sys extensions)

CREATE SCHEMA IF NOT EXISTS incentive_sys;

-- 1. Export Incentive Claims V3 Table
CREATE TABLE IF NOT EXISTS incentive_sys.export_incentive_claims_v3 (
    claim_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_number VARCHAR(100) UNIQUE NOT NULL,
    shipping_bill_number VARCHAR(100) NOT NULL,
    scheme_type VARCHAR(50) NOT NULL CHECK (scheme_type IN ('RODTEP', 'ROSCTL', 'DUTY_DRAWBACK', 'ADVANCE_AUTHORIZATION')),
    fob_value_inr NUMERIC(15, 2) NOT NULL,
    incentive_rate_pct NUMERIC(5, 2) NOT NULL,
    claim_amount_inr NUMERIC(15, 2) NOT NULL,
    scroll_number VARCHAR(100),
    claim_status VARCHAR(30) DEFAULT 'CLAIM_GENERATED' CHECK (claim_status IN ('CLAIM_GENERATED', 'SCROLL_ISSUED', 'CREDIT_CREDITED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. e-Scrip Trading Ledger Table
CREATE TABLE IF NOT EXISTS incentive_sys.escrip_trading_ledger (
    escrip_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scroll_number VARCHAR(100) UNIQUE NOT NULL,
    scheme_type VARCHAR(50) NOT NULL,
    issued_credit_inr NUMERIC(15, 2) NOT NULL,
    utilized_credit_inr NUMERIC(15, 2) DEFAULT 0.00,
    available_balance_inr NUMERIC(15, 2) NOT NULL,
    expiration_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_inc_sb_v3 ON incentive_sys.export_incentive_claims_v3(shipping_bill_number);
CREATE INDEX IF NOT EXISTS idx_escrip_scroll ON incentive_sys.escrip_trading_ledger(scroll_number);
