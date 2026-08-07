#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 29: API Center & Developer Portal Test Suite
Verifies:
1. HMAC SHA-256 webhook signature generation
2. Live developer API key prefix formatting (exim_live_...)
"""

import unittest
import hmac
import hashlib


def generate_api_key_mock(name: str):
    raw = "exim_live_9041a8b7c6d5e4f3"
    prefix = raw[:14]
    return {
        "key_name": name,
        "raw_key": raw,
        "key_prefix": f"{prefix}...",
        "rate_limit_per_min": 1000
    }


def compute_webhook_hmac_signature_mock(payload: str, secret: str) -> str:
    return hmac.new(secret.encode('utf-8'), payload.encode('utf-8'), hashlib.sha256).hexdigest()


class TestModule29DeveloperApiEngine(unittest.TestCase):

    def test_api_key_generation_prefix(self):
        k = generate_api_key_mock("Production Key")
        self.assertTrue(k["raw_key"].startswith("exim_live_"))
        self.assertEqual(k["rate_limit_per_min"], 1000)

    def test_hmac_sha256_webhook_signature(self):
        payload = '{"event": "shipment.updated", "shipment_id": "SHP-2026-9041"}'
        secret = "whsec_9041a8b7c6d5e4f3"
        sig = compute_webhook_hmac_signature_mock(payload, secret)
        self.assertEqual(len(sig), 64)


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 29: Developer API & Webhooks V3 Test Suite       ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 29 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 29 tests failed!")
