# Bundle E REST API Specification

## Endpoints Summary

### 1. LC UCP 600 Checker API
- `POST /api/banking/lc-checker`: Audit shipping document dataset against Letter of Credit terms under ICC UCP 600 rules.

### 2. eBRC & EDPMS Reconciliation API
- `GET /api/banking/ebrc`: Retrieve active eBRC records and EDPMS closure statuses.
- `POST /api/banking/ebrc`: Reconcile Inward Remittance (IRM) with Shipping Bill for eBRC generation.

### 3. Multi-Currency Invoices API
- `GET /api/finance/invoices`: Retrieve commercial invoices and realized forex gains/losses.
- `POST /api/finance/invoices`: Issue new foreign currency commercial invoice.

### 4. Export Incentives (RoDTEP & Drawback) API
- `GET /api/incentives/rodtep-drawback`: Fetch export incentive claims and DGFT e-scrip scroll status.
- `POST /api/incentives/rodtep-drawback`: Compute and record RoDTEP & Duty Drawback incentive claims.
