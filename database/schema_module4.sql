-- EXIM.IM SaaS Platform - Module 4: Customer & Supplier CRM with KYB Verification
-- PostgreSQL Database Schema Extensions (crm_sys)

CREATE SCHEMA IF NOT EXISTS crm_sys;

-- 1. KYB Verification Audit Records Table
CREATE TABLE IF NOT EXISTS crm_sys.kyb_verifications (
    kyb_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_id UUID NOT NULL,
    tax_id_type VARCHAR(20) NOT NULL, -- e.g., GSTIN, UAE_TRN, UK_VAT
    tax_id_number VARCHAR(50) NOT NULL,
    verification_status VARCHAR(30) DEFAULT 'VERIFIED' CHECK (verification_status IN ('VERIFIED', 'FAILED', 'PENDING')),
    credit_risk_rating VARCHAR(20) DEFAULT 'LOW_RISK' CHECK (credit_risk_rating IN ('LOW_RISK', 'MEDIUM_RISK', 'HIGH_RISK')),
    audit_notes TEXT,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CRM Interaction Logs Table
CREATE TABLE IF NOT EXISTS crm_sys.interaction_logs (
    interaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_id UUID NOT NULL,
    interaction_type VARCHAR(50) NOT NULL CHECK (interaction_type IN ('QUOTATION_INQUIRY', 'PRICE_NEGOTIATION', 'CONTRACT_DISCUSSION', 'PAYMENT_REMINDER')),
    subject VARCHAR(255) NOT NULL,
    notes TEXT,
    logged_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_kyb_contact ON crm_sys.kyb_verifications(contact_id);
CREATE INDEX IF NOT EXISTS idx_interaction_contact ON crm_sys.interaction_logs(contact_id);
