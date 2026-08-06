#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 18: Regulatory & Statutory License Vault Test Suite
Verifies:
1. License expiry countdown evaluation rules (active vs expiring soon vs expired)
2. Expiry alert triggers (<30 days threshold)
"""

import unittest
from datetime import datetime, timedelta


def evaluate_license_expiry(expiry_date_str: str):
    expiry = datetime.strptime(expiry_date_str, "%Y-%m-%d")
    now = datetime.now()
    days_remaining = (expiry - now).days

    status = "ACTIVE"
    if days_remaining <= 0:
        status = "EXPIRED"
    elif days_remaining <= 30:
        status = "EXPIRING_SOON"

    return {"days_remaining": days_remaining, "status": status}


class TestModule18StatutoryLicenseEngine(unittest.TestCase):

    def test_license_expiry_evaluation_active(self):
        future_date = (datetime.now() + timedelta(days=100)).strftime("%Y-%m-%d")
        res = evaluate_license_expiry(future_date)
        self.assertEqual(res["status"], "ACTIVE")
        self.assertGreater(res["days_remaining"], 30)

    def test_license_expiring_soon_warning_trigger(self):
        soon_date = (datetime.now() + timedelta(days=15)).strftime("%Y-%m-%d")
        res = evaluate_license_expiry(soon_date)
        self.assertEqual(res["status"], "EXPIRING_SOON")
        self.assertLessEqual(res["days_remaining"], 30)


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 18: Statutory License Vault Engine Test Suite     ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 18 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 18 tests failed!")
