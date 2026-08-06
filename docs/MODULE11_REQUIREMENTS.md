# Module 11 Requirements Specification: Shipment Booking & Multi-Carrier Freight Aggregator

## 1. Executive Overview
Module 11 delivers the multi-carrier ocean and air freight rate quote aggregator, surcharges calculation (Terminal Handling Charges, Bunker Adjustment Factor, ISPS), carrier booking requests, and Shipping Instructions (SI) dispatch engine for Bill of Lading generation.

## 2. Technical Capabilities
1. **Freight Rate & Surcharge Engine**: Calculates freight quote totals including origin/destination THC, BAF, and ISPS surcharges across global ocean carriers (MSC, CMA CGM, Maersk).
2. **Shipping Instructions Dispatch Engine**: Submits SI dispatch records containing shipper, consignee, vessel, container numbers, and seal numbers for Bill of Lading issuance.
