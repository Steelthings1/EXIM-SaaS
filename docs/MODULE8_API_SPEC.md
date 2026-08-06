# Module 8 REST API Specification

## Endpoints Summary

### 1. Purchase Orders API
- `GET /api/procurement/purchase-orders`: Retrieve vendor purchase orders and delivery schedules.
- `POST /api/procurement/purchase-orders`: Issue a new vendor purchase order with line item calculations.

### 2. Goods Receipt Notes API
- `GET /api/procurement/goods-receipt`: Fetch GRN inward inspection audit records.
- `POST /api/procurement/goods-receipt`: Generate a Goods Receipt Note with accepted/rejected quantity tracking.
