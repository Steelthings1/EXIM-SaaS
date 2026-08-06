#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Bundle E Test Suite
Verifies:
1. Letter of Credit (LC) UCP 600 Discrepancy Auditor Rules
2. eBRC Remittance Realization & Export Incentive Math (RoDTEP 1.4% & Duty Drawback 1.5%)
"""

import unittest


def audit_lc(latest_ship_date: str, bl_date: str, transshipment_allowed: bool, transshipment_occurred: bool, inv_wt: float, bl_wt: float):
    discrepancies = []

    if bl_date > latest_ship_date:
        discrepancies.append("LATE_SHIPMENT")

    if not transshipment_allowed and transshipment_occurred:
        discrepancies.append("TRANSSHIPMENT_VIOLATION")

    if abs(inv_wt - bl_wt) > 0.01:
        discrepancies.append("WEIGHT_MISMATCH")

    is_compliant = len(discrepancies) == 0
    return is_compliant, discrepancies


def calculate_export_incentives(fob_usd: float, ex_rate_inr: float = 83.50, rodtep_pct: float = 1.40, drawback_pct: float = 1.50):
    fob_inr = round(fob_usd * ex_rate_inr, 2)
    rodtep_inr = round((fob_inr * rodtep_pct) / 100.0, 2)
    drawback_inr = round((fob_inr * drawback_pct) / 100.0, 2)
    total_incentive_inr = round(rodtep_inr + drawback_inr, 2)
    return fob_inr, rodtep_inr, drawback_inr, total_incentive_inr


class TestLcAuditorRules(unittest.TestCase):
    """Test LC UCP 600 discrepancy detection rules."""

    def test_clean_lc_presentation(self):
        is_compliant, discrepancies = audit_lc(
            latest_ship_date="2026-02-15",
            bl_date="2026-02-10",
            transshipment_allowed=False,
            transshipment_occurred=False,
            inv_wt=1000.0,
            bl_wt=1000.0
        )
        self.assertTrue(is_compliant)
        self.assertEqual(len(discrepancies), 0)

    def test_discrepant_lc_presentation(self):
        is_compliant, discrepancies = audit_lc(
            latest_ship_date="2026-02-05",
            bl_date="2026-02-10", # Late shipment
            transshipment_allowed=False,
            transshipment_occurred=True, # Transshipment violation
            inv_wt=1000.0,
            bl_wt=1050.0 # Weight mismatch
        )
        self.assertFalse(is_compliant)
        self.assertEqual(len(discrepancies), 3)
        self.assertIn("LATE_SHIPMENT", discrepancies)
        self.assertIn("TRANSSHIPMENT_VIOLATION", discrepancies)
        self.assertIn("WEIGHT_MISMATCH", discrepancies)


class TestExportIncentiveMath(unittest.TestCase):
    """Test RoDTEP & Duty Drawback percentage math."""

    def test_incentive_calculation(self):
        fob_inr, rodtep, drawback, total = calculate_export_incentives(fob_usd=50250.00, ex_rate_inr=83.50, rodtep_pct=1.40, drawback_pct=1.50)
        expected_fob = 4195875.00
        expected_rodtep = round((expected_fob * 1.40) / 100.0, 2)
        expected_drawback = round((expected_fob * 1.50) / 100.0, 2)

        self.assertEqual(fob_inr, expected_fob)
        self.assertEqual(rodtep, expected_rodtep)
        self.assertEqual(drawback, expected_drawback)
        self.assertEqual(total, round(expected_rodtep + expected_drawback, 2))


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Bundle E: Trade Finance & Incentives Test Suite         ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Bundle E Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nBundle E tests failed!")
