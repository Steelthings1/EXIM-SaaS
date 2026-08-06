# Bundle B REST API Specification

## Endpoints Summary

### 1. Sales Quotations API
- `GET /api/sales/quotations`: Fetch active export proforma quotations.
- `POST /api/sales/quotations`: Issue new Proforma Invoice / quotation.

### 2. International Sales Contracts API
- `GET /api/sales/contracts`: Retrieve sales contracts and AI legal risk scores.
- `POST /api/sales/contracts`: Run AI legal risk audit on international sales agreements against UN CISG 1980 rules.

### 3. Vendor Procurement POs API
- `GET /api/procurement/orders`: Fetch active vendor purchase orders.
- `POST /api/procurement/orders`: Issue new vendor purchase order.

### 4. 26-Step Pipeline Tracker API
- `GET /api/workflow/pipeline`: Retrieve pipeline instances and milestone progress.
- `POST /api/workflow/pipeline`: Advance trade order instance to next sequential milestone.
