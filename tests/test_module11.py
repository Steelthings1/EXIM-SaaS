#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 11: Shipment Booking & Multi-Carrier Freight Aggregator Test Suite
Verifies:
1. Ocean & air freight surcharge calculation math (Base + Origin THC + Destination THC + BAF + ISPS)
"""

import unittest


def calculate_total_freight(base_freight: float, thc_origin: float, thc_dest: float, baf: float, isps: float):
    total_surcharges = thc_origin + thc_dest + baf + isps
    total_freight = round(base_freight + total_surcharges, 2)
    return {"total_surcharges": total_surcharges, "total_freight": total_freight}


class TestModule11FreightQuoteEngine(unittest.TestCase):

    def test_freight_surcharge_total_calculation(self):
        res = calculate_total_freight(1950.00, 150.00, 200.00, 350.00, 15.00)
        self.assertEqual(res["total_surcharges"], 715.00) # 150 + 200 + 350 + 15
        self.assertEqual(res["total_freight"], 2665.00) # 1950 + 715


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 11: Freight Rate & Surcharge Engine Test Suite    ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 11 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 11 tests failed!")
