-- EXIM.IM SaaS Platform - Module 3: Product Catalog & Single-Data-Entry Document Engine
-- PostgreSQL Database Schemas (product_sys, doc_sys)

CREATE SCHEMA IF NOT EXISTS product_sys;
CREATE SCHEMA IF NOT EXISTS doc_sys;

-- 1. Bill of Materials (BOM) Raw Components Table
CREATE TABLE IF NOT EXISTS product_sys.bom_components (
    component_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL,
    component_sku VARCHAR(100) NOT NULL,
    component_name VARCHAR(255) NOT NULL,
    quantity_required NUMERIC(12, 4) NOT NULL,
    unit_of_measure VARCHAR(20) DEFAULT 'KG',
    unit_cost_inr NUMERIC(12, 2) NOT NULL,
    country_of_origin VARCHAR(3) DEFAULT 'IND',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. One-Click Document Registry Table
CREATE TABLE IF NOT EXISTS doc_sys.one_click_documents (
    document_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL,
    document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('COMMERCIAL_INVOICE', 'PACKING_LIST', 'SHIPPING_BILL', 'CERTIFICATE_OF_ORIGIN', 'PROFORMA_INVOICE', 'PURCHASE_ORDER', 'SHIPPING_INSTRUCTIONS')),
    document_number VARCHAR(100) NOT NULL,
    file_path VARCHAR(1000),
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bom_product ON product_sys.bom_components(product_id);
CREATE INDEX IF NOT EXISTS idx_doc_order ON doc_sys.one_click_documents(order_id);
