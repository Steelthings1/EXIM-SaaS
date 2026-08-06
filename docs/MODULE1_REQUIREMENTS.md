# Module 1 Requirements Specification: Business Profile & Multi-Tenant Setup

## 1. Executive Overview
Module 1 establishes the foundational multi-tenant architecture, statutory identity vault, branch/warehouse registry, role-based access control (RBAC), AI license vision parsing, and settings user interface for the EXIM.IM SaaS Platform.

## 2. Key Architecture Principles
1. **Multi-Tenant Isolation**: Strict logical data separation using PostgreSQL schemas (`org_sys`) and Supabase Row Level Security (RLS) policies evaluated against JWT `org_id` claims.
2. **Statutory Identity Vault**: Centralized verification and storage for GSTIN (India), IEC (DGFT), EORI (EU/UK), and PAN certificates.
3. **19-Role RBAC Matrix**: Granular permissions across internal trade teams (Super Admin, Org Owner, Export/Import Managers, Compliance) and external partners (Customs Brokers/CHA, Freight Forwarders, Auditors).
4. **AI License Vision Parser**: OCR field extraction and RegEx format validation for statutory identity certificates.

## 3. Data Schema Specifications
- `organizations`: Root tenant records, default invoicing currency, subscription tier.
- `entities`: Subsidiary legal entities registered under an organization.
- `branches`: Physical operating offices, sea port codes (e.g., INNSA1, INMAA1).
- `warehouses`: ICD freight terminals, bonded customs warehouses, cold storage.
- `statutory_licenses`: Verification status, issue date, expiry, document URL.
- `org_members`: Assigned user emails, membership status, and RBAC roles.
- `audit_logs`: Immutable security audit logs for identity and permission changes.
