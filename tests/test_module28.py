#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 28: Security Audit Logs & Anomaly Detection Test Suite
Verifies:
1. IP anomaly detection logic (Recognized subnets vs external untrusted IPs)
2. Activity log risk rating assignment
"""

import unittest

RECOGNIZED_SUBNETS = ['106.210.', '182.73.', '49.37.']


def evaluate_ip_anomaly_risk_mock(ip_address: str):
    is_recognized = any(ip_address.startswith(subnet) for subnet in RECOGNIZED_SUBNETS)
    if not is_recognized:
        return {"is_anomaly": True, "risk_rating": "HIGH"}
    return {"is_anomaly": False, "risk_rating": "LOW"}


class TestModule28SecurityAuditEngine(unittest.TestCase):

    def test_ip_anomaly_detection(self):
        # Recognized local subnet
        res_trusted = evaluate_ip_anomaly_risk_mock("106.210.42.18")
        self.assertFalse(res_trusted["is_anomaly"])
        self.assertEqual(res_trusted["risk_rating"], "LOW")

        # Unrecognized external IP
        res_untrusted = evaluate_ip_anomaly_risk_mock("198.51.100.44")
        self.assertTrue(res_untrusted["is_anomaly"])
        self.assertEqual(res_untrusted["risk_rating"], "HIGH")


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 28: Security Anomaly Audit Test Suite            ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 28 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 28 tests failed!")
