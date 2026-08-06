#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 13: Marine Cargo Insurance & Policy Vault Test Suite
Verifies:
1. 110% CIF sum insured valuation math (cif_value * 1.10)
2. Premium rate calculations across Institute Cargo Clauses A (0.30%) and C (0.12%)
"""

import unittest


def calculate_marine_policy(cif_value: float, clause_type: str):
    sum_insured = round(cif_value * 1.10, 2)
    rate_map = {"CLAUSE_A": 0.0030, "CLAUSE_B": 0.0020, "CLAUSE_C": 0.0012}
    rate = rate_map.get(clause_type, 0.0030)
    premium = round(sum_insured * rate, 2)

    return {
        "sum_insured": sum_insured,
        "premium_rate_pct": rate * 100,
        "premium_amount": premium
    }


class TestModule13MarineInsuranceEngine(unittest.TestCase):

    def test_clause_a_110_cif_valuation(self):
        res = calculate_marine_policy(49000.00, "CLAUSE_A")
        self.assertEqual(res["sum_insured"], 53900.00) # 49000 * 1.10
        self.assertEqual(res["premium_rate_pct"], 0.30)
        self.assertEqual(res["premium_amount"], 161.70) # 53900 * 0.003

    def test_clause_c_basic_cover(self):
        res = calculate_marine_policy(49000.00, "CLAUSE_C")
        self.assertEqual(res["sum_insured"], 53900.00)
        self.assertEqual(res["premium_rate_pct"], 0.12)
        self.assertEqual(res["premium_amount"], 64.68) # 53900 * 0.0012


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 13: Marine Cargo Insurance Engine Test Suite      ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 13 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 13 tests failed!")
