-- EXIM.IM SaaS Platform - Module 12: Real-Time Satellite AIS Tracking & Container Telemetry Engine
-- PostgreSQL Database Schemas (logistics_sys extensions)

CREATE SCHEMA IF NOT EXISTS logistics_sys;

-- 1. Vessel AIS Positions Table
CREATE TABLE IF NOT EXISTS logistics_sys.vessel_ais_positions (
    position_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mmsi VARCHAR(20) NOT NULL,
    vessel_name VARCHAR(100) NOT NULL,
    latitude NUMERIC(9, 6) NOT NULL,
    longitude NUMERIC(9, 6) NOT NULL,
    speed_knots NUMERIC(5, 2) DEFAULT 0,
    heading_degrees INTEGER DEFAULT 0,
    destination_port VARCHAR(100),
    destination_eta TIMESTAMP WITH TIME ZONE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Container Milestone Events Table
CREATE TABLE IF NOT EXISTS logistics_sys.container_milestone_events (
    event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    container_number VARCHAR(50) NOT NULL,
    milestone_event VARCHAR(50) NOT NULL CHECK (milestone_event IN ('GATE_IN', 'LOADED_ON_VESSEL', 'DEPARTED_PORT', 'TRANSSHIPMENT', 'ARRIVED_PORT', 'CUSTOMS_HOLD', 'OUT_OF_CHARGE')),
    location_name VARCHAR(150) NOT NULL,
    event_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX IF NOT EXISTS idx_vessel_mmsi ON logistics_sys.vessel_ais_positions(mmsi);
CREATE INDEX IF NOT EXISTS idx_container_number ON logistics_sys.container_milestone_events(container_number);
