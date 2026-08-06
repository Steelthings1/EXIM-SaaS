#!/usr/bin/env python3
"""
EXIM.IM SaaS Platform - Module 12: Real-Time Satellite AIS Tracking & Container Telemetry Test Suite
Verifies:
1. Satellite AIS coordinate range validation (Latitude [-90, 90], Longitude [-180, 180])
"""

import unittest


def validate_ais_coordinates(lat: float, lng: float):
    return -90.0 <= lat <= 90.0 and -180.0 <= lng <= 180.0


class TestModule12AisTelemetryEngine(unittest.TestCase):

    def test_valid_and_invalid_satellite_coordinates(self):
        self.assertTrue(validate_ais_coordinates(18.9500, 72.9500)) # INNSA Nhava Sheva
        self.assertFalse(validate_ais_coordinates(120.0, 72.9500)) # Lat 120 > 90 -> Invalid


if __name__ == "__main__":
    print("======================================================================")
    print("      EXIM.IM Module 12: Satellite AIS Telemetry Engine Test Suite     ")
    print("======================================================================")
    result = unittest.main(exit=False)
    if result.result.wasSuccessful():
        print("\nAll Module 12 Engine Tests PASSED cleanly (100% SUCCESS)")
    else:
        print("\nModule 12 tests failed!")
