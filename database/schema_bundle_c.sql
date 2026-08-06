-- EXIM.IM SaaS Platform - Bundle C: Manufacturing, QC Inspection, Container Loading & Certificate Management
-- PostgreSQL Database Schemas (production_sys, qc_sys, cert_sys)

CREATE SCHEMA IF NOT EXISTS production_sys;
CREATE SCHEMA IF NOT EXISTS qc_sys;
CREATE SCHEMA IF NOT EXISTS cert_sys;

-- 1. Export Manufacturing Production Batches Table
CREATE TABLE IF NOT EXISTS production_sys.batches (
    batch_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    batch_number VARCHAR(100) NOT NULL UNIQUE, -- e.g., BATCH-2026-COF-091
    product_id UUID NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    planned_qty NUMERIC(12, 2) NOT NULL,
    produced_qty NUMERIC(12, 2) DEFAULT 0.00,
    yield_efficiency_pct NUMERIC(5, 2) DEFAULT 98.50,
    mfg_date DATE NOT NULL,
    expiry_date DATE,
    status VARCHAR(30) DEFAULT 'IN_PRODUCTION' CHECK (status IN ('SCHEDULED', 'IN_PRODUCTION', 'QC_PENDING', 'RELEASED', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Quality Control (QC) & NABL Lab Inspection Reports Table
CREATE TABLE IF NOT EXISTS qc_sys.inspection_reports (
    report_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    batch_id UUID NOT NULL REFERENCES production_sys.batches(batch_id) ON DELETE CASCADE,
    lab_name VARCHAR(255) NOT NULL, -- e.g., "SGS India NABL Accredited Testing Lab"
    iso_accreditation VARCHAR(50) DEFAULT 'ISO_17025',
    moisture_content_pct NUMERIC(5, 2) NOT NULL,
    active_ingredient_pct NUMERIC(5, 2) NOT NULL, -- e.g., Curcumin 5.2% or Caffeine 2.1%
    heavy_metals_ppm NUMERIC(6, 3) NOT NULL, -- Lead/Cadmium in PPM
    microbial_status VARCHAR(30) DEFAULT 'PASS_CLEAR' CHECK (microbial_status IN ('PASS_CLEAR', 'FAIL_CONTAMINATED')),
    overall_result VARCHAR(30) DEFAULT 'PASS' CHECK (overall_result IN ('PASS', 'REJECTED_OUT_OF_SPEC')),
    inspected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Container Loading Plans Table (20ft / 40ft / 40ft High Cube)
CREATE TABLE IF NOT EXISTS qc_sys.container_loading_plans (
    plan_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    order_number VARCHAR(100) NOT NULL,
    container_type VARCHAR(20) NOT NULL CHECK (container_type IN ('20FT_STD', '40FT_STD', '40FT_HC', '45FT_HC')),
    max_payload_weight_kg NUMERIC(10, 2) NOT NULL, -- e.g., 21,800 kg for 20ft
    max_volume_cbm NUMERIC(10, 2) NOT NULL, -- e.g., 33.2 m³ for 20ft, 76.4 m³ for 40ft HC
    total_cargo_weight_kg NUMERIC(10, 2) NOT NULL,
    total_cargo_cbm NUMERIC(10, 2) NOT NULL,
    weight_utilization_pct NUMERIC(5, 2) NOT NULL,
    volume_utilization_pct NUMERIC(5, 2) NOT NULL,
    is_overweight BOOLEAN DEFAULT FALSE,
    container_seal_number VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Statutory Certificates Vault Table
CREATE TABLE IF NOT EXISTS cert_sys.statutory_certificates (
    certificate_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    batch_id UUID REFERENCES production_sys.batches(batch_id),
    certificate_type VARCHAR(50) NOT NULL CHECK (certificate_type IN ('PHYTOSANITARY', 'CERTIFICATE_OF_ANALYSIS', 'HEALTH_CERTIFICATE', 'FUMIGATION_CERTIFICATE', 'HALAL_CERTIFICATE')),
    certificate_number VARCHAR(100) NOT NULL UNIQUE,
    issuing_body VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    certificate_url VARCHAR(1000),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index optimizations
CREATE INDEX IF NOT EXISTS idx_batches_product ON production_sys.batches(product_id);
CREATE INDEX IF NOT EXISTS idx_qc_batch ON qc_sys.inspection_reports(batch_id);
CREATE INDEX IF NOT EXISTS idx_container_order ON qc_sys.container_loading_plans(order_number);
CREATE INDEX IF NOT EXISTS idx_cert_type ON cert_sys.statutory_certificates(certificate_type);
