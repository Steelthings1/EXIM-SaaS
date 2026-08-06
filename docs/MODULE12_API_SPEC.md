# Module 12 REST API Specification

## Endpoints Summary

### 1. AIS Telemetry API
- `GET /api/logistics/ais-telemetry`: Fetch live satellite ocean vessel positions and MMSI signals.
- `POST /api/logistics/ais-telemetry`: Update satellite vessel AIS coordinates and speed/heading parameters.

### 2. Container Milestones API
- `GET /api/logistics/container-milestones`: Retrieve container event milestone pipeline history.
- `POST /api/logistics/container-milestones`: Log new container milestone events to the timeline ledger.
