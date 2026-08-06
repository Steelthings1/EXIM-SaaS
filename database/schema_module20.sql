-- EXIM.IM SaaS Platform - Module 20: Multi-Currency Finance, Forex Treasury & Invoicing
-- PostgreSQL Database Schemas (finance_sys extensions)

CREATE SCHEMA IF NOT EXISTS finance_sys;

-- 1. Commercial Invoices V2 Table
CREATE TABLE IF NOT EXISTS finance_sys.commercial_invoices_v2 (
    invoice_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    buyer_name VARCHAR(255) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    foreign_amount NUMERIC(15, 2) NOT NULL,
    invoice_exchange_rate NUMERIC(10, 4) NOT NULL, -- Rate at date of invoice (e.g. 83.50 INR/USD)
    base_amount_inr NUMERIC(15, 2) NOT NULL,
    lut_reference VARCHAR(100) DEFAULT 'LUT-GST-2026-9041', -- Zero-Rated Export LUT
    is_lut_zero_rated BOOLEAN DEFAULT TRUE,
    payment_status VARCHAR(30) DEFAULT 'UNPAID' CHECK (payment_status IN ('UNPAID', 'PARTIALLY_PAID', 'REALIZED_PAID')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Forex Realizations Table
CREATE TABLE IF NOT EXISTS finance_sys.forex_realizations (
    realization_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES finance_sys.commercial_invoices_v2(invoice_id) ON DELETE CASCADE,
    realized_date DATE NOT NULL,
    foreign_amount_received NUMERIC(15, 2) NOT NULL,
    bank_realized_exchange_rate NUMERIC(10, 4) NOT NULL, -- Rate when bank converts remittance (e.g. 84.10 INR/USD)
    realized_amount_inr NUMERIC(15, 2) NOT NULL,
    realized_fx_gain_loss_inr NUMERIC(15, 2) NOT NULL, -- Realized Gain (+)/Loss (-) in INR
    irm_reference VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_inv_num ON finance_sys.commercial_invoices_v2(invoice_number);
CREATE INDEX IF NOT EXISTS idx_fx_inv ON finance_sys.forex_realizations(invoice_id);
