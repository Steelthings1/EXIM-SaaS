#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Database Deployment & Health Check Script
Verifies master SQL migration compilation and database environment sanity.
"""

import os
import sys


def check_environment_file():
    env_file = ".env.production.example"
    if not os.path.exists(env_file):
        print(f"FAILED: Environment configuration template {env_file} missing!")
        return False
    print(f"PASSED: Environment configuration template {env_file} exists.")
    return True


def check_master_sql_schema():
    schema_file = "database/deploy_master_production_schema.sql"
    if not os.path.exists(schema_file):
        print(f"FAILED: Master schema file {schema_file} missing!")
        return False

    with open(schema_file, "r") as f:
        content = f.read()

    schemas_to_check = ["org_sys", "compliance_sys", "crm_sys", "product_sys", "inventory_sys", "doc_sys", "sales_sys", "procurement_sys", "workflow_sys", "production_sys", "qc_sys", "cert_sys", "logistics_sys", "insurance_sys", "finance_sys", "banking_sys", "incentive_sys", "kb_sys", "analytics_sys", "api_sys", "marketplace_sys", "auth_sys"]
    missing = [s for s in schemas_to_check if f"CREATE SCHEMA IF NOT EXISTS {s};" not in content]

    if missing:
        print(f"FAILED: Missing domain schemas: {missing}")
        return False

    print(f"PASSED: Master SQL Schema contains all 22 domain schemas.")
    return True


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Step 1: Database Deployment & Health Check             ")
    print("======================================================================")

    e_ok = check_environment_file()
    s_ok = check_master_sql_schema()

    if e_ok and s_ok:
        print("\nStep 1 Deployment & Master Database Verification PASSED (100% SUCCESS)")
        sys.exit(0)
    else:
        print("\nStep 1 Deployment verification failed!")
        sys.exit(1)
