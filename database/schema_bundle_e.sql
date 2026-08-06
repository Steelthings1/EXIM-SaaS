-- EXIM.IM SaaS Platform - Bundle E: Trade Finance, Banking, LC Checker, eBRC Reconciliation & Export Incentives
-- PostgreSQL Database Schemas (finance_sys, banking_sys, incentive_sys)

CREATE SCHEMA IF NOT EXISTS finance_sys;
CREATE SCHEMA IF NOT EXISTS banking_sys;
CREATE SCHEMA IF NOT EXISTS incentive_sys;

-- 1. Letters of Credit (LC) UCP 600 Registry Table
CREATE TABLE IF NOT EXISTS banking_sys.letters_of_credit (
    lc_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    lc_number VARCHAR(100) NOT NULL UNIQUE, -- e.g., LC-SWIFT-2026-904
    issuing_bank VARCHAR(255) NOT NULL, -- e.g., First Abu Dhabi Bank / HSBC Dubai
    advising_bank VARCHAR(255) NOT NULL, -- e.g., State Bank of India CAG Branch
    lc_amount_usd NUMERIC(12, 2) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    latest_shipment_date DATE NOT NULL,
    partial_shipments_allowed BOOLEAN DEFAULT TRUE,
    transshipment_allowed BOOLEAN DEFAULT FALSE,
    presentation_period_days INT DEFAULT 21,
    governing_rules VARCHAR(50) DEFAULT 'UCP_600',
    discrepancies_count INT DEFAULT 0,
    status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('DRAFT', 'ISSUED', 'DOCS_PRESENTED', 'HONORED', 'EXPIRED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. eBRC & EDPMS Inward Remittance Reconciliation Table
CREATE TABLE IF NOT EXISTS banking_sys.ebrc_records (
    ebrc_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    ebrc_number VARCHAR(100) NOT NULL UNIQUE, -- e.g., EBRC-2026-SBI-8812
    shipping_bill_number VARCHAR(100) NOT NULL, -- e.g., SB-ICEGATE-2026-904128
    shipping_bill_date DATE NOT NULL,
    irm_reference VARCHAR(100) NOT NULL, -- Inward Remittance Reference IRM #
    fob_value_fc NUMERIC(12, 2) NOT NULL,
    realized_amount_fc NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    exchange_rate_realized NUMERIC(8, 4) DEFAULT 83.50,
    realized_amount_inr NUMERIC(14, 2) NOT NULL,
    rbi_edpms_status VARCHAR(30) DEFAULT 'CLOSED' CHECK (rbi_edpms_status IN ('PENDING_IRM', 'PARTIALLY_REALIZED', 'CLOSED', 'DEFAULTED')),
    ebrc_pdf_url VARCHAR(1000),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Multi-Currency Commercial Invoices Table
CREATE TABLE IF NOT EXISTS finance_sys.invoices (
    invoice_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    invoice_number VARCHAR(100) NOT NULL UNIQUE, -- e.g., INV-EXIM-2026-0091
    buyer_id UUID NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    invoice_amount_fc NUMERIC(12, 2) NOT NULL,
    booking_exchange_rate NUMERIC(8, 4) DEFAULT 83.00,
    realized_exchange_rate NUMERIC(8, 4),
    forex_gain_loss_inr NUMERIC(12, 2) DEFAULT 0.00,
    status VARCHAR(30) DEFAULT 'ISSUED' CHECK (status IN ('DRAFT', 'ISSUED', 'PAID', 'OVERDUE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Export Incentive Claims Ledger Table (RoDTEP & Duty Drawback)
CREATE TABLE IF NOT EXISTS incentive_sys.export_incentive_claims (
    claim_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    shipping_bill_number VARCHAR(100) NOT NULL,
    fob_value_usd NUMERIC(12, 2) NOT NULL,
    fob_value_inr NUMERIC(14, 2) NOT NULL,
    rodtep_rate_pct NUMERIC(5, 2) DEFAULT 1.40,
    rodtep_amount_inr NUMERIC(12, 2) NOT NULL,
    drawback_rate_pct NUMERIC(5, 2) DEFAULT 1.50,
    drawback_amount_inr NUMERIC(12, 2) NOT NULL,
    dgft_scrip_status VARCHAR(30) DEFAULT 'CREDITED' CHECK (dgft_scrip_status IN ('SCROLL_GENERATED', 'CREDITED', 'UTILIZED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_lc_num ON banking_sys.letters_of_credit(lc_number);
CREATE INDEX IF NOT EXISTS idx_ebrc_sb ON banking_sys.ebrc_records(shipping_bill_number);
CREATE INDEX IF NOT EXISTS idx_invoices_num ON finance_sys.invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_incentive_sb ON incentive_sys.export_incentive_claims(shipping_bill_number);
