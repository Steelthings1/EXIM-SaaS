-- EXIM.IM SaaS Platform - Module 1: Business Profile & Multi-Tenant Setup
-- Supabase Row Level Security (RLS) Policies for Multi-Tenant Isolation

-- Helper function to extract user's active org_id from JWT claims or membership table
CREATE OR REPLACE FUNCTION org_sys.get_current_org_id()
RETURNS UUID AS $$
BEGIN
    -- Check JWT claim first (for microservices / API JWT tokens)
    IF (NULLIF(current_setting('request.jwt.claims', true), '')::jsonb ->> 'org_id') IS NOT NULL THEN
        RETURN (current_setting('request.jwt.claims', true)::jsonb ->> 'org_id')::UUID;
    END IF;

    -- Fallback: Fetch primary organization from org_members for auth.uid()
    RETURN (
        SELECT org_id 
        FROM org_sys.org_members 
        WHERE user_id = auth.uid() AND status = 'ACTIVE' 
        LIMIT 1
    );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Enable RLS on all Module 1 tables
ALTER TABLE org_sys.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_sys.entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_sys.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_sys.warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_sys.statutory_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_sys.org_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_sys.audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Organizations Policies
CREATE POLICY tenant_isolation_select_org ON org_sys.organizations
    FOR SELECT USING (org_id = org_sys.get_current_org_id());

CREATE POLICY tenant_isolation_update_org ON org_sys.organizations
    FOR UPDATE USING (org_id = org_sys.get_current_org_id());

-- 2. Entities Policies
CREATE POLICY tenant_isolation_all_entities ON org_sys.entities
    FOR ALL USING (org_id = org_sys.get_current_org_id());

-- 3. Branches Policies
CREATE POLICY tenant_isolation_all_branches ON org_sys.branches
    FOR ALL USING (org_id = org_sys.get_current_org_id());

-- 4. Warehouses Policies
CREATE POLICY tenant_isolation_all_warehouses ON org_sys.warehouses
    FOR ALL USING (org_id = org_sys.get_current_org_id());

-- 5. Statutory Licenses Policies
CREATE POLICY tenant_isolation_all_licenses ON org_sys.statutory_licenses
    FOR ALL USING (org_id = org_sys.get_current_org_id());

-- 6. Org Members Policies
CREATE POLICY tenant_isolation_all_members ON org_sys.org_members
    FOR ALL USING (org_id = org_sys.get_current_org_id());

-- 7. Audit Logs Policies (Read-Only for Tenant Members, Insert allowed)
CREATE POLICY tenant_isolation_select_audit_logs ON org_sys.audit_logs
    FOR SELECT USING (org_id = org_sys.get_current_org_id());

CREATE POLICY tenant_isolation_insert_audit_logs ON org_sys.audit_logs
    FOR INSERT WITH CHECK (org_id = org_sys.get_current_org_id());
