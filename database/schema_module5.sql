-- EXIM.IM SaaS Platform - Module 5: Multi-Warehouse Inventory & Batch Tracking Engine
-- PostgreSQL Database Schema Extensions (inventory_sys)

CREATE SCHEMA IF NOT EXISTS inventory_sys;

-- 1. Stock Movements Audit Ledger Table
CREATE TABLE IF NOT EXISTS inventory_sys.stock_movements (
    movement_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID NOT NULL,
    warehouse_id UUID NOT NULL,
    movement_type VARCHAR(50) NOT NULL CHECK (movement_type IN ('INWARD_RECEIPT', 'OUTWARD_DISPATCH', 'INTER_WAREHOUSE_TRANSFER', 'BIN_ADJUSTMENT')),
    quantity NUMERIC(12, 4) NOT NULL,
    reference_doc_number VARCHAR(100) NOT NULL,
    performed_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX IF NOT EXISTS idx_movement_batch ON inventory_sys.stock_movements(batch_id);
CREATE INDEX IF NOT EXISTS idx_movement_warehouse ON inventory_sys.stock_movements(warehouse_id);
