#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 4: Customer & Supplier CRM with KYB Verification Test Suite
Verifies:
1. KYB statutory tax ID format validation (GSTIN 15-char, UAE TRN 15-char, UK VAT 9-digit)
2. Corporate credit risk rating calculation
"""

import re
import unittest


def verify_kyb_tax_id(tax_id_type: str, tax_id_number: str, annual_turnover_usd: float = 1000000.0, credit_requested_usd: float = 50000.0):
    clean_id = tax_id_number.strip().upper()
    is_valid = False

    if tax_id_type == "GSTIN":
        is_valid = len(clean_id) == 15
    elif tax_id_type == "UAE_TRN":
        is_valid = bool(re.match(r"^[0-9]{15}$", clean_id))
    elif tax_id_type == "UK_VAT":
        is_valid = bool(re.match(r"^GB[0-9]{9}$", clean_id)) or bool(re.match(r"^[0-9]{9}$", clean_id))

    if not is_valid:
        return {"status": "INVALID_FORMAT", "credit_risk": "HIGH_RISK"}

    credit_ratio = credit_requested_usd / annual_turnover_usd
    credit_risk = "LOW_RISK"
    if credit_ratio > 0.20:
        credit_risk = "HIGH_RISK"
    elif credit_ratio > 0.08:
        credit_risk = "MEDIUM_RISK"

    return {"status": "VERIFIED", "credit_risk": credit_risk}


class TestModule4KybEngine(unittest.TestCase):

    def test_uae_trn_valid(self):
        res = verify_kyb_tax_id("UAE_TRN", "100412890412803", annual_turnover_usd=2500000.0, credit_requested_usd=100000.0)
        self.assertEqual(res["status"], "VERIFIED")
        self.assertEqual(res["credit_risk"], "LOW_RISK")

    def test_gstin_valid(self):
        res = verify_kyb_tax_id("GSTIN", "27AAACG1234F1ZN")
        self.assertEqual(res["status"], "VERIFIED")

    def test_invalid_tax_id(self):
        res = verify_kyb_tax_id("UAE_TRN", "INVALID_123")
        self.assertEqual(res["status"], "INVALID_FORMAT")
        self.assertEqual(res["credit_risk"], "HIGH_RISK")


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 4: CRM & KYB Verification Test Suite             ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 4 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 4 tests failed!")
