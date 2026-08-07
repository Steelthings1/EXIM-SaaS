-- EXIM.IM SaaS Platform - Module 26: Complete Report Engine & Scheduled Management Reports Schema
-- Creates schema and tables for report_templates and generated_reports

CREATE SCHEMA IF NOT EXISTS report_sys;

-- Report Templates Table
CREATE TABLE IF NOT EXISTS report_sys.report_templates (
    template_id VARCHAR(64) PRIMARY KEY,
    template_name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL, -- Export Performance, Incentive Realization, Compliance Risk, Logistics SLA
    schedule_frequency VARCHAR(32) NOT NULL, -- Daily, Weekly, Monthly, Ad-Hoc
    export_format VARCHAR(16) NOT NULL DEFAULT 'PDF', -- PDF, EXCEL, CSV
    recipient_emails JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Generated Reports Table
CREATE TABLE IF NOT EXISTS report_sys.generated_reports (
    report_id VARCHAR(64) PRIMARY KEY,
    template_id VARCHAR(64) REFERENCES report_sys.report_templates(template_id) ON DELETE CASCADE,
    report_name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    file_format VARCHAR(16) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    download_url TEXT NOT NULL,
    sha256_checksum VARCHAR(64) NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_report_templates_cat ON report_sys.report_templates(category);
CREATE INDEX IF NOT EXISTS idx_generated_reports_template ON report_sys.generated_reports(template_id);
