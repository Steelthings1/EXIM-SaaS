# Module 19 End-User Setup & Usage Guide

## Step-by-Step Developer API & Webhook Setup Guide

### Step 1: Manage Developer API Keys
1. Navigate to `/developer/api-keys`.
2. Input key description and rate limit ceiling, then click "Generate Production API Key Credentials" to receive an `exim_live_...` key.

### Step 2: Configure Real-Time Webhooks
1. Navigate to `/developer/webhooks`.
2. Input target endpoint URL and subscribe to `shipment.updated`, `customs.cleared`, and `ebrc.issued` events to receive an HMAC SHA-256 secret.
