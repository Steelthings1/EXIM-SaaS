# Module 3 REST API Specification

## Endpoints Summary

### 1. Products Master API
- `GET /api/products`: Retrieve export SKU master catalog.
- `POST /api/products`: Create new export product SKU.

### 2. Bill of Materials (BOM) API
- `GET /api/products/bom`: Retrieve BOM component breakdown and total raw material cost.
- `POST /api/products/bom`: Add raw material component to SKU BOM.

### 3. Single-Entry Order Workbench API
- `GET /api/single-entry/order`: Retrieve single-entry master trade order dataset.
- `POST /api/single-entry/order`: Create or update single-entry master trade order.

### 4. 1-Click Document Suite Generator API
- `POST /api/single-entry/generate-docs`: Generate all 7 official trade documents from single-entry order input.
