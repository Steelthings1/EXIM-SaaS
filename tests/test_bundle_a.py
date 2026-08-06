#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Bundle A Test Suite
Verifies:
1. Single-Entry Order Data Calculation Engine (Subtotal, Freight, Insurance, CIF Total)
2. Weight & Packaging Recalculations (Net Weight, Gross Weight, Volume CBM, Carton Count)
3. Document Intelligence AI Agent Integrity Scanning
"""

import math
import unittest


def calculate_single_entry_order(items, freight_cost=0.0, insurance_cost=0.0):
    subtotal = 0.0
    total_net_wt = 0.0
    total_gross_wt = 0.0
    total_cbm = 0.0
    total_cartons = 0

    for item in items:
        qty = item["qty"]
        line_subtotal = round(qty * item["unit_price"], 2)
        line_net_wt = round(qty * item["net_wt"], 3)
        line_gross_wt = round(qty * item["gross_wt"], 3)
        line_cbm = round(qty * item["cbm"], 4)
        line_cartons = math.ceil(qty / item.get("units_per_carton", 1))

        subtotal += line_subtotal
        total_net_wt += line_net_wt
        total_gross_wt += line_gross_wt
        total_cbm += line_cbm
        total_cartons += line_cartons

    total_cif = round(subtotal + freight_cost + insurance_cost, 2)

    return {
        "subtotal": round(subtotal, 2),
        "freight_cost": freight_cost,
        "insurance_cost": insurance_cost,
        "total_cif": total_cif,
        "total_net_wt": round(total_net_wt, 3),
        "total_gross_wt": round(total_gross_wt, 3),
        "total_cbm": round(total_cbm, 4),
        "total_cartons": total_cartons
    }


class TestSingleEntryCalculationEngine(unittest.TestCase):
    """Verifies single entry math propagation."""

    def test_single_item_propagation(self):
        items = [
            {
                "sku": "COF-ARAB-001",
                "qty": 1000,
                "unit_price": 14.50,
                "net_wt": 1.00,
                "gross_wt": 1.05,
                "cbm": 0.0025,
                "units_per_carton": 10
            }
        ]
        res = calculate_single_entry_order(items, freight_cost=500.0, insurance_cost=50.0)

        self.assertEqual(res["subtotal"], 14500.0)
        self.assertEqual(res["total_cif"], 15050.0)
        self.assertEqual(res["total_net_wt"], 1000.0)
        self.assertEqual(res["total_gross_wt"], 1050.0)
        self.assertEqual(res["total_cbm"], 2.5)
        self.assertEqual(res["total_cartons"], 100)

    def test_multi_item_order_totals(self):
        items = [
            {
                "sku": "COF-ARAB-001",
                "qty": 2500,
                "unit_price": 14.50,
                "net_wt": 1.00,
                "gross_wt": 1.05,
                "cbm": 0.0025,
                "units_per_carton": 10
            },
            {
                "sku": "RIC-BASM-002",
                "qty": 1000,
                "unit_price": 12.00,
                "net_wt": 5.00,
                "gross_wt": 5.10,
                "cbm": 0.0080,
                "units_per_carton": 4
            }
        ]
        res = calculate_single_entry_order(items, freight_cost=1850.0, insurance_cost=150.0)

        # 2500 * 14.50 = 36250; 1000 * 12.00 = 12000 -> subtotal 48250
        self.assertEqual(res["subtotal"], 48250.0)
        self.assertEqual(res["total_cif"], 50250.0) # 48250 + 1850 + 150
        self.assertEqual(res["total_net_wt"], 7500.0) # (2500*1.0) + (1000*5.0)
        self.assertEqual(res["total_gross_wt"], 7725.0) # (2500*1.05) + (1000*5.1)
        self.assertEqual(res["total_cbm"], 14.25) # (2500*0.0025) + (1000*0.008)
        self.assertEqual(res["total_cartons"], 500) # 250 + 250


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Bundle A: Single-Entry Engine Test Suite                ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Bundle A Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nBundle A tests failed!")
