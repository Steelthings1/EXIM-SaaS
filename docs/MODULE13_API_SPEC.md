# Module 13 REST API Specification

## Endpoints Summary

### 1. Cargo Policies API
- `GET /api/insurance/policies`: Retrieve active marine cargo policies.
- `POST /api/insurance/policies`: Generate a new marine policy with 110% CIF sum insured valuation.

### 2. Cargo Claims API
- `GET /api/insurance/claims`: Fetch transit cargo damage claim records.
- `POST /api/insurance/claims`: Lodge a transit damage claim for underwriter survey.
