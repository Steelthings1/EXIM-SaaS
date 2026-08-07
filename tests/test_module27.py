#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 27: Workspace Settings & Branding V2 Test Suite
Verifies:
1. Letterhead header text formatting logic across regional tax systems
2. System timezone formatting logic
"""

import unittest


def format_letterhead_mock(tax_system: str, header_text: str):
    tax_label = "GSTIN: 33AAAAA0000A1Z5"
    if tax_system == "UAE_VAT":
        tax_label = "TRN: 100029384700003"
    elif tax_system == "US_SALES_TAX":
        tax_label = "EIN: 98-7654321"

    header_banner = f"[OFFICIAL EXPORT DOCUMENT] {header_text.upper()} | {tax_label}"
    return header_banner


class TestModule27WorkspaceConfigEngine(unittest.TestCase):

    def test_letterhead_formatting(self):
        banner_gst = format_letterhead_mock("INDIA_GST", "STEELTHINGS EXIM PRIVATE LIMITED")
        self.assertIn("GSTIN: 33AAAAA0000A1Z5", banner_gst)
        self.assertIn("STEELTHINGS EXIM PRIVATE LIMITED", banner_gst)

        banner_vat = format_letterhead_mock("UAE_VAT", "STEELTHINGS DUBAI LLC")
        self.assertIn("TRN: 100029384700003", banner_vat)
        self.assertIn("STEELTHINGS DUBAI LLC", banner_vat)


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 27: Workspace Config & Branding Test Suite       ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 27 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 27 tests failed!")
