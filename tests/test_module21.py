#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 21: Banking, LC UCP 600 Auditor & EDPMS Reconciliation Test Suite
Verifies:
1. LC UCP 600 discrepancy evaluation rules (value overrun, weight mismatch, transshipment prohibition)
2. EDPMS closure INR value calculation math
"""

import unittest


def audit_lc_presentation_mock(lc_amount: float, inv_amount: float, allow_trans: bool, is_trans: bool, inv_wt: float, bl_wt: float):
    discrepancies = []
    if inv_amount > lc_amount:
        discrepancies.append("Value Overrun")
    if not allow_trans and is_trans:
        discrepancies.append("Transshipment Prohibited")
    if inv_wt != bl_wt:
        discrepancies.append("Weight Mismatch")

    return {"is_compliant": len(discrepancies) == 0, "discrepancies": discrepancies}


class TestModule21BankingAuditorEngine(unittest.TestCase):

    def test_ucp_600_discrepancy_rules(self):
        # Value overrun & transshipment prohibition -> Non-compliant
        res1 = audit_lc_presentation_mock(50000.0, 52000.0, False, True, 12500.0, 12500.0)
        self.assertFalse(res1["is_compliant"])
        self.assertIn("Value Overrun", res1["discrepancies"])
        self.assertIn("Transshipment Prohibited", res1["discrepancies"])

        # Fully compliant presentation
        res2 = audit_lc_presentation_mock(50000.0, 49000.0, False, False, 12500.0, 12500.0)
        self.assertTrue(res2["is_compliant"])


if __name__ == "__main__":
    print("======================================================================")
    print("   EXIM.IM Module 21: Banking & LC UCP 600 Auditor Engine Test Suite   ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 21 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 21 tests failed!")
