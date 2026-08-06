-- EXIM.IM SaaS Platform - Bundle A: Products, CRM, Inventory & Single-Entry Core Engine
-- PostgreSQL Database Schemas (crm_sys, inventory_sys, doc_sys)

CREATE SCHEMA IF NOT EXISTS crm_sys;
CREATE SCHEMA IF NOT EXISTS inventory_sys;
CREATE SCHEMA IF NOT EXISTS doc_sys;

-- 1. Contacts Table (CRM Buyers, Suppliers, Partners)
CREATE TABLE IF NOT EXISTS crm_sys.contacts (
    contact_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    contact_type VARCHAR(50) NOT NULL CHECK (contact_type IN ('BUYER_CUSTOMER', 'SUPPLIER_VENDOR', 'MERCHANT_PARTNER', 'BUYING_HOUSE', 'CHA_BROKER')),
    legal_name VARCHAR(255) NOT NULL,
    trade_name VARCHAR(255),
    tax_id_vat VARCHAR(50),
    country VARCHAR(3) NOT NULL DEFAULT 'USA',
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address VARCHAR(500) NOT NULL,
    kyb_status VARCHAR(30) DEFAULT 'VERIFIED_KYB' CHECK (kyb_status IN ('VERIFIED_KYB', 'PENDING_REVIEW', 'SUSPENDED')),
    credit_limit_usd NUMERIC(12, 2) DEFAULT 100000.00,
    payment_terms VARCHAR(50) DEFAULT 'LC_AT_SIGHT' CHECK (payment_terms IN ('LC_AT_SIGHT', 'NET_30', 'NET_60', 'ADVANCE_30_70', 'DP_SIGHT')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Product Master Catalog Table
CREATE TABLE IF NOT EXISTS inventory_sys.products (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    product_name VARCHAR(255) NOT NULL,
    hs_code VARCHAR(12) NOT NULL,
    description TEXT,
    uom VARCHAR(20) DEFAULT 'KGS',
    unit_price_usd NUMERIC(10, 2) NOT NULL,
    net_weight_kg NUMERIC(10, 3) NOT NULL, -- Net Weight per Unit in KG
    gross_weight_kg NUMERIC(10, 3) NOT NULL, -- Gross Weight per Unit in KG
    cbm_per_unit NUMERIC(10, 5) NOT NULL, -- Cubic Meters (CBM) per Unit
    units_per_carton INT DEFAULT 10,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Multi-Warehouse Stock Batches Table
CREATE TABLE IF NOT EXISTS inventory_sys.stock_batches (
    batch_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    warehouse_id UUID NOT NULL,
    product_id UUID NOT NULL REFERENCES inventory_sys.products(product_id) ON DELETE CASCADE,
    batch_number VARCHAR(100) NOT NULL,
    qty_available NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    qty_allocated NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    manufacturing_date DATE,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(warehouse_id, product_id, batch_number)
);

-- 4. Single-Entry Master Orders Anchor Table
CREATE TABLE IF NOT EXISTS doc_sys.single_entry_orders (
    order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    order_number VARCHAR(100) NOT NULL UNIQUE, -- e.g., EXIM-2026-9041
    buyer_id UUID REFERENCES crm_sys.contacts(contact_id),
    seller_id UUID REFERENCES crm_sys.contacts(contact_id),
    incoterms VARCHAR(10) DEFAULT 'FOB' CHECK (incoterms IN ('FOB', 'CIF', 'CFR', 'EXW', 'DDP', 'FCA')),
    currency VARCHAR(3) DEFAULT 'USD',
    port_of_loading VARCHAR(100) NOT NULL, -- e.g., Nhava Sheva (INNSA1)
    port_of_discharge VARCHAR(100) NOT NULL, -- e.g., Jebel Ali (AEJEA)
    vessel_flight_name VARCHAR(150),
    line_items JSONB NOT NULL, -- Array of products, quantities, prices
    subtotal_usd NUMERIC(12, 2) NOT NULL,
    freight_usd NUMERIC(12, 2) DEFAULT 0.00,
    insurance_usd NUMERIC(12, 2) DEFAULT 0.00,
    total_cif_usd NUMERIC(12, 2) NOT NULL,
    total_net_weight_kg NUMERIC(12, 3) NOT NULL,
    total_gross_weight_kg NUMERIC(12, 3) NOT NULL,
    total_volume_cbm NUMERIC(12, 4) NOT NULL,
    total_cartons INT NOT NULL,
    order_status VARCHAR(30) DEFAULT 'DRAFT' CHECK (order_status IN ('DRAFT', 'CONFIRMED', 'SHIPPED', 'COMPLETED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index optimizations
CREATE INDEX IF NOT EXISTS idx_contacts_org ON crm_sys.contacts(org_id, contact_type);
CREATE INDEX IF NOT EXISTS idx_products_sku ON inventory_sys.products(sku);
CREATE INDEX IF NOT EXISTS idx_stock_product ON inventory_sys.stock_batches(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_org_num ON doc_sys.single_entry_orders(org_id, order_number);
