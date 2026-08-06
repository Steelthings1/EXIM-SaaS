-- EXIM.IM SaaS Platform - Bundle D: Logistics, Freight Aggregation, AIS Vessel Tracking & Marine Insurance
-- PostgreSQL Database Schemas (logistics_sys, insurance_sys)

CREATE SCHEMA IF NOT EXISTS logistics_sys;
CREATE SCHEMA IF NOT EXISTS insurance_sys;

-- 1. Carrier Shipping Bookings Table
CREATE TABLE IF NOT EXISTS logistics_sys.bookings (
    booking_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    booking_reference VARCHAR(100) NOT NULL UNIQUE, -- e.g., BKG-MAERSK-2026-9041
    carrier_name VARCHAR(100) NOT NULL, -- e.g., Maersk Line, MSC, CMA CGM, Hapag-Lloyd
    vessel_name VARCHAR(255) NOT NULL, -- e.g., MAERSK MC-KINNEY MOLLER
    voyage_number VARCHAR(100) NOT NULL, -- e.g., VOY-2604W
    container_number VARCHAR(50), -- e.g., MSKU-904182-4
    seal_number VARCHAR(50), -- e.g., SEAL-IN-9004128
    port_loading VARCHAR(10) NOT NULL, -- UN/LOCODE e.g. INNSA
    port_discharge VARCHAR(10) NOT NULL, -- UN/LOCODE e.g. AEDXB
    etd_date DATE NOT NULL,
    eta_date DATE NOT NULL,
    freight_cost_usd NUMERIC(12, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'CONFIRMED' CHECK (status IN ('REQUESTED', 'CONFIRMED', 'CONTAINER_LOADED', 'IN_TRANSIT', 'DISCHARGED', 'CANCELLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Satellite AIS Vessel Tracking Telemetry Events Table
CREATE TABLE IF NOT EXISTS logistics_sys.ais_tracking_events (
    event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    booking_reference VARCHAR(100) NOT NULL REFERENCES logistics_sys.bookings(booking_reference) ON DELETE CASCADE,
    vessel_name VARCHAR(255) NOT NULL,
    imo_number VARCHAR(20) NOT NULL, -- e.g., IMO 9632064
    milestone_code VARCHAR(50) NOT NULL CHECK (milestone_code IN ('GATE_IN', 'LOADED_VESSEL', 'DEPARTED_PORT', 'AT_SEA_TELEMETRY', 'TRANSSHIPMENT', 'ARRIVED_BERTH', 'CUSTOMS_HOLD', 'OUT_OF_CHARGE')),
    event_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    port_name VARCHAR(255),
    location_lat NUMERIC(9, 6),
    location_lng NUMERIC(9, 6),
    speed_knots NUMERIC(4, 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Marine Cargo Insurance Policies Table
CREATE TABLE IF NOT EXISTS insurance_sys.marine_policies (
    policy_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL,
    policy_number VARCHAR(100) NOT NULL UNIQUE, -- e.g., POL-ICICI-2026-8810
    insurer_name VARCHAR(255) NOT NULL, -- e.g., ICICI Lombard / TATA AIG Marine Underwriters
    coverage_clause VARCHAR(50) DEFAULT 'INSTITUTE_CARGO_CLAUSES_A' CHECK (coverage_clause IN ('INSTITUTE_CARGO_CLAUSES_A', 'INSTITUTE_CARGO_CLAUSES_B', 'INSTITUTE_CARGO_CLAUSES_C')),
    cif_valuation_usd NUMERIC(12, 2) NOT NULL,
    sum_insured_usd NUMERIC(12, 2) NOT NULL, -- Calculated as 110% of CIF Valuation
    premium_rate_pct NUMERIC(5, 4) DEFAULT 0.0025, -- e.g., 0.25% of Sum Insured
    total_premium_usd NUMERIC(12, 2) NOT NULL,
    policy_pdf_url VARCHAR(1000),
    status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('DRAFT', 'ACTIVE', 'CLAIM_FILED', 'EXPIRED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON logistics_sys.bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_ais_imo ON logistics_sys.ais_tracking_events(imo_number);
CREATE INDEX IF NOT EXISTS idx_insurance_num ON insurance_sys.marine_policies(policy_number);
