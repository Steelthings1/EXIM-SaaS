# Module 2 Requirements Specification: Compliance, HS Code & Regulatory Engine

## 1. Executive Overview
Module 2 delivers the core Exim trade compliance intelligence engine, powering natural language AI HS Code classification, destination country regulatory requirement checklists, landed cost/duty calculation with Free Trade Agreement (FTA) savings, and fuzzy sanction screening against denied party lists.

## 2. Technical Capabilities
1. **AI Natural Language HS Classifier**: Predicts WCO 6-digit base and 8-10 digit national tariff codes from product descriptions with confidence ratings and nomenclature hierarchy trees.
2. **Destination Market Regulatory Rules**: Detailed statutory certificate checklists (Phytosanitary, CoA, Halal), food-grade packaging standards, and dual-language labeling rules.
3. **Landed Cost & Tariff Calculator**: Computes Basic Customs Duty (BCD), destination VAT/IGST, total landed cost, and preferential tariff savings under FTAs (India-UAE CEPA, Australia ECTA, ASEAN AIFTA).
4. **Fuzzy Sanctions Screener**: Implements Levenshtein distance matching to screen entities against OFAC SDN, UN Security Council, EU, and UK HMT denied party lists.
