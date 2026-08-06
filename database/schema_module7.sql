-- EXIM.IM SaaS Platform - Module 7: Manufacturing & Export Production Batch Execution Engine
-- PostgreSQL Database Schemas (production_sys)

CREATE SCHEMA IF NOT EXISTS production_sys;

-- 1. Manufacturing Orders Table
CREATE TABLE IF NOT EXISTS production_sys.manufacturing_orders (
    order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_number VARCHAR(100) NOT NULL UNIQUE,
    product_id UUID NOT NULL,
    production_line VARCHAR(100) NOT NULL, -- e.g., Line A (Roasting & Packaging)
    target_yield_qty NUMERIC(12, 4) NOT NULL,
    actual_yield_qty NUMERIC(12, 4) DEFAULT 0,
    yield_efficiency_pct NUMERIC(5, 2) DEFAULT 0,
    status VARCHAR(30) DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'IN_PRODUCTION', 'QC_PENDING', 'COMPLETED', 'REJECTED')),
    scheduled_start TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. BOM Raw Material Consumptions Table
CREATE TABLE IF NOT EXISTS production_sys.bom_consumptions (
    consumption_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL,
    component_sku VARCHAR(100) NOT NULL,
    allocated_qty NUMERIC(12, 4) NOT NULL,
    actual_consumed_qty NUMERIC(12, 4) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX IF NOT EXISTS idx_mfg_batch ON production_sys.manufacturing_orders(batch_number);
CREATE INDEX IF NOT EXISTS idx_mfg_status ON production_sys.manufacturing_orders(status);
