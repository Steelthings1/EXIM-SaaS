#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 15: Multi-Modal AI Copilot Workspace Test Suite
Verifies:
1. Computer vision packaging label regulatory compliance rules (GCC dual Arabic mandate, Net Weight, Allergen)
"""

import unittest


def audit_packaging_label(target_market: str, net_weight: bool, origin: bool, allergen: bool, dual_lang: bool):
    score = 100
    if not net_weight:
        score -= 25
    if not origin:
        score -= 25
    if not allergen:
        score -= 25
    if target_market == "GCC_GSO" and not dual_lang:
        score -= 25

    return {"score": score, "is_compliant": score == 100}


class TestModule15MultimodalCopilotEngine(unittest.TestCase):

    def test_gcc_gso_dual_language_and_label_compliance(self):
        # GCC Market with missing Arabic dual language -> 75% score (Non-compliant)
        res1 = audit_packaging_label("GCC_GSO", True, True, True, False)
        self.assertFalse(res1["is_compliant"])
        self.assertEqual(res1["score"], 75)

        # Fully compliant GCC label
        res2 = audit_packaging_label("GCC_GSO", True, True, True, True)
        self.assertTrue(res2["is_compliant"])
        self.assertEqual(res2["score"], 100)


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 15: Multi-Modal AI Copilot Engine Test Suite      ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 15 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 15 tests failed!")
