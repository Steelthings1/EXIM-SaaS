-- EXIM.IM SaaS Platform - Module 8: Procurement & Vendor Purchase Orders Engine
-- PostgreSQL Database Schemas (procurement_sys)

CREATE SCHEMA IF NOT EXISTS procurement_sys;

-- 1. Purchase Orders Table
CREATE TABLE IF NOT EXISTS procurement_sys.purchase_orders (
    po_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    po_number VARCHAR(100) NOT NULL UNIQUE,
    supplier_id UUID NOT NULL,
    supplier_name VARCHAR(255) NOT NULL,
    line_items JSONB NOT NULL, -- [{'sku': 'RM-COFFEE', 'qty': 1000, 'unit_price_inr': 450}]
    total_amount_inr NUMERIC(12, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'ISSUED' CHECK (status IN ('ISSUED', 'CONFIRMED', 'FULFILLED', 'CANCELLED')),
    expected_delivery_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Goods Receipt Notes (GRN) Inward Inspection Table
CREATE TABLE IF NOT EXISTS procurement_sys.po_receipts (
    grn_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grn_number VARCHAR(100) NOT NULL UNIQUE,
    po_id UUID NOT NULL,
    received_qty NUMERIC(12, 4) NOT NULL,
    accepted_qty NUMERIC(12, 4) NOT NULL,
    rejected_qty NUMERIC(12, 4) DEFAULT 0,
    inspection_notes TEXT,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX IF NOT EXISTS idx_po_number ON procurement_sys.purchase_orders(po_number);
CREATE INDEX IF NOT EXISTS idx_grn_po ON procurement_sys.po_receipts(po_id);
