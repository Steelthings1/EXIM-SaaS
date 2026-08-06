#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 7: Manufacturing & Export Production Batch Execution Test Suite
Verifies:
1. Batch yield efficiency calculation math: (actual_yield / target_yield) * 100
2. Minimum 90.0% yield efficiency compliance & rejection threshold rules
"""

import unittest


def evaluate_production_batch_yield(target_qty: float, actual_qty: float):
    if target_qty <= 0:
        return {"yield_pct": 0.0, "status": "INVALID_TARGET"}

    yield_pct = round((actual_qty / target_qty) * 100.0, 2)
    is_compliant = yield_pct >= 90.0
    status = "COMPLETED" if is_compliant else "REJECTED"

    return {
        "yield_pct": yield_pct,
        "is_compliant": is_compliant,
        "status": status
    }


class TestModule7ProductionBatchEngine(unittest.TestCase):

    def test_compliant_production_yield(self):
        res = evaluate_production_batch_yield(10000.0, 9850.0)
        self.assertEqual(res["yield_pct"], 98.50)
        self.assertTrue(res["is_compliant"])
        self.assertEqual(res["status"], "COMPLETED")

    def test_rejected_production_yield_below_threshold(self):
        res = evaluate_production_batch_yield(10000.0, 8500.0) # 85% < 90%
        self.assertEqual(res["yield_pct"], 85.00)
        self.assertFalse(res["is_compliant"])
        self.assertEqual(res["status"], "REJECTED")


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 7: Manufacturing Production Batch Test Suite     ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 7 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 7 tests failed!")
