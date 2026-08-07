# Module 25 REST API Specification

## Endpoints Summary

### 1. Workspace Settings API
- `GET /api/settings/workspace`: Fetch workspace system parameters, currency defaults, and header/footer text.
- `POST /api/settings/workspace`: Update workspace system configuration parameters.

### 2. Security Audit Logs API
- `GET /api/settings/audit-logs`: Fetch immutable security activity log ledger.
- `POST /api/settings/audit-logs`: Record a new security audit log entry.
