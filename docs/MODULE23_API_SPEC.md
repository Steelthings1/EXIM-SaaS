# Module 23 REST API Specification

## Endpoints Summary

### 1. Workflow Approvals API
- `GET /api/workflow/approvals`: Fetch pending and actioned executive approval requests.
- `POST /api/workflow/approvals`: Evaluate order parameters against sign-off thresholds ($50,000+ ceiling).

### 2. Workflow Reminders API
- `GET /api/workflow/reminders`: Fetch active scheduled reminder alert rules.
- `POST /api/workflow/reminders`: Create a scheduled notification trigger rule for expiring LCs or open EDPMS files.
