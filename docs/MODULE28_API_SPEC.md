# Module 28 REST API Specification

## Endpoints Summary

### 1. Security Activity Logs V2 API
- `GET /api/security/activity-logs`: Fetch immutable user activity log ledger V2 and payload diff entries.
- `POST /api/security/activity-logs`: Record a new activity log entry with IP risk rating.

### 2. Security Alerts API
- `GET /api/security/alerts`: Fetch active security threat anomaly alerts.
- `POST /api/security/alerts`: Create a new security anomaly alert.
