# Bundle A REST API Specification

## Endpoints Summary

### 1. CRM Contacts API
- `GET /api/crm/contacts`: Retrieve active CRM contacts.
- `POST /api/crm/contacts`: Register new buyer, supplier, or buying house contact.

### 2. Product Master Catalog API
- `GET /api/products`: Fetch product SKUs with HS code mappings and weight/CBM factors.
- `POST /api/products`: Register new SKU in Master Catalog.

### 3. Multi-Warehouse Stock Inventory API
- `GET /api/inventory/stock`: List warehouse stock batches with lot numbers and expiry dates.
- `POST /api/inventory/stock`: Register new batch allocation.

### 4. Single-Entry Order & Document Generator API
- `POST /api/single-entry/order`: Process order payload, calculate totals, and run AI Document Intelligence scan.
- `POST /api/single-entry/generate-docs`: Generate populated document datasets for Invoice, Packing List, COO, PO, and Shipping Instructions.
