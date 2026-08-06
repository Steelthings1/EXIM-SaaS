#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 3: Product Catalog & Single-Entry Document Engine Test Suite
Verifies:
1. Bill of Materials (BOM) raw material unit cost aggregation math
2. 1-Click Document suite generation consistency
"""

import unittest


def calculate_bom_cost(components):
    total_raw_cost = sum(c["qty"] * c["unit_cost"] for c in components)
    local_cost = sum(c["qty"] * c["unit_cost"] for c in components if c.get("origin") == "IND")
    domestic_value_add_pct = round((local_cost / total_raw_cost) * 100, 2) if total_raw_cost > 0 else 0
    return total_raw_cost, domestic_value_add_pct


def generate_1click_document_suite(order_id: str, doc_types: list):
    generated_docs = []
    for doc in doc_types:
        generated_docs.append({
            "order_id": order_id,
            "document_type": doc,
            "document_number": f"{doc[:3]}-{order_id}-2026",
            "status": "GENERATED"
        })
    return generated_docs


class TestModule3ProductCatalogEngine(unittest.TestCase):

    def test_bom_calculation(self):
        sample_components = [
            {"name": "Raw Coffee", "qty": 1.05, "unit_cost": 450.00, "origin": "IND"},
            {"name": "Packaging Pouch", "qty": 4.0, "unit_cost": 12.50, "origin": "IND"}
        ]
        total_cost, value_add = calculate_bom_cost(sample_components)
        self.assertEqual(total_cost, 522.50) # (1.05 * 450) + (4 * 12.5) = 472.5 + 50 = 522.5
        self.assertEqual(value_add, 100.00)

    def test_1click_document_suite_generation(self):
        docs = generate_1click_document_suite(
            order_id="EXIM-9041",
            doc_types=["COMMERCIAL_INVOICE", "PACKING_LIST", "SHIPPING_BILL", "CERTIFICATE_OF_ORIGIN"]
        )
        self.assertEqual(len(docs), 4)
        self.assertEqual(docs[0]["status"], "GENERATED")


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 3: Product Catalog & Single-Entry Test Suite     ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 3 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 3 tests failed!")
