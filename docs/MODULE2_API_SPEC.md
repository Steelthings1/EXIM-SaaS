# Module 2 REST API Specification

## Endpoints Summary

### 1. AI HS Code Classification API
- `POST /api/compliance/hs-classify`: Accepts product description and destination country; returns predicted 8-10 digit national HS code, confidence rating, duty rate, and WCO hierarchy tree.

### 2. Country Regulatory Rules API
- `POST /api/compliance/regulatory-check`: Accepts destination country and HS code; returns mandatory statutory certificates, packaging standards, and labeling mandates.

### 3. Tariff & Landed Cost Calculator API
- `POST /api/compliance/tariff-calc`: Accepts CIF value, HS code, exporter/importer countries, BCD, and VAT rates; calculates landed cost, duty amounts, and FTA savings.

### 4. Fuzzy Sanctions Screener API
- `POST /api/compliance/sanctions-screen`: Accepts entity name and similarity threshold (default 0.70); returns Levenshtein distance matches against global denied party lists.
