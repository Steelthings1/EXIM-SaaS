# Module 20 REST API Specification

## Endpoints Summary

### 1. Commercial Invoices V2 API
- `GET /api/finance/invoices-v2`: Retrieve multi-currency commercial invoices and LUT references.
- `POST /api/finance/invoices-v2`: Issue a multi-currency commercial export invoice with zero-rated LUT tag.

### 2. Forex Realization API
- `GET /api/finance/forex-realization`: Fetch realized exchange rate gain/loss records.
- `POST /api/finance/forex-realization`: Calculate spot vs realized bank remittance exchange rate gain/loss.
