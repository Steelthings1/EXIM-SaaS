# Module 21 REST API Specification

## Endpoints Summary

### 1. LC Auditor V3 API
- `GET /api/banking/lc-auditor-v3`: Retrieve pre-presentation LC audit records.
- `POST /api/banking/lc-auditor-v3`: Execute UCP 600 & ISBP 745 discrepancy audit on presentation documents.

### 2. EDPMS Closures V3 API
- `GET /api/banking/edpms-closures-v3`: Fetch central bank eBRC & EDPMS closure ledger.
- `POST /api/banking/edpms-closures-v3`: Reconcile IRM remittance with shipping bill for central bank eBRC generation.
