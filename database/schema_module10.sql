-- EXIM.IM SaaS Platform - Module 10: International Sales Contracts & AI Legal Auditor
-- PostgreSQL Database Schemas (sales_sys extensions)

CREATE SCHEMA IF NOT EXISTS sales_sys;

-- 1. International Sales Contracts Table
CREATE TABLE IF NOT EXISTS sales_sys.sales_contracts (
    contract_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_number VARCHAR(100) NOT NULL UNIQUE,
    buyer_entity VARCHAR(255) NOT NULL,
    seller_entity VARCHAR(255) NOT NULL,
    incoterm VARCHAR(10) NOT NULL DEFAULT 'CIF',
    governing_law VARCHAR(100) NOT NULL DEFAULT 'UN CISG 1980',
    arbitration_venue VARCHAR(100) NOT NULL DEFAULT 'SIAC Singapore',
    total_value_usd NUMERIC(14, 2) NOT NULL,
    payment_terms VARCHAR(100) NOT NULL DEFAULT 'Irrevocable LC at Sight',
    payment_credit_days INTEGER DEFAULT 0,
    ai_risk_score NUMERIC(5, 2) DEFAULT 0,
    ai_risk_notes TEXT,
    status VARCHAR(30) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PENDING_SIGNATURE', 'EXECUTED', 'TERMINATED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX IF NOT EXISTS idx_contract_number ON sales_sys.sales_contracts(contract_number);
CREATE INDEX IF NOT EXISTS idx_contract_status ON sales_sys.sales_contracts(status);
CREATE INDEX IF NOT EXISTS idx_contract_buyer ON sales_sys.sales_contracts(buyer_entity);
