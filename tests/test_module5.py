#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 5: Multi-Warehouse Inventory & Batch Tracking Engine Test Suite
Verifies:
1. Inward/outward stock balance calculations with insufficient stock guards
2. Minimum reorder level point alert triggers
"""

import unittest


def process_stock_movement(movement_type: str, quantity: float, current_stock: float, min_reorder_level: float = 500.0):
    if quantity <= 0:
        return {"success": False, "error": "Invalid quantity"}

    new_stock = current_stock
    if movement_type in ["INWARD_RECEIPT", "BIN_ADJUSTMENT"]:
        new_stock = current_stock + quantity
    elif movement_type in ["OUTWARD_DISPATCH", "INTER_WAREHOUSE_TRANSFER"]:
        if current_stock < quantity:
            return {"success": False, "error": "Insufficient stock"}
        new_stock = current_stock - quantity

    reorder_alert = new_stock < min_reorder_level

    return {
        "success": True,
        "previous_stock": current_stock,
        "new_stock": new_stock,
        "reorder_alert": reorder_alert
    }


class TestModule5InventoryEngine(unittest.TestCase):

    def test_inward_movement(self):
        res = process_stock_movement("INWARD_RECEIPT", 2000.0, 1000.0)
        self.assertTrue(res["success"])
        self.assertEqual(res["new_stock"], 3000.0)

    def test_outward_dispatch(self):
        res = process_stock_movement("OUTWARD_DISPATCH", 500.0, 1000.0)
        self.assertTrue(res["success"])
        self.assertEqual(res["new_stock"], 500.0)

    def test_insufficient_stock_guard(self):
        res = process_stock_movement("OUTWARD_DISPATCH", 1500.0, 1000.0)
        self.assertFalse(res["success"])
        self.assertEqual(res["error"], "Insufficient stock")

    def test_reorder_alert_trigger(self):
        res = process_stock_movement("OUTWARD_DISPATCH", 800.0, 1000.0, min_reorder_level=500.0)
        self.assertTrue(res["success"])
        self.assertEqual(res["new_stock"], 200.0)
        self.assertTrue(res["reorder_alert"])


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 5: Multi-Warehouse Inventory Test Suite          ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 5 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 5 tests failed!")
