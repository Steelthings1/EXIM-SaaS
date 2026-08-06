# Bundle D REST API Specification

## Endpoints Summary

### 1. Multi-Carrier Freight Quotes API
- `GET /api/logistics/freight-quotes`: Fetch spot freight rate quotes across ocean carriers.
- `POST /api/logistics/freight-quotes`: Filter freight quotes by POL/POD ports and sort mode.

### 2. Carrier Bookings API
- `GET /api/logistics/booking`: Retrieve active carrier shipping bookings.
- `POST /api/logistics/booking`: Confirm carrier booking reference.

### 3. Satellite AIS Vessel Tracking API
- `GET /api/logistics/ais-tracking`: Retrieve live satellite AIS telemetry events trail.
- `POST /api/logistics/ais-tracking`: Query AIS vessel telemetry by booking reference or vessel name.

### 4. Marine Cargo Insurance API
- `GET /api/insurance/marine-policy`: Fetch active marine cargo insurance policies.
- `POST /api/insurance/marine-policy`: Issue new Marine Cargo Policy with 110% CIF sum insured valuation.
