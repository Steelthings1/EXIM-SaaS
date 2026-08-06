#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 9: Export Sales & Quotations Engine Test Suite
Verifies:
1. Quotation total calculation (subtotal + freight + insurance)
2. Gross margin math: ((sales - cost) / sales) * 100
"""

import unittest


def calculate_quotation_margin(subtotal: float, freight: float, insurance: float, cost: float):
    total_offer = round(subtotal + freight + insurance, 2)
    gross_profit = round(total_offer - cost, 2)
    gross_margin_pct = round((gross_profit / total_offer) * 100.0, 2) if total_offer > 0 else 0.0

    return {
        "total_offer": total_offer,
        "gross_profit": gross_profit,
        "gross_margin_pct": gross_margin_pct
    }


class TestModule9SalesQuotationEngine(unittest.TestCase):

    def test_quotation_total_and_margin_calculation(self):
        res = calculate_quotation_margin(46250.00, 2500.00, 250.00, 38000.00)
        self.assertEqual(res["total_offer"], 49000.00)
        self.assertEqual(res["gross_profit"], 11000.00)
        self.assertEqual(res["gross_margin_pct"], 22.45)


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 9: Sales Quotation & Margin Test Suite           ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 9 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 9 tests failed!")
