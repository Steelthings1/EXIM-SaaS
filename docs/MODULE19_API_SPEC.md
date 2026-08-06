# Module 19 REST API Specification

## Endpoints Summary

### 1. Developer API Keys API
- `GET /api/developer/keys`: Retrieve active developer API key credentials and rate limit quotas.
- `POST /api/developer/keys`: Generate a new production developer API key (`exim_live_...`).

### 2. Webhook Subscriptions API
- `GET /api/developer/webhooks`: Retrieve registered webhook endpoints and event subscriptions.
- `POST /api/developer/webhooks`: Subscribe an external endpoint URL to trade events and receive an HMAC SHA-256 signature secret.
