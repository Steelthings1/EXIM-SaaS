-- EXIM.IM SaaS Platform - Bundle B: Commercial Workflow, Quotations, Contracts & 26-Step Pipeline Engine
-- PostgreSQL Database Schemas (sales_sys, procurement_sys, workflow_sys)

CREATE SCHEMA IF NOT EXISTS sales_sys;
CREATE SCHEMA IF NOT EXISTS procurement_sys;
CREATE SCHEMA IF NOT EXISTS workflow_sys;

-- 1. Export Quotations & Proforma Invoices Table
CREATE TABLE IF NOT EXISTS sales_sys.quotations (
    quotation_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    quotation_number VARCHAR(100) NOT NULL UNIQUE, -- e.g., PROF-2026-8801
    buyer_id UUID NOT NULL,
    incoterms VARCHAR(10) DEFAULT 'FOB',
    currency VARCHAR(3) DEFAULT 'USD',
    validity_date DATE NOT NULL,
    subtotal_usd NUMERIC(12, 2) NOT NULL,
    estimated_freight_usd NUMERIC(12, 2) DEFAULT 0.00,
    total_cif_usd NUMERIC(12, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'ISSUED' CHECK (status IN ('DRAFT', 'ISSUED', 'ACCEPTED', 'EXPIRED', 'CONVERTED_TO_CONTRACT')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. International Sales Contracts Table (UN CISG 1980 Compliant)
CREATE TABLE IF NOT EXISTS sales_sys.contracts (
    contract_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    contract_number VARCHAR(100) NOT NULL UNIQUE, -- e.g., EXIM-CONTRACT-2026-004
    quotation_id UUID REFERENCES sales_sys.quotations(quotation_id),
    buyer_id UUID NOT NULL,
    seller_id UUID NOT NULL,
    governing_law VARCHAR(100) DEFAULT 'UN_CISG_1980', -- United Nations Convention on Contracts for International Sale of Goods
    arbitration_forum VARCHAR(100) DEFAULT 'SIAC_SINGAPORE', -- e.g., SIAC, LCIA, MCIA, ICC Paris
    incoterms VARCHAR(10) DEFAULT 'CIF',
    payment_terms TEXT NOT NULL,
    risk_score INT DEFAULT 15, -- AI Risk Audit Score (0-100)
    status VARCHAR(30) DEFAULT 'EXECUTED' CHECK (status IN ('DRAFT', 'UNDER_AI_REVIEW', 'EXECUTED', 'TERMINATED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Vendor Purchase Orders Table
CREATE TABLE IF NOT EXISTS procurement_sys.purchase_orders (
    po_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    po_number VARCHAR(100) NOT NULL UNIQUE, -- e.g., PO-VENDOR-2026-104
    supplier_id UUID NOT NULL,
    total_amount_usd NUMERIC(12, 2) NOT NULL,
    delivery_date DATE,
    status VARCHAR(30) DEFAULT 'ISSUED' CHECK (status IN ('DRAFT', 'ISSUED', 'ACKNOWLEDGED', 'FULFILLED', 'CANCELLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Visual 26-Step Trade Pipeline Instances Table
CREATE TABLE IF NOT EXISTS workflow_sys.pipeline_instances (
    pipeline_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    order_number VARCHAR(100) NOT NULL UNIQUE,
    current_stage_index INT DEFAULT 1 CHECK (current_stage_index BETWEEN 1 AND 26),
    current_stage_code VARCHAR(100) NOT NULL,
    current_stage_name VARCHAR(255) NOT NULL,
    progress_pct NUMERIC(5, 2) DEFAULT 4.0,
    stage_history JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_quotations_buyer ON sales_sys.quotations(buyer_id);
CREATE INDEX IF NOT EXISTS idx_contracts_num ON sales_sys.contracts(contract_number);
CREATE INDEX IF NOT EXISTS idx_po_supplier ON procurement_sys.purchase_orders(supplier_id);
CREATE INDEX IF NOT EXISTS idx_pipeline_order ON workflow_sys.pipeline_instances(order_number);
