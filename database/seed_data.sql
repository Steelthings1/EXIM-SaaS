-- EXIM.IM SaaS Platform - Module 1 Seed Data
-- Test Enterprise Organization, Branches, Warehouses, Statutory Licenses & Roles

-- Insert Demo Organization
INSERT INTO org_sys.organizations (
    org_id, legal_name, trade_name, entity_type, tax_id_gstin, iec_code, eori_number, pan_number, default_currency, subscription_tier
) VALUES (
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Apex Global Logistics & Trading Pvt Ltd',
    'Apex Exim Global',
    'PRIVATE_LIMITED',
    '27AAACA1234A1Z5',
    '0304005001',
    'GB123456789000',
    'AAACA1234A',
    'USD',
    'ENTERPRISE_TIER_1'
) ON CONFLICT (org_id) DO NOTHING;

-- Insert Primary Legal Entity
INSERT INTO org_sys.entities (
    entity_id, org_id, legal_name, registration_number, country, is_primary
) VALUES (
    'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Apex Global Logistics & Trading Pvt Ltd',
    'U74999MH2020PTC345678',
    'IND',
    TRUE
) ON CONFLICT (entity_id) DO NOTHING;

-- Insert Operating Branches
INSERT INTO org_sys.branches (
    branch_id, org_id, entity_id, branch_code, branch_name, port_code, is_head_office, address_line1, city, state, country, postal_code
) VALUES 
(
    'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    'HQ-MUM',
    'Mumbai Head Office & Port Hub',
    'INNSA1', -- Nhava Sheva (JNPT)
    TRUE,
    '701, Trade Tower, Bandra Kurla Complex',
    'Mumbai',
    'Maharashtra',
    'IND',
    '400051'
),
(
    'd4e5f6a7-b89c-0d1e-2f3a-4b5c6d7e8f9a',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    'BR-DEL',
    'Delhi Inland Container Depot Branch',
    'INTKD6', -- ICD Tughlakabad
    FALSE,
    'Plot 45, Okhla Industrial Area Phase 3',
    'New Delhi',
    'Delhi',
    'IND',
    '110020'
) ON CONFLICT DO NOTHING;

-- Insert ICD-Mapped Bonded Warehouses
INSERT INTO org_sys.warehouses (
    warehouse_id, org_id, branch_id, warehouse_name, warehouse_type, icd_code, port_code, is_bonded, customs_registration_no, address, storage_capacity_sqft
) VALUES 
(
    'e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
    'Nhava Sheva Bonded Customs Warehouse #1',
    'BONDED_CUSTOMS',
    'INNSA1',
    'INNSA1',
    TRUE,
    'CUS-BOND-2024-MH-9982',
    'Sector 8, Dronagiri Node, Navi Mumbai 400707',
    45000.00
),
(
    'f6a7b89c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'd4e5f6a7-b89c-0d1e-2f3a-4b5c6d7e8f9a',
    'Tughlakabad ICD Freight Terminal Warehouse',
    'INLAND_CONTAINER_DEPOT',
    'INTKD6',
    'INTKD6',
    TRUE,
    'ICD-TKD-DEPOT-041',
    'CONCOR Container Terminal Complex, Tughlakabad, New Delhi 110044',
    75000.00
) ON CONFLICT DO NOTHING;

-- Insert Statutory Identity Vault Records
INSERT INTO org_sys.statutory_licenses (
    license_id, org_id, license_type, license_number, issuing_authority, issue_date, expiry_date, status, document_url, verified_at
) VALUES 
(
    '11111111-2222-3333-4444-555555555555',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'GSTIN',
    '27AAACA1234A1Z5',
    'Goods and Services Tax Network (GSTN India)',
    '2020-04-01',
    '2030-03-31',
    'VERIFIED',
    'https://vault.exim.im/docs/gstin_27AAACA1234A1Z5.pdf',
    CURRENT_TIMESTAMP
),
(
    '22222222-3333-4444-5555-666666666666',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'IEC',
    '0304005001',
    'Directorate General of Foreign Trade (DGFT)',
    '2015-08-15',
    '2035-12-31',
    'VERIFIED',
    'https://vault.exim.im/docs/iec_0304005001.pdf',
    CURRENT_TIMESTAMP
),
(
    '33333333-4444-5555-6666-777777777777',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'EORI',
    'GB123456789000',
    'HM Revenue & Customs (HMRC UK)',
    '2021-01-01',
    '2028-12-31',
    'VERIFIED',
    'https://vault.exim.im/docs/eori_GB123456789000.pdf',
    CURRENT_TIMESTAMP
),
(
    '44444444-5555-6666-7777-888888888888',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'PAN',
    'AAACA1234A',
    'Income Tax Department of India',
    '2010-05-12',
    NULL,
    'VERIFIED',
    'https://vault.exim.im/docs/pan_AAACA1234A.pdf',
    CURRENT_TIMESTAMP
) ON CONFLICT DO NOTHING;

-- Insert Seed Organization Members (RBAC Roles)
INSERT INTO org_sys.org_members (
    member_id, org_id, user_id, email, full_name, role, status
) VALUES 
(
    '99999999-8888-7777-6666-555555555551',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    '00000000-0000-0000-0000-000000000001',
    'owner@apexexim.com',
    'Vikramaditya Singhania',
    'ORG_OWNER',
    'ACTIVE'
),
(
    '99999999-8888-7777-6666-555555555552',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    '00000000-0000-0000-0000-000000000002',
    'export.mgr@apexexim.com',
    'Priya Sharma',
    'EXPORT_MANAGER',
    'ACTIVE'
),
(
    '99999999-8888-7777-6666-555555555553',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    '00000000-0000-0000-0000-000000000003',
    'compliance@apexexim.com',
    'Rajesh Verma',
    'COMPLIANCE_OFFICER',
    'ACTIVE'
),
(
    '99999999-8888-7777-6666-555555555554',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    '00000000-0000-0000-0000-000000000004',
    'cha.broker@customspartners.in',
    'Anil Kumar (Customs House Agent)',
    'CUSTOMS_BROKER',
    'ACTIVE'
) ON CONFLICT DO NOTHING;
