-- EXIM.IM SaaS Platform - Module 28: Security Audit Logs & Activity History Schema
-- Creates schema and tables for activity_logs_v2 and security_alerts

CREATE SCHEMA IF NOT EXISTS security_sys;

-- Activity Logs V2 Table
CREATE TABLE IF NOT EXISTS security_sys.activity_logs_v2 (
    log_id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    action VARCHAR(128) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(64) NOT NULL,
    payload_diff JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    risk_rating VARCHAR(16) NOT NULL DEFAULT 'LOW', -- LOW, MEDIUM, HIGH, CRITICAL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Security Anomaly Alerts Table
CREATE TABLE IF NOT EXISTS security_sys.security_alerts (
    alert_id VARCHAR(64) PRIMARY KEY,
    alert_type VARCHAR(128) NOT NULL, -- UNRECOGNIZED_IP_LOGIN, HIGH_VALUE_MODIFICATION, SUSPICIOUS_API_BURST
    severity VARCHAR(16) NOT NULL DEFAULT 'HIGH',
    user_email VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    description TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_activity_logs_v2_user ON security_sys.activity_logs_v2(user_email);
CREATE INDEX IF NOT EXISTS idx_security_alerts_unresolved ON security_sys.security_alerts(is_resolved);
