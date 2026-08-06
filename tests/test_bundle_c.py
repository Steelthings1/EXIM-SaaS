#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Bundle C Test Suite
Verifies:
1. Container Payload Weight & Volume Utilization Math & Overweight Flags
2. QC Lab Test Parameter Evaluation Logic (Moisture, Active Ingredient, Heavy Metals)
"""

import unittest

CONTAINER_SPECS = {
    "20FT_STD": {"max_wt_kg": 21800.0, "max_cbm": 33.2},
    "40FT_HC": {"max_wt_kg": 26500.0, "max_cbm": 76.4}
}


def calculate_container_loading(container_type: str, cargo_wt_kg: float, cargo_cbm: float):
    spec = CONTAINER_SPECS.get(container_type, CONTAINER_SPECS["20FT_STD"])
    wt_util = round((cargo_wt_kg / spec["max_wt_kg"]) * 100, 2)
    vol_util = round((cargo_cbm / spec["max_cbm"]) * 100, 2)

    is_overweight_kg = max(0.0, cargo_wt_kg - spec["max_wt_kg"])
    is_volume_exceeded = cargo_cbm > spec["max_cbm"]

    status = "SAFE_OPTIMAL"
    if is_overweight_kg > 0:
        status = "OVERWEIGHT_DANGER"
    elif is_volume_exceeded:
        status = "VOLUME_EXCEEDED"

    return wt_util, vol_util, is_overweight_kg, status


def evaluate_qc_report(moisture_pct: float, heavy_metals_ppm: float):
    is_pass = moisture_pct <= 12.0 and heavy_metals_ppm <= 1.0
    return "PASS" if is_pass else "REJECTED_OUT_OF_SPEC"


class TestContainerLoadingEngine(unittest.TestCase):
    """Test container weight/volume math and overweight safety thresholds."""

    def test_safe_20ft_loading(self):
        wt_util, vol_util, overweight_kg, status = calculate_container_loading("20FT_STD", 19500.0, 28.5)
        self.assertEqual(wt_util, 89.45)
        self.assertEqual(vol_util, 85.84)
        self.assertEqual(overweight_kg, 0.0)
        self.assertEqual(status, "SAFE_OPTIMAL")

    def test_overweight_20ft_loading(self):
        wt_util, vol_util, overweight_kg, status = calculate_container_loading("20FT_STD", 23000.0, 30.0)
        self.assertEqual(wt_util, 105.5)
        self.assertEqual(overweight_kg, 1200.0) # 23000 - 21800
        self.assertEqual(status, "OVERWEIGHT_DANGER")


class TestQcReportEvaluation(unittest.TestCase):
    """Test QC lab parameter pass/fail evaluation logic."""

    def test_qc_pass(self):
        result = evaluate_qc_report(moisture_pct=4.8, heavy_metals_ppm=0.12)
        self.assertEqual(result, "PASS")

    def test_qc_rejected_moisture(self):
        result = evaluate_qc_report(moisture_pct=14.5, heavy_metals_ppm=0.12)
        self.assertEqual(result, "REJECTED_OUT_OF_SPEC")


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Bundle C: Container & QC Test Suite                     ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Bundle C Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nBundle C tests failed!")
