-- EXIM.IM SaaS Platform - Module 21: Banking, LC UCP 600 Auditor & EDPMS Reconciliation
-- PostgreSQL Database Schemas (banking_sys extensions)

CREATE SCHEMA IF NOT EXISTS banking_sys;

-- 1. LC Audits V3 Table
CREATE TABLE IF NOT EXISTS banking_sys.lc_audits_v3 (
    audit_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lc_number VARCHAR(100) UNIQUE NOT NULL,
    issuing_bank VARCHAR(255) NOT NULL,
    advising_bank VARCHAR(255) NOT NULL,
    lc_amount_usd NUMERIC(15, 2) NOT NULL,
    latest_shipment_date DATE NOT NULL,
    presentation_period_days INT DEFAULT 21,
    allow_transshipment BOOLEAN DEFAULT FALSE,
    discrepancy_findings JSONB DEFAULT '[]'::jsonb,
    is_compliant BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. EDPMS Closures V3 Table
CREATE TABLE IF NOT EXISTS banking_sys.edpms_closures_v3 (
    closure_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ebrc_number VARCHAR(100) UNIQUE NOT NULL,
    shipping_bill_number VARCHAR(100) NOT NULL,
    port_code VARCHAR(20) NOT NULL DEFAULT 'INNSA1',
    fob_value_inr NUMERIC(15, 2) NOT NULL,
    irm_reference VARCHAR(100) NOT NULL,
    realized_amount_usd NUMERIC(15, 2) NOT NULL,
    edpms_status VARCHAR(30) DEFAULT 'CLOSED' CHECK (edpms_status IN ('OPEN', 'PARTIALLY_CLOSED', 'CLOSED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lc_num_v3 ON banking_sys.lc_audits_v3(lc_number);
CREATE INDEX IF NOT EXISTS idx_edpms_sb_v3 ON banking_sys.edpms_closures_v3(shipping_bill_number);
