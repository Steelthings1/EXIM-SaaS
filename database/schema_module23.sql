-- EXIM.IM SaaS Platform - Module 23: Workflow Automation, Approval Triggers & Reminder Engine
-- PostgreSQL Database Schemas (workflow_sys extensions)

CREATE SCHEMA IF NOT EXISTS workflow_sys;

-- 1. Approval Requests Table
CREATE TABLE IF NOT EXISTS workflow_sys.approval_requests (
    request_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    approval_type VARCHAR(50) NOT NULL CHECK (approval_type IN ('HIGH_VALUE_ORDER', 'CREDIT_EXCEPTION', 'LC_DISCREPANCY_WAIVER')),
    reference_id VARCHAR(100) NOT NULL,
    order_amount_usd NUMERIC(15, 2) NOT NULL,
    requested_by VARCHAR(255) NOT NULL,
    required_approver_role VARCHAR(50) DEFAULT 'CHIEF_TRADE_OFFICER',
    approval_status VARCHAR(30) DEFAULT 'PENDING' CHECK (approval_status IN ('PENDING', 'APPROVED', 'REJECTED')),
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Automated Reminders Table
CREATE TABLE IF NOT EXISTS workflow_sys.automated_reminders (
    reminder_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trigger_rule VARCHAR(100) NOT NULL,
    entity_reference VARCHAR(100) NOT NULL,
    recipient_role VARCHAR(50) NOT NULL,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_dispatched BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_approval_ref ON workflow_sys.approval_requests(reference_id);
CREATE INDEX IF NOT EXISTS idx_reminder_rule ON workflow_sys.automated_reminders(trigger_rule);
