# Module 1 REST API Specification

## Endpoints Summary

### 1. Organization Profile API
- `GET /api/organization`: Retrieve current tenant organization profile.
- `PUT /api/organization`: Update organization legal name, tax IDs, default currency, and tier.

### 2. Statutory Identity Vault API
- `GET /api/licenses`: List registered statutory identity licenses.
- `POST /api/licenses`: Register new statutory identity certificate.
- `POST /api/licenses/parse`: Upload document (PDF/PNG) for AI Vision OCR parsing & RegEx validation.

### 3. Branch & Warehouse Registry API
- `GET /api/branches`: Fetch operating branches, ICD codes, and bonded warehouses.
- `POST /api/branches`: Register a new operating branch or port hub.

### 4. Organization Members & RBAC API
- `GET /api/members`: List active team members and assigned RBAC roles.
- `POST /api/members`: Invite internal members or external partners across the 19 RBAC roles.
