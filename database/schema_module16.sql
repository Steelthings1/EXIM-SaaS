-- EXIM.IM SaaS Platform - Module 16: 10-Dashboard Operational & Executive Intelligence Suite
-- PostgreSQL Database Schemas (analytics_sys extensions)

CREATE SCHEMA IF NOT EXISTS analytics_sys;

-- 1. Dashboard KPI Snapshots Table
CREATE TABLE IF NOT EXISTS analytics_sys.dashboard_kpi_snapshots (
    snapshot_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    view_type VARCHAR(50) NOT NULL CHECK (view_type IN (
        'EXECUTIVE', 'DESTINATION_MARKETS', 'EXPORT_SALES', 'VESSEL_CONTAINER', 
        'BUYER_PERFORMANCE', 'VENDOR_PROCUREMENT', 'MULTI_WAREHOUSE', 
        'FINANCIAL_TREASURY', 'SANCTIONS_RISK', 'AI_PREDICTIVE'
    )),
    metric_key VARCHAR(100) NOT NULL,
    metric_label VARCHAR(255) NOT NULL,
    metric_value NUMERIC(15, 2) NOT NULL,
    unit_symbol VARCHAR(20) DEFAULT '$',
    yoy_change_pct NUMERIC(6, 2) DEFAULT 0.00,
    operational_subtext TEXT,
    snapshot_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_kpi_view ON analytics_sys.dashboard_kpi_snapshots(view_type);
CREATE INDEX IF NOT EXISTS idx_kpi_date ON analytics_sys.dashboard_kpi_snapshots(snapshot_date);
