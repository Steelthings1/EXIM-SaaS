#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Bundle D Test Suite
Verifies:
1. Marine Cargo Insurance Valuation Math (110% CIF Valuation & Premium Rate %)
2. Multi-Carrier Freight Quote Aggregator Sorting Math
"""

import unittest


def calculate_marine_insurance(cif_valuation_usd: float, premium_rate_pct: float = 0.25):
    sum_insured_usd = round(cif_valuation_usd * 1.10, 2) # 110% of CIF
    total_premium_usd = round((sum_insured_usd * premium_rate_pct) / 100.0, 2)
    return sum_insured_usd, total_premium_usd


def sort_freight_quotes(quotes, sort_by: str = "CHEAPEST"):
    if sort_by == "FASTEST":
        return sorted(quotes, key=lambda x: x["transit_days"])
    return sorted(quotes, key=lambda x: x["total_cost_usd"])


class TestMarineInsuranceEngine(unittest.TestCase):
    """Test 110% CIF sum insured valuation and premium calculations."""

    def test_insurance_sum_insured(self):
        sum_insured, premium = calculate_marine_insurance(50250.00, premium_rate_pct=0.25)
        self.assertEqual(sum_insured, 55275.00) # 50250 * 1.10
        self.assertEqual(premium, 138.19) # 55275 * 0.0025

    def test_insurance_high_valuation(self):
        sum_insured, premium = calculate_marine_insurance(100000.00, premium_rate_pct=0.20)
        self.assertEqual(sum_insured, 110000.00) # 100000 * 1.10
        self.assertEqual(premium, 220.00) # 110000 * 0.0020


class TestFreightAggregatorSorting(unittest.TestCase):
    """Test freight rate quote sorting by price and transit time."""

    def setUp(self):
        self.quotes = [
            {"carrier": "CMA CGM", "total_cost_usd": 1970.0, "transit_days": 13},
            {"carrier": "MSC", "total_cost_usd": 1700.0, "transit_days": 16},
            {"carrier": "Maersk", "total_cost_usd": 1850.0, "transit_days": 14}
        ]

    def test_sort_cheapest(self):
        sorted_quotes = sort_freight_quotes(self.quotes, sort_by="CHEAPEST")
        self.assertEqual(sorted_quotes[0]["carrier"], "MSC")
        self.assertEqual(sorted_quotes[0]["total_cost_usd"], 1700.0)

    def test_sort_fastest(self):
        sorted_quotes = sort_freight_quotes(self.quotes, sort_by="FASTEST")
        self.assertEqual(sorted_quotes[0]["carrier"], "CMA CGM")
        self.assertEqual(sorted_quotes[0]["transit_days"], 13)


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Bundle D: Freight & Marine Insurance Test Suite         ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Bundle D Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nBundle D tests failed!")
