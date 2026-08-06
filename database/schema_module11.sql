-- EXIM.IM SaaS Platform - Module 11: Shipment Booking & Multi-Carrier Freight Aggregator
-- PostgreSQL Database Schemas (logistics_sys extensions)

CREATE SCHEMA IF NOT EXISTS logistics_sys;

-- 1. Multi-Carrier Freight Quotes V2 Table
CREATE TABLE IF NOT EXISTS logistics_sys.freight_quotes_v2 (
    quote_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    carrier_name VARCHAR(100) NOT NULL, -- e.g. MSC, CMA CGM, Maersk, Hapag-Lloyd
    transport_mode VARCHAR(20) NOT NULL DEFAULT 'OCEAN' CHECK (transport_mode IN ('OCEAN', 'AIR', 'RAIL', 'ROAD')),
    pol_port_code VARCHAR(10) NOT NULL, -- e.g. INNSA (Nhava Sheva)
    pod_port_code VARCHAR(10) NOT NULL, -- e.g. DEHAM (Hamburg)
    container_type VARCHAR(20) NOT NULL DEFAULT '40HC',
    base_freight_usd NUMERIC(12, 2) NOT NULL,
    thc_origin_usd NUMERIC(10, 2) DEFAULT 0,
    thc_destination_usd NUMERIC(10, 2) DEFAULT 0,
    baf_surcharge_usd NUMERIC(10, 2) DEFAULT 0,
    isps_surcharge_usd NUMERIC(10, 2) DEFAULT 0,
    total_freight_usd NUMERIC(12, 2) NOT NULL,
    transit_days INTEGER NOT NULL,
    valid_until DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Shipping Instructions (SI) Dispatch Table
CREATE TABLE IF NOT EXISTS logistics_sys.shipping_instructions (
    si_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    si_number VARCHAR(100) NOT NULL UNIQUE,
    booking_reference VARCHAR(100) NOT NULL,
    shipper_name VARCHAR(255) NOT NULL,
    consignee_name VARCHAR(255) NOT NULL,
    vessel_name VARCHAR(100) NOT NULL,
    voyage_number VARCHAR(50) NOT NULL,
    container_number VARCHAR(50) NOT NULL,
    seal_number VARCHAR(50) NOT NULL,
    bl_type VARCHAR(50) DEFAULT 'ORIGINAL_BL' CHECK (bl_type IN ('ORIGINAL_BL', 'SEAWAY_BILL', 'TELELEX_RELEASE')),
    status VARCHAR(30) DEFAULT 'SUBMITTED' CHECK (status IN ('DRAFT', 'SUBMITTED', 'CONFIRMED', 'BL_ISSUED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX IF NOT EXISTS idx_freight_pol_pod ON logistics_sys.freight_quotes_v2(pol_port_code, pod_port_code);
CREATE INDEX IF NOT EXISTS idx_si_number ON logistics_sys.shipping_instructions(si_number);
