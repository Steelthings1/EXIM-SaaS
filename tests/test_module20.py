#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 20: Multi-Currency Finance & Forex Treasury Test Suite
Verifies:
1. Forex exchange gain/loss calculation math (Booked rate vs Realized bank remittance rate)
2. Base currency INR conversion math
"""

import unittest


def calculate_forex_gain_loss(foreign_amount: float, booked_rate: float, realized_rate: float):
    booked_base = round(foreign_amount * booked_rate, 2)
    realized_base = round(foreign_amount * realized_rate, 2)
    fx_gain_loss = round(realized_base - booked_base, 2)

    return {
        "booked_base": booked_base,
        "realized_base": realized_base,
        "fx_gain_loss": fx_gain_loss,
        "is_gain": fx_gain_loss >= 0
    }


class TestModule20ForexTreasuryEngine(unittest.TestCase):

    def test_forex_realized_gain_math(self):
        # $49,000 USD at $1 = ₹83.50 booked vs $1 = ₹84.10 realized
        res = calculate_forex_gain_loss(49000.0, 83.50, 84.10)
        self.assertEqual(res["booked_base"], 4091500.00)
        self.assertEqual(res["realized_base"], 4120900.00)
        self.assertEqual(res["fx_gain_loss"], 29400.00)
        self.assertTrue(res["is_gain"])

    def test_forex_realized_loss_math(self):
        # $10,000 USD at $1 = ₹83.50 booked vs $1 = ₹83.00 realized
        res = calculate_forex_gain_loss(10000.0, 83.50, 83.00)
        self.assertEqual(res["fx_gain_loss"], -5000.00)
        self.assertFalse(res["is_gain"])


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 20: Multi-Currency Finance & Forex Test Suite     ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 20 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 20 tests failed!")
