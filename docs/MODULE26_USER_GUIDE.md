# Module 26 End-User Setup & Usage Guide

## Step-by-Step System Health Audit & Verification Guide

### Step 1: Master Verification Audit
1. Run `python scripts/verify_full_platform.py` to audit database DDL migrations, TypeScript engines, REST API routes, UI workspaces, and test suites.
2. Query GET `/api/system/health-audit` to inspect system health metrics and component counts.
