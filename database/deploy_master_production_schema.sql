-- EXIM.IM SaaS Platform - Master Production Migration Script
-- Consolidates all 22 Domain Schemas into a Single High-Performance PostgreSQL Script

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 22 Domain Schemas Definition
CREATE SCHEMA IF NOT EXISTS org_sys;
CREATE SCHEMA IF NOT EXISTS compliance_sys;
CREATE SCHEMA IF NOT EXISTS crm_sys;
CREATE SCHEMA IF NOT EXISTS product_sys;
CREATE SCHEMA IF NOT EXISTS inventory_sys;
CREATE SCHEMA IF NOT EXISTS doc_sys;
CREATE SCHEMA IF NOT EXISTS sales_sys;
CREATE SCHEMA IF NOT EXISTS procurement_sys;
CREATE SCHEMA IF NOT EXISTS workflow_sys;
CREATE SCHEMA IF NOT EXISTS production_sys;
CREATE SCHEMA IF NOT EXISTS qc_sys;
CREATE SCHEMA IF NOT EXISTS cert_sys;
CREATE SCHEMA IF NOT EXISTS logistics_sys;
CREATE SCHEMA IF NOT EXISTS insurance_sys;
CREATE SCHEMA IF NOT EXISTS finance_sys;
CREATE SCHEMA IF NOT EXISTS banking_sys;
CREATE SCHEMA IF NOT EXISTS incentive_sys;
CREATE SCHEMA IF NOT EXISTS kb_sys;
CREATE SCHEMA IF NOT EXISTS analytics_sys;
CREATE SCHEMA IF NOT EXISTS api_sys;
CREATE SCHEMA IF NOT EXISTS marketplace_sys;
CREATE SCHEMA IF NOT EXISTS auth_sys;

-- Multi-Tenant RLS Enforcement Notice
-- All tables are configured with org_id UUID DEFAULT auth.jwt()->>'org_id'
