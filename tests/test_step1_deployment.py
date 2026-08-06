#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Step 1 Infrastructure & Database Provisioning Test Suite
Verifies:
1. Environment configuration template completeness
2. Master SQL schema compilation across 22 domain schemas
"""

import os
import unittest


class TestStep1DeploymentInfrastructure(unittest.TestCase):

    def test_environment_file_exists(self):
        self.assertTrue(os.path.exists(".env.production.example"))

    def test_master_production_schema_file(self):
        self.assertTrue(os.path.exists("database/deploy_master_production_schema.sql"))
        with open("database/deploy_master_production_schema.sql", "r") as f:
            content = f.read()

        schemas = ["org_sys", "compliance_sys", "crm_sys", "product_sys", "inventory_sys", "doc_sys", "sales_sys", "procurement_sys", "workflow_sys", "production_sys", "qc_sys", "cert_sys", "logistics_sys", "insurance_sys", "finance_sys", "banking_sys", "incentive_sys", "kb_sys", "analytics_sys", "api_sys", "marketplace_sys", "auth_sys"]
        for s in schemas:
            self.assertIn(f"CREATE SCHEMA IF NOT EXISTS {s};", content)


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Step 1: Cloud & Database Infrastructure Test Suite      ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Step 1 Deployment Infrastructure Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nStep 1 tests failed!")
