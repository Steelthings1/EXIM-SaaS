# Module 4 REST API Specification

## Endpoints Summary

### 1. CRM Contacts API
- `GET /api/crm/contacts`: Retrieve customer and supplier profiles with KYB audit badges.
- `POST /api/crm/contacts`: Create new international buyer or vendor contact profile.

### 2. KYB Statutory Verification API
- `POST /api/crm/kyb-verify`: Validate statutory tax registration IDs and compute credit risk scores.

### 3. CRM Interaction Logs API
- `GET /api/crm/interactions`: Fetch trade inquiry records and negotiation logs.
- `POST /api/crm/interactions`: Create new interaction log entry.
