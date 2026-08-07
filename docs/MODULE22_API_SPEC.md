# Module 22 REST API Specification

## Endpoints Summary

### 1. Incentive Claims V3 API
- `GET /api/incentives/claims-v3`: Retrieve export incentive realization claims.
- `POST /api/incentives/claims-v3`: File export incentive claim and generate DGFT e-scrip scroll.

### 2. e-Scrip Ledger API
- `GET /api/incentives/escrip-ledger`: Fetch active e-scrip scroll balances.
- `POST /api/incentives/escrip-ledger`: Offset import customs duty using available e-scrip credit balance.
