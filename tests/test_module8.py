#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 8: Procurement & Vendor Purchase Orders Test Suite
Verifies:
1. PO line item total calculation math
2. Goods Receipt Notes (GRN) accepted vs. rejected quantity calculation & acceptance rate %
"""

import unittest


def calculate_po_total(line_items: list):
    return sum(item["qty"] * item["unit_price_inr"] for item in line_items)


def evaluate_grn_acceptance(received_qty: float, accepted_qty: float):
    if received_qty <= 0:
        return {"acceptance_rate_pct": 0.0, "rejected_qty": 0.0}

    rejected_qty = round(received_qty - accepted_qty, 2)
    rate_pct = round((accepted_qty / received_qty) * 100.0, 2)

    return {
        "acceptance_rate_pct": rate_pct,
        "rejected_qty": rejected_qty
    }


class TestModule8ProcurementEngine(unittest.TestCase):

    def test_po_line_item_total_calculation(self):
        items = [
            {"sku": "RM-COFFEE-BEANS-01", "qty": 10000, "unit_price_inr": 450.00}
        ]
        total = calculate_po_total(items)
        self.assertEqual(total, 4500000.00)

    def test_grn_acceptance_rate_math(self):
        res = evaluate_grn_acceptance(10000.0, 9950.0)
        self.assertEqual(res["acceptance_rate_pct"], 99.50)
        self.assertEqual(res["rejected_qty"], 50.0)


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 8: Procurement & GRN Engine Test Suite           ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 8 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 8 tests failed!")
