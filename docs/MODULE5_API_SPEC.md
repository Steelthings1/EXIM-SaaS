# Module 5 REST API Specification

## Endpoints Summary

### 1. Stock Registry API
- `GET /api/inventory/stock`: Retrieve multi-warehouse stock balances.
- `POST /api/inventory/stock`: Register stock batch.

### 2. Stock Movements API
- `GET /api/inventory/movements`: Fetch stock movement transaction audit ledger.
- `POST /api/inventory/movements`: Execute stock movement transaction.

### 3. Reorder Alerts API
- `GET /api/inventory/reorder-alerts`: Fetch low stock reorder level warnings.
