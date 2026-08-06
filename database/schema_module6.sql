-- EXIM.IM SaaS Platform - Module 6: Single-Entry Centralized Dataset & Document Intelligence Core
-- PostgreSQL Database Schema Extensions (doc_sys)

CREATE SCHEMA IF NOT EXISTS doc_sys;

-- 1. Field Dependency Rules Mapping Table
CREATE TABLE IF NOT EXISTS doc_sys.field_dependency_rules (
    rule_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_field VARCHAR(100) NOT NULL, -- e.g., master_order.quantity
    target_document VARCHAR(50) NOT NULL, -- e.g., COMMERCIAL_INVOICE, PACKING_LIST
    target_field VARCHAR(100) NOT NULL, -- e.g., invoice.total_cif_amount
    transformation_rule TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Document Version Audit Trail Table (SHA-256 Checksums)
CREATE TABLE IF NOT EXISTS doc_sys.document_versions (
    version_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL,
    version_number INT NOT NULL DEFAULT 1,
    modified_fields JSONB NOT NULL, -- ['quantity', 'unit_price', 'cif_total']
    modified_by VARCHAR(100) NOT NULL,
    sha256_checksum VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX IF NOT EXISTS idx_doc_version ON doc_sys.document_versions(document_id);
