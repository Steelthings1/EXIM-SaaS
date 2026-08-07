-- EXIM.IM SaaS Platform - Module 30: Ecosystem Marketplace & Partner Network Directory Schema
-- Creates schema extensions and tables for partners_v3 and service_rfqs

CREATE SCHEMA IF NOT EXISTS marketplace_sys;

-- Partners V3 Table
CREATE TABLE IF NOT EXISTS marketplace_sys.partners_v3 (
    partner_id VARCHAR(64) PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    service_category VARCHAR(64) NOT NULL, -- Customs Broker (CHA), Freight Forwarder, NABL Accredited Testing Lab, Trade Consultant
    operating_port_codes JSONB NOT NULL DEFAULT '["INMAA1", "INCOK1", "INPAV1", "AEDXB"]'::jsonb,
    accreditation_details TEXT,
    rating_score NUMERIC(3, 2) DEFAULT 4.90,
    avg_sla_turnaround_hours INT DEFAULT 24,
    verification_status VARCHAR(32) DEFAULT 'VERIFIED_PARTNER',
    contact_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Service RFQs Table
CREATE TABLE IF NOT EXISTS marketplace_sys.service_rfqs (
    rfq_id VARCHAR(64) PRIMARY KEY,
    partner_id VARCHAR(64) REFERENCES marketplace_sys.partners_v3(partner_id) ON DELETE CASCADE,
    order_number VARCHAR(64) NOT NULL,
    service_type VARCHAR(64) NOT NULL,
    port_code VARCHAR(32) NOT NULL,
    quoted_value_inr NUMERIC(15, 2) DEFAULT 0.00,
    status VARCHAR(32) NOT NULL DEFAULT 'Submitted', -- Submitted -> Quote Received -> Booked -> Fulfilled -> Cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_partners_v3_cat ON marketplace_sys.partners_v3(service_category);
CREATE INDEX IF NOT EXISTS idx_service_rfqs_status ON marketplace_sys.service_rfqs(status);
