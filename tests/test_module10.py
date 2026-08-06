#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 10: International Sales Contracts & AI Legal Auditor Test Suite
Verifies:
1. Contract risk score calculation under Incoterm liability rules (e.g., DDP vs EXW)
2. Open account threshold penalties above $50,000
"""

import unittest


def audit_contract_risk(incoterm: str, total_value: float, payment_terms: str, credit_days: int):
    risk_score = 0
    if incoterm == "DDP":
        risk_score += 25
    elif incoterm == "EXW":
        risk_score += 15

    if credit_days > 60:
        risk_score += 10

    if total_value > 50000 and "open account" in payment_terms.lower():
        risk_score += 15

    risk_level = "HIGH" if risk_score >= 25 else "LOW"
    return {"risk_score": risk_score, "risk_level": risk_level}


class TestModule10ContractAuditEngine(unittest.TestCase):

    def test_ddp_and_open_account_high_risk_penalty(self):
        res = audit_contract_risk("DDP", 75000.0, "Open Account 60 Days", 60)
        self.assertEqual(res["risk_score"], 40) # 25 (DDP) + 15 (Open Account > $50k)
        self.assertEqual(res["risk_level"], "HIGH")


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 10: Contract Audit & AI Legal Test Suite          ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 10 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 10 tests failed!")
