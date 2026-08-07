# Module 29 REST API Specification

## Endpoints Summary

### 1. Developer API Keys V3 API
- `GET /api/developer/api-keys-v3`: Fetch active developer API keys V3.
- `POST /api/developer/api-keys-v3`: Generate a new live developer API key with `exim_live_...` prefix.

### 2. Webhook Subscriptions V3 API
- `GET /api/developer/webhook-subscriptions-v3`: Fetch registered HTTP webhook event listeners V3.
- `POST /api/developer/webhook-subscriptions-v3`: Register a new target webhook listener URL and generate HMAC SHA-256 secret.
