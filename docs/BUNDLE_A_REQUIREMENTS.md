# Bundle A Requirements Specification: Products, CRM, Inventory & Single-Entry Core Engine

## 1. Executive Overview
Bundle A implements the central single-data-entry propagation hub, Customer/Supplier CRM directory, Product Master Catalog, Multi-Warehouse Batch Inventory, and Document Intelligence AI Agent.

## 2. Technical Capabilities
1. **Single-Entry Propagation Hub**: Updating quantity or price on a single order automatically recalculates subtotal, CIF totals, gross/net weights, volume CBM, carton counts, and auto-populates 5 downstream export documents (Commercial Invoice, Packing List, Certificate of Origin, Purchase Order, Shipping Instructions).
2. **Document Intelligence AI Agent**: Automatically scans order payloads for missing required attributes (Tax IDs, Port UN/LOCODEs, HS Codes) and assesses compliance risk.
3. **Customer & Supplier CRM**: Contact management with KYB status badges, credit limits, and payment terms.
4. **Multi-Warehouse Batch Inventory**: Batch/lot number tracking, manufacturing/expiry dates, and warehouse allocation.
