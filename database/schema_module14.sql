-- EXIM.IM SaaS Platform - Module 14: Trade Finance, Banking & LC UCP 600 Auditor
-- PostgreSQL Database Schemas (banking_sys and incentive_sys extensions)

CREATE SCHEMA IF NOT EXISTS banking_sys;
CREATE SCHEMA IF NOT EXISTS incentive_sys;

-- 1. Letters of Credit V2 Table
CREATE TABLE IF NOT EXISTS banking_sys.letters_of_credit_v2 (
    lc_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lc_number VARCHAR(100) NOT NULL UNIQUE,
    issuing_bank VARCHAR(255) NOT NULL,
    advising_bank VARCHAR(255) NOT NULL,
    lc_amount_usd NUMERIC(14, 2) NOT NULL,
    expiry_date DATE NOT NULL,
    presentation_period_days INTEGER DEFAULT 21,
    transshipment_allowed BOOLEAN DEFAULT TRUE,
    partial_shipment_allowed BOOLEAN DEFAULT TRUE,
    ucp_discrepancy_count INTEGER DEFAULT 0,
    ucp_discrepancies JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(30) DEFAULT 'AUDITED' CHECK (status IN ('DRAFT', 'AUDITED', 'PRESENTED_TO_BANK', 'ACCEPTED', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. eBRC & EDPMS Reconciliation Table
CREATE TABLE IF NOT EXISTS banking_sys.ebrc_records_v2 (
    ebrc_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ebrc_number VARCHAR(100) NOT NULL UNIQUE,
    shipping_bill_number VARCHAR(100) NOT NULL,
    irm_reference VARCHAR(100) NOT NULL, -- Inward Remittance Reference
    realized_amount_usd NUMERIC(14, 2) NOT NULL,
    realized_amount_inr NUMERIC(14, 2) NOT NULL,
    edpms_closure_status VARCHAR(30) DEFAULT 'CLOSED' CHECK (status IN ('PENDING_IRM', 'MATCHED', 'CLOSED', 'OVERDUE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Export Incentive Claims V2 Table
CREATE TABLE IF NOT EXISTS incentive_sys.export_incentive_claims_v2 (
    claim_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_number VARCHAR(100) NOT NULL UNIQUE,
    shipping_bill_number VARCHAR(100) NOT NULL,
    fob_value_inr NUMERIC(14, 2) NOT NULL,
    rodtep_rate_pct NUMERIC(5, 2) DEFAULT 1.40,
    rodtep_amount_inr NUMERIC(12, 2) NOT NULL,
    drawback_rate_pct NUMERIC(5, 2) DEFAULT 1.50,
    drawback_amount_inr NUMERIC(12, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'SCROLL_GENERATED' CHECK (status IN ('FILED', 'SCROLL_GENERATED', 'CREDITED_TO_E_SCRIP', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lc_number ON banking_sys.letters_of_credit_v2(lc_number);
CREATE INDEX IF NOT EXISTS idx_ebrc_sb ON banking_sys.ebrc_records_v2(shipping_bill_number);
CREATE INDEX IF NOT EXISTS idx_incentive_sb ON incentive_sys.export_incentive_claims_v2(shipping_bill_number);
