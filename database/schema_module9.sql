-- EXIM.IM SaaS Platform - Module 9: Export Sales & Quotations Engine
-- PostgreSQL Database Schemas (sales_sys)

CREATE SCHEMA IF NOT EXISTS sales_sys;

-- 1. Sales Quotations Table
CREATE TABLE IF NOT EXISTS sales_sys.sales_quotations (
    quote_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_number VARCHAR(100) NOT NULL UNIQUE,
    buyer_id UUID NOT NULL,
    buyer_name VARCHAR(255) NOT NULL,
    incoterm VARCHAR(10) NOT NULL DEFAULT 'CIF', -- FOB, CIF, CFR, EXW, DDP
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    subtotal_amount NUMERIC(14, 2) NOT NULL,
    freight_amount NUMERIC(14, 2) DEFAULT 0,
    insurance_amount NUMERIC(14, 2) DEFAULT 0,
    total_offer_amount NUMERIC(14, 2) NOT NULL,
    cost_amount NUMERIC(14, 2) NOT NULL,
    gross_profit_amount NUMERIC(14, 2) NOT NULL,
    gross_margin_pct NUMERIC(5, 2) NOT NULL,
    validity_days INTEGER DEFAULT 30,
    valid_until DATE,
    status VARCHAR(30) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX IF NOT EXISTS idx_quote_number ON sales_sys.sales_quotations(quote_number);
CREATE INDEX IF NOT EXISTS idx_quote_status ON sales_sys.sales_quotations(status);
CREATE INDEX IF NOT EXISTS idx_quote_buyer ON sales_sys.sales_quotations(buyer_id);
