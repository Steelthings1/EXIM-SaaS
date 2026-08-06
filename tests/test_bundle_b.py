#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Bundle B Test Suite
Verifies:
1. 26-Step Trade Pipeline State Machine Advancement & Progress Math
2. AI International Sales Contract Risk Auditing (UN CISG 1980 & Incoterms 2020)
"""

import unittest

# 26 Sequential Milestones
PIPELINE_STAGES = [
    {"index": 1, "code": "INQUIRY_LEAD", "progress": 4.0},
    {"index": 2, "code": "SANCTIONS_CLEARED", "progress": 8.0},
    {"index": 3, "code": "PROFORMA_ISSUED", "progress": 12.0},
    {"index": 4, "code": "CONTRACT_EXECUTED", "progress": 16.0},
    {"index": 5, "code": "LC_VERIFIED", "progress": 20.0},
    {"index": 6, "code": "PO_VENDOR_ISSUED", "progress": 24.0},
    {"index": 7, "code": "PRODUCTION_STARTED", "progress": 28.0},
    {"index": 8, "code": "QUALITY_INSPECTED", "progress": 32.0},
    {"index": 9, "code": "PACKAGING_LABELED", "progress": 36.0},
    {"index": 10, "code": "WAREHOUSE_STAGED", "progress": 40.0},
    {"index": 11, "code": "BOOKING_CONFIRMED", "progress": 44.0},
    {"index": 12, "code": "SHIPPING_BILL_FILED", "progress": 48.0},
    {"index": 13, "code": "LET_EXPORT_ORDER", "progress": 52.0},
    {"index": 14, "code": "CONTAINER_STUFFED", "progress": 56.0},
    {"index": 15, "code": "GATED_IN_PORT", "progress": 60.0},
    {"index": 16, "code": "VESSEL_LOADED", "progress": 64.0},
    {"index": 17, "code": "BILL_OF_LADING_ISSUED", "progress": 68.0},
    {"index": 18, "code": "DOCS_DISPATCHED_BANK", "progress": 72.0},
    {"index": 19, "code": "CUSTOMS_CLEARANCE_DEST", "progress": 76.0},
    {"index": 20, "code": "DELIVERED_CONSIGNEE", "progress": 80.0},
    {"index": 21, "code": "EXPORT_PROCEEDS_REALIZED", "progress": 85.0},
    {"index": 22, "code": "GST_REFUND_CLAIMED", "progress": 90.0},
    {"index": 23, "code": "RODTEP_CREDITED", "progress": 94.0},
    {"index": 24, "code": "AUDIT_COMPLETED", "progress": 97.0},
    {"index": 25, "code": "ORDER_ARCHIVED", "progress": 100.0},
    {"index": 26, "code": "COMPLETE_SUCCESS", "progress": 100.0}
]


def advance_pipeline(current_index: int):
    next_index = min(current_index + 1, 26)
    stage = PIPELINE_STAGES[next_index - 1]
    return next_index, stage["code"], stage["progress"]


def audit_contract(governing_law: str, incoterms: str, payment_terms: str):
    risk_score = 10
    is_cisg = "CISG" in governing_law.upper() or "UNITED NATIONS" in governing_law.upper()

    if not is_cisg:
        risk_score += 25

    if incoterms.upper() == "EXW":
        risk_score += 25

    if "OPEN_ACCOUNT" in payment_terms.upper() or "NET_90" in payment_terms.upper():
        risk_score += 30

    final_score = min(100, risk_score)
    rating = "HIGH_RISK" if final_score >= 50 else ("MODERATE_RISK" if final_score >= 25 else "LOW_RISK")

    return final_score, rating, is_cisg


class TestPipelineStateMachine(unittest.TestCase):
    """Test 26-step pipeline advancement math."""

    def test_pipeline_advancement(self):
        next_idx, code, pct = advance_pipeline(11)
        self.assertEqual(next_idx, 12)
        self.assertEqual(code, "SHIPPING_BILL_FILED")
        self.assertEqual(pct, 48.0)

    def test_pipeline_max_cap(self):
        next_idx, code, pct = advance_pipeline(26)
        self.assertEqual(next_idx, 26)
        self.assertEqual(code, "COMPLETE_SUCCESS")
        self.assertEqual(pct, 100.0)


class TestContractRiskAuditor(unittest.TestCase):
    """Test AI contract legal risk auditor math."""

    def test_cisg_low_risk_contract(self):
        score, rating, is_cisg = audit_contract("UN_CISG_1980", "CIF", "LC_AT_SIGHT")
        self.assertEqual(score, 10)
        self.assertEqual(rating, "LOW_RISK")
        self.assertTrue(is_cisg)

    def test_high_risk_contract(self):
        score, rating, is_cisg = audit_contract("English Law", "EXW", "NET_90_OPEN_ACCOUNT")
        self.assertEqual(score, 90) # 10 + 25 + 25 + 30
        self.assertEqual(rating, "HIGH_RISK")
        self.assertFalse(is_cisg)


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Bundle B: Workflow & Contract Test Suite                ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Bundle B Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nBundle B tests failed!")
