# Module 14 REST API Specification

## Endpoints Summary

### 1. LC Auditor API
- `GET /api/banking/lc-auditor`: Retrieve Letter of Credit presentation audit logs.
- `POST /api/banking/lc-auditor`: Execute UCP 600 & ISBP 745 discrepancy audit on presentation documents.

### 2. eBRC & EDPMS Reconciliation API
- `GET /api/banking/edpms-reconciliation`: Fetch eBRC certificate and EDPMS closure records.
- `POST /api/banking/edpms-reconciliation`: Reconcile Inward Remittance Reference (IRM) for eBRC issuance.

### 3. Export Incentives API
- `GET /api/incentives/export-ledger`: Fetch RoDTEP & Duty Drawback scroll ledger.
- `POST /api/incentives/export-ledger`: Compute export incentive claims on FOB values.
