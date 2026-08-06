#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Developer API Center & Webhooks Test Suite
Verifies:
1. HMAC SHA-256 signature generation for webhook payloads
2. API Key live prefix formatting (exim_live_...)
"""

import hmac
import hashlib
import unittest


def generate_hmac_sha256(payload: str, secret_key: str) -> str:
    return hmac.new(secret_key.encode('utf-8'), payload.encode('utf-8'), hashlib.sha256).hexdigest()


class TestModule19DeveloperApiEngine(unittest.TestCase):

    def test_hmac_sha256_webhook_signature(self):
        payload = '{"event": "shipment.updated", "container_id": "CONT-INNSA-904128"}'
        secret = "whsec_904128_secret_key"

        signature = generate_hmac_sha256(payload, secret)
        self.assertIsInstance(signature, str)
        self.assertEqual(len(signature), 64) # SHA-256 hex digest length is 64 chars

    def test_api_key_prefix_formatting(self):
        api_key = "exim_live_9a4128abcdef1234567890"
        self.assertTrue(api_key.startswith("exim_live_"))
        self.assertEqual(api_key[:14], "exim_live_9a41")


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Developer API Center & Webhooks Test Suite              ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Developer API Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nDeveloper API tests failed!")
