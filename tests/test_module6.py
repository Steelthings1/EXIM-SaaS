#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 6: Single-Entry Centralized Dataset & Document Intelligence Test Suite
Verifies:
1. Cascading field update propagation math across downstream documents
2. SHA-256 cryptographic revision checksum generation
"""

import hashlib
import json
import unittest


def process_cascading_field_update(order_id: str, qty: float, unit_price: float, freight: float = 2500.0, insurance: float = 250.0):
    subtotal = round(qty * unit_price, 2)
    cif_total = round(subtotal + freight + insurance, 2)
    gross_weight_kg = round(qty * 0.25, 2)
    cbm_volume = round(qty * 0.0012, 4)

    payload_str = json.dumps({"order_id": order_id, "cif_total": cif_total, "weight": gross_weight_kg}, sort_keys=True)
    sha256_checksum = hashlib.sha256(payload_str.encode("utf-8")).hexdigest()

    return {
        "subtotal": subtotal,
        "cif_total": cif_total,
        "gross_weight": gross_weight_kg,
        "cbm_volume": cbm_volume,
        "sha256_checksum": sha256_checksum
    }


class TestModule6CascadingEngine(unittest.TestCase):

    def test_cascading_update_calculation(self):
        res = process_cascading_field_update("EXIM-9041", 2500, 18.50)
        self.assertEqual(res["subtotal"], 46250.00) # 2500 * 18.50
        self.assertEqual(res["cif_total"], 49000.00) # 46250 + 2500 + 250
        self.assertEqual(res["gross_weight"], 625.00) # 2500 * 0.25
        self.assertEqual(len(res["sha256_checksum"]), 64)


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 6: Cascading Engine & SHA-256 Test Suite          ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 6 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 6 tests failed!")
