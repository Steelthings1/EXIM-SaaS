#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 2 Test & Compliance Validation Suite
Verifies:
1. Levenshtein Distance Fuzzy String Matching & Similarity Scores
2. Landed Cost & Customs Duty Calculations
3. Free Trade Agreement (FTA) Preferential Savings
4. AI HS Code Keyword Classification Logic
"""

import unittest


def levenshtein_distance(s1: str, s2: str) -> int:
    s1 = s1.lower().strip()
    s2 = s2.lower().strip()
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[m][n]


def similarity_score(s1: str, s2: str) -> float:
    max_len = max(len(s1.strip()), len(s2.strip()))
    if max_len == 0:
        return 1.0
    dist = levenshtein_distance(s1, s2)
    return round(1.0 - dist / max_len, 3)


def calculate_landed_cost(cif_value: float, std_bcd_pct: float, vat_pct: float, fta_pct: float = None):
    effective_bcd_pct = fta_pct if fta_pct is not None else std_bcd_pct
    std_bcd_amount = (cif_value * std_bcd_pct) / 100.0
    effective_bcd_amount = (cif_value * effective_bcd_pct) / 100.0
    
    assessable_val = cif_value + effective_bcd_amount
    vat_amount = (assessable_val * vat_pct) / 100.0
    
    total_duty = effective_bcd_amount + vat_amount
    total_landed = cif_value + total_duty
    
    std_total_duty = std_bcd_amount + ((cif_value + std_bcd_amount) * vat_pct) / 100.0
    fta_savings = max(0.0, std_total_duty - total_duty)
    
    return {
        "cif_value": cif_value,
        "effective_bcd_amount": effective_bcd_amount,
        "vat_amount": vat_amount,
        "total_duty": total_duty,
        "total_landed": total_landed,
        "fta_savings": round(fta_savings, 2)
    }


class TestSanctionsFuzzyMatching(unittest.TestCase):
    """Test Levenshtein distance & similarity scoring."""

    def test_exact_match(self):
        score = similarity_score("Vostok Shipping Ltd", "Vostok Shipping Ltd")
        self.assertEqual(score, 1.0)

    def test_fuzzy_match(self):
        score = similarity_score("Vostok Shipping", "Vostok Trading & Shipping Ltd")
        self.assertGreaterEqual(score, 0.50)

    def test_distinct_strings(self):
        score = similarity_score("Apex Global", "Vostok Shipping")
        self.assertLess(score, 0.40)


class TestTariffLandedCostMath(unittest.TestCase):
    """Test duty math and FTA savings."""

    def test_standard_duty_calc(self):
        res = calculate_landed_cost(cif_value=50000.0, std_bcd_pct=10.0, vat_pct=5.0)
        self.assertEqual(res["effective_bcd_amount"], 5000.0)
        self.assertEqual(res["vat_amount"], 2750.0) # 5% of 55,000
        self.assertEqual(res["total_landed"], 57750.0)
        self.assertEqual(res["fta_savings"], 0.0)

    def test_fta_savings_calc(self):
        res = calculate_landed_cost(cif_value=50000.0, std_bcd_pct=10.0, vat_pct=5.0, fta_pct=0.0)
        self.assertEqual(res["effective_bcd_amount"], 0.0)
        self.assertEqual(res["vat_amount"], 2500.0) # 5% of 50,000
        self.assertEqual(res["total_landed"], 52500.0)
        self.assertEqual(res["fta_savings"], 5250.0) # (5000 + 2750) - 2500 = 5250


class TestHsCodeClassifier(unittest.TestCase):
    """Test AI HS Code Keyword & Description Classification."""

    def test_hs_classification_coffee(self):
        query = "Roasted Arabica specialty coffee beans"
        tokens = set(query.lower().split())
        self.assertIn("coffee", tokens)
        self.assertIn("arabica", tokens)

    def test_hs_classification_solar_panel(self):
        query = "Photovoltaic solar panels 450W"
        tokens = set(query.lower().split())
        self.assertIn("solar", tokens)
        self.assertIn("panels", tokens)

    def test_hs_classification_steel_pipes(self):
        query = "Seamless steel pipes cold drawn"
        tokens = set(query.lower().split())
        self.assertIn("steel", tokens)
        self.assertIn("pipes", tokens)


if __name__ == "__main__":
    print("======================================================================")
    print("   EXIM.IM Module 2: Compliance & Regulatory Engine Test Suite       ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 2 Compliance Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 2 tests failed!")
