#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 14: Trade Finance, Banking & LC UCP 600 Auditor Test Suite
Verifies:
1. LC UCP 600 discrepancy evaluation rules (value overrun & weight mismatch)
2. Export incentive math (1.4% RoDTEP and 1.5% Duty Drawback on FOB value)
"""

import unittest


def audit_lc_discrepancies(lc_amount: float, invoice_amount: float, invoice_weight: float, bl_weight: float):
    discrepancies = []
    if invoice_amount > lc_amount:
        discrepancies.append("Value Overrun")
    if invoice_weight != bl_weight:
        discrepancies.append("Weight Mismatch")

    return {"discrepancies": discrepancies, "is_compliant": len(discrepancies) == 0}


def calculate_export_incentives(fob_inr: float):
    rodtep = round(fob_inr * 0.014, 2) # 1.4%
    drawback = round(fob_inr * 0.015, 2) # 1.5%
    total = round(rodtep + drawback, 2)

    return {"rodtep": rodtep, "drawback": drawback, "total": total}


class TestModule14TradeFinanceEngine(unittest.TestCase):

    def test_ucp_600_discrepancy_evaluation(self):
        # Test Value Overrun & Weight Mismatch
        res = audit_lc_discrepancies(50000.0, 52000.0, 12500.0, 12000.0)
        self.assertFalse(res["is_compliant"])
        self.assertIn("Value Overrun", res["discrepancies"])
        self.assertIn("Weight Mismatch", res["discrepancies"])

    def test_export_incentive_calculation(self):
        res = calculate_export_incentives(4091500.00)
        self.assertEqual(res["rodtep"], 57281.00)
        self.assertEqual(res["drawback"], 61372.50)
        self.assertEqual(res["total"], 118653.50)


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 14: Trade Finance & LC Auditor Test Suite         ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 14 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 14 tests failed!")
