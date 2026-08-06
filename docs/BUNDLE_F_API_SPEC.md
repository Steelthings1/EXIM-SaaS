# Bundle F REST API Specification

## Endpoints Summary

### 1. Multi-Modal AI Copilot API
- `POST /api/ai/copilot`: Process Document RAG queries, voice commands, or packaging label vision scans.

### 2. 10-Dashboard Analytics API
- `GET /api/analytics/dashboards`: Retrieve KPI cards and operational metrics for any of the 10 specialized dashboard views.
- `POST /api/analytics/dashboards`: Filter analytics data by dashboard view type.

### 3. Country Knowledge Base API
- `GET /api/kb/country-intelligence`: Retrieve country customs rules, food labeling mandates, and FTA preferences.

### 4. Developer API & Webhooks API
- `GET /api/developer/api-keys`: Fetch active API keys and rate limits.
- `POST /api/developer/api-keys`: Generate new API keys and HMAC SHA-256 webhook secrets.

### 5. Ecosystem Marketplace API
- `GET /api/marketplace/partners`: Fetch vetted CHAs, Freight Forwarders, and NABL labs.
