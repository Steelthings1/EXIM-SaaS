# Bundle C REST API Specification

## Endpoints Summary

### 1. Manufacturing Production Batches API
- `GET /api/production/batches`: Retrieve active manufacturing batch production runs.
- `POST /api/production/batches`: Schedule new production batch.

### 2. QC Lab Inspection Reports API
- `GET /api/qc/inspections`: Retrieve ISO 17025 lab inspection reports.
- `POST /api/qc/inspections`: Log new lab test parameter report.

### 3. 3D Container Loading Planner API
- `POST /api/qc/container-loading`: Calculate container weight and volume utilization %, recommend container types, and flag overweight cargo risks.

### 4. Export Certificates Vault API
- `GET /api/certificates/vault`: Retrieve active Phytosanitary, CoA, and Health Certificates.
- `POST /api/certificates/vault`: Auto-draft statutory export certificate with AI Agent.
